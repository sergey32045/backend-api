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
import { BadRequestException } from '@nestjs/common';

export class SessionService {
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
      session.status = 'started';
      session.test_id = 1;
      return this.sessionRepository.save(session);
    }
    throw new BadRequestException('test not found');
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
        'answers.answer_id',
      ])
      .where({ id: sessionId })
      .innerJoin('test_sessions.sessionAnswers', 'answers')
      .innerJoin('test_sessions.sessionQuestions', 'questions')
      .getOne();

    return sessionRecord;
  }

  async saveAnswer(sessionId: string, data: SaveSessionAnswerDto) {
    const sessionRecord = await this.sessionRepository.findOne({
      where: { id: sessionId },
    });

    if (sessionRecord) {
      if (!data.answerIds) {
        return;
      }

      const answers = await this.answerRepository.find({
        where: {
          id: In(data.answerIds),
          question_id: In([data.questionId]),
        },
      });
      const savedAnswers = await this.saveAnswers(sessionId, answers, data);

      if (data.questionId) {
        const questions = await this.questionRepository.find({
          where: { id: In([data.questionId]) },
        });
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
    }
    return this.sessionRepository.save(sessionRecord);
  }

  protected isAnsweredQuestion(
    savedAnswers: SessionAnswer[],
    question: Question,
    answers: Answer[],
  ) {
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
      return;
    }

    if (question.is_multiselect) {
      const correctQuestionAnswers = answers.filter(
        (answer) => answer.question_id === question.id && answer.is_correct,
      );

      if (correctQuestionAnswers.length < 1) {
        return false;
      }

      for (const correctQuestionAnswer of correctQuestionAnswers) {
        const hasCorrectAnswer = sessionCorrectAnswers.find(
          (sessionAnswer) =>
            correctQuestionAnswer.id === sessionAnswer.answer_id,
        );

        if (!hasCorrectAnswer) {
          return false;
        }
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
    for (const answer of answers) {
      const sessionAnswer = new SessionAnswer();

      const isAnswerCorrect = data.answerIds.find(
        (answerId) => answer.id == answerId && answer.is_correct,
      );

      sessionAnswer.session_id = sessionId;
      sessionAnswer.answer_id = answer.id;
      sessionAnswer.is_correct = !!isAnswerCorrect;
      sessionAnswers.push(sessionAnswer);
    }
    return await this.sessionAnswerRepository.save(sessionAnswers);
  }
}
