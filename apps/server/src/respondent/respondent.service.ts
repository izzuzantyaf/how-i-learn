import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RespondentAnswer,
  RespondentAnswerDocument,
} from 'schemas/respondent-answer.schema';
import { Respondent, RespondentDocument } from 'schemas/respondent.schema';

@Injectable()
export class RespondentService {
  constructor(
    @InjectModel(Respondent.name)
    private respondentModel: Model<RespondentDocument>,
    @InjectModel(RespondentAnswer.name)
    private respondentAnswerModel: Model<RespondentAnswerDocument>,
  ) {}

  async findAll() {
    return this.respondentModel.find().exec();
  }

  async findAllWithAnswers() {
    return await this.respondentAnswerModel
      .find()
      .populate('respondent')
      .exec();
  }

  async findAllWithPoints() {
    // mengambil semua responden dan jawaban kuesioner mereka
    const respondentsWithAnswers = await this.findAllWithAnswers();
    // menentukan tipe gaya belajar yang cocok berdasarkan user CF saja
    const respondentsWithLearningTypesPoint = respondentsWithAnswers.map(
      ({ respondent, questionnaireAnswers }) => {
        const learningTypesPoint =
          this.calculateLearningTypesPoint(questionnaireAnswers);
        const { bestLearningTypesCodeBasedOnPoint } =
          this.findTheBestLearningType(learningTypesPoint);
        const bestLearningTypesCodeBasedOnFinalCf =
          this.createBestLearningTypesCode(respondent.bestLearningTypes);
        return {
          name: respondent.name,
          learningTypesPoint,
          bestLearningTypesCodeBasedOnPoint,
          learningTypesFinalCf: respondent.learningTypes,
          bestLearningTypesCodeBasedOnFinalCf,
        };
      },
    );

    return respondentsWithLearningTypesPoint;
  }

  private findTheBestLearningType(learningTypesPoint: object) {
    const points: number[] = Object.values(learningTypesPoint);

    const maxpoint = Math.max(...points);
    const bestLearningTypes: string[] = [];
    for (const key in learningTypesPoint) {
      if (learningTypesPoint[key] === maxpoint) {
        bestLearningTypes.push(key);
      }
    }

    const bestLearningTypesCodeBasedOnPoint =
      this.createBestLearningTypesCode(bestLearningTypes);

    return { bestLearningTypes, bestLearningTypesCodeBasedOnPoint };
  }

  private createBestLearningTypesCode(bestLearningTypes: string[]) {
    return bestLearningTypes
      .map((bestLearningType) => bestLearningType[0].toUpperCase())
      .join('');
  }

  private calculateLearningTypesPoint(questionnaireAnswers: any[]) {
    const learningTypesPoint: object = questionnaireAnswers.reduce(
      (acc, cur) => {
        acc.visual += cur.answerChoices[0].userCf;
        acc.auditory += cur.answerChoices[1].userCf;
        acc.readWrite += cur.answerChoices[2].userCf;
        acc.kinesthetic += cur.answerChoices[3].userCf;
        return acc;
      },
      {
        visual: 0,
        auditory: 0,
        readWrite: 0,
        kinesthetic: 0,
      },
    );

    // fix the stupid javascript floating point number
    for (const key in learningTypesPoint) {
      learningTypesPoint[key] = parseFloat(learningTypesPoint[key].toFixed(2));
    }

    return learningTypesPoint;
  }
}
