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
    const sessionRecord = await this.sessionRepository.findOne({
      where: { id: sessionId },
      relations: ['questions.answers', 'answers'],
    });

    return sessionRecord;
  }

  async saveAnswer(sessionId: string, data: SaveSessionAnswerDto) {
    const sessionRecord = await this.sessionRepository.findOne({
      where: { id: sessionId },
    });

    if (sessionRecord) {
      if (data.answerIds) {
        const answers = await this.answerRepository.find({
          where: {
            id: In(data.answerIds),
            question_id: data.questionId,
          },
        });
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
        await this.sessionAnswerRepository.save(sessionAnswers);
      }
      if (data.questionId) {
        const questions = await this.questionRepository.find({
          where: { id: In([data.questionId]) },
        });
        const sessionQuestions: SessionQuestion[] = [];
        for (const question of questions) {
          const sessionQuestion = new SessionQuestion();
          sessionQuestion.session_id = sessionId;
          sessionQuestion.question_id = question.id;
          sessionQuestion.is_answered = true;
          sessionQuestions.push(sessionQuestion);
        }
        await this.sessionQuestionRepository.save(sessionQuestions);
      }
    }
    return this.sessionRepository.save(sessionRecord);
  }
}
