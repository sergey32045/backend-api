import { InjectRepository } from '@nestjs/typeorm';
import { Test } from '../../tests/models/test.entity';
import { In, Repository } from 'typeorm';
import {
  Session,
  SessionAnswer,
  SessionQuestion,
} from '../models/session.entity';
import { SaveSessionAnswerDto, StartSessionDto } from '../validation';
import { Answer } from '../../tests/models/answer.entity';
import { Question } from '../../tests/models/question.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class SessionService {
  static readonly limitQuestions = 20;

  constructor(
    @InjectRepository(Test)
    private testsRepository: Repository<Test>,
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(SessionAnswer)
    private sessionAnswerRepository: Repository<SessionAnswer>,
    @InjectRepository(SessionQuestion)
    private sessionQuestionRepository: Repository<SessionQuestion>,
  ) {}

  async startSession(data: StartSessionDto) {
    const testRecord = await this.testsRepository.findOne({
      where: { id: data.testId },
    });

    if (testRecord) {
      const session = new Session();
      session.status = Session.START_SESSION;
      session.test_id = testRecord.id;
      return this.sessionRepository.save(session);
    }
    throw new BadRequestException('test not found');
  }

  async getNextQuestion(sessionId: string): Promise<any> {
    const sessionRecord = await this.sessionRepository.findOne({
      where: {
        id: sessionId,
        status: Session.START_SESSION,
      },
    });
    if (!sessionRecord) {
      throw new BadRequestException('session not found');
    }
    const queries: Promise<any>[] = [];

    queries.push(
      this.sessionQuestionRepository.countBy({
        session_id: sessionId,
      }),
    );

    queries.push(
      this.questionRepository
        .createQueryBuilder('questions')
        .leftJoin('questions.sessionQuestions', 'sq', 'sq.session_id = :sid', {
          sid: sessionId,
        })
        .innerJoin('question_test', 'qt', 'qt.question_id = questions.id')
        .where('qt.test_id = :testId', { testId: sessionRecord.test_id })
        .andWhere('sq.question_id IS NULL')
        .orderBy('RAND()')
        .getOne(),
    );

    queries.push(
      this.questionRepository
        .createQueryBuilder('questions')
        .innerJoin('questions.tests', 'tests')
        .andWhere('tests.id = :testId', { testId: sessionRecord.test_id })
        .getCount(),
    );

    let [countAnsweredQuestions, question, generalCountQuestions] =
      await Promise.all(queries);

    if (generalCountQuestions > SessionService.limitQuestions) {
      generalCountQuestions = 20;
    }
    if (countAnsweredQuestions >= SessionService.limitQuestions) {
      question = null;
    }
    if (question === null) {
      sessionRecord.status = Session.COMPLETE_SESSION;
      await this.sessionRepository.save(sessionRecord);
    }

    return {
      question,
      count: generalCountQuestions,
      countAnswered: countAnsweredQuestions,
      test_id: sessionRecord.test_id,
    };
  }

  async getSession(sessionId: string) {
    const sessionRecord = await this.sessionRepository
      .createQueryBuilder('test_sessions')
      .select([
        'test_sessions.id',
        'answers.is_correct',
        'test_sessions.test_id',
        'questions.question_id',
        'questions.is_answered',
        'question.title',
        'test.title',
        'answers.answer_id',
      ])
      .where({ id: sessionId, status: Session.COMPLETE_SESSION })
      .leftJoin('test_sessions.sessionAnswers', 'answers')
      .innerJoin('test_sessions.sessionQuestions', 'questions')
      .innerJoin('test_sessions.test', 'test')
      .innerJoin('questions.question', 'question')
      .getOne();
    if (!sessionRecord) {
      throw new NotFoundException('session not found');
    }

    return sessionRecord;
  }

  async saveAnswer(sessionId: string, data: SaveSessionAnswerDto) {
    const sessionRecord = await this.sessionRepository.findOne({
      where: { id: sessionId },
    });

    if (!sessionRecord) {
      throw new NotFoundException('session not found!');
    }

    if (!data.answerIds) {
      return;
    }

    const answers = await this.answerRepository
      .createQueryBuilder('answers')
      .innerJoin('answers.question', 'question')
      .innerJoin('question_test', 'qt', 'qt.question_id = question.id')
      .andWhere('qt.test_id = :testId', { testId: sessionRecord.test_id })
      .andWhere('answers.question_id IN(:...questionId)', {
        questionId: [data.questionId],
      })
      .getMany();

    if (answers.length < 1) {
      return;
    }

    const savedAnswers = await this.saveAnswers(sessionId, answers, data);

    if (data.questionId) {
      const questions = await this.questionRepository
        .createQueryBuilder('questions')
        .innerJoin('question_test', 'qt', 'qt.question_id = questions.id')
        .andWhere('qt.test_id = :testId', { testId: sessionRecord.test_id })
        .andWhere({ id: In([data.questionId]) })
        .getMany();
      const sessionQuestions: SessionQuestion[] = [];
      for (const question of questions) {
        const sessionQuestion = new SessionQuestion();
        sessionQuestion.session_id = sessionId;
        sessionQuestion.question_id = question.id;
        sessionQuestion.is_answered = this.isAnsweredQuestion(
          savedAnswers,
          question,
          answers,
        );
        sessionQuestions.push(sessionQuestion);
      }

      await this.sessionQuestionRepository.save(sessionQuestions);
    }

    return this.sessionRepository.save(sessionRecord);
  }

  protected isAnsweredQuestion(
    savedAnswers: SessionAnswer[],
    question: Question,
    answers: Answer[],
  ): boolean {
    if (!savedAnswers) return;

    const sessionCorrectAnswers = savedAnswers.filter((savedAnswer) =>
      answers.find(
        (answer) =>
          answer.question_id === question.id &&
          savedAnswer.answer_id === answer.id &&
          savedAnswer.is_correct,
      ),
    );
    if (sessionCorrectAnswers.length < 1) {
      return false;
    }

    if (question.is_multiselect) {
      const correctQuestionAnswers = answers.filter(
        (answer) => answer.question_id === question.id && answer.is_correct,
      );

      if (
        correctQuestionAnswers.length > sessionCorrectAnswers.length ||
        savedAnswers.length > correctQuestionAnswers.length
      ) {
        return false;
      }

      return true;
    }

    const correctQuestionAnswer = answers.find(
      (answer) => answer.is_correct && question.id === answer.question_id,
    );
    const hasCorrectAnswer = sessionCorrectAnswers.find(
      (sessionAnswer) => correctQuestionAnswer.id === sessionAnswer.answer_id,
    );

    return !!hasCorrectAnswer;
  }

  async saveAnswers(
    sessionId: string,
    answers: Answer[],
    data: SaveSessionAnswerDto,
  ) {
    const sessionAnswers: SessionAnswer[] = [];
    const questionIds = answers.flatMap((answer) => answer.question_id);
    // filter answers if they are already exist
    const existingSessionQuestions =
      await this.sessionQuestionRepository.countBy({
        question_id: In(questionIds),
        session_id: sessionId,
      });
    if (existingSessionQuestions > 0) {
      throw new BadRequestException(
        'Question is already answered for this session!',
      );
    }
    for (const answer of answers) {
      const sessionAnswer = new SessionAnswer();

      const isAnswerPresent = data.answerIds.find(
        (answerId) => answer.id == answerId,
      );
      if (!isAnswerPresent) {
        continue;
      }

      sessionAnswer.session_id = sessionId;
      sessionAnswer.answer_id = answer.id;
      sessionAnswer.is_correct = answer.is_correct;
      sessionAnswers.push(sessionAnswer);
    }
    return await this.sessionAnswerRepository.save(sessionAnswers);
  }
}
