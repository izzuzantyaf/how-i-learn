import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StoreAnswersDto } from './dto/store-answers.dto';
import {
  LearningMethodRecommendation,
  LearningMethodRecommendationDocument,
} from '../../schemas/learningMethodRecommendation';
import {
  Questionnaire,
  QuestionnaireDocument,
} from '../../schemas/questionnaire.schema';
import {
  RespondentAnswer,
  RespondentAnswerDocument,
} from '../../schemas/respondent-answer.schema';
import {
  Respondent,
  RespondentDocument,
} from '../../schemas/respondent.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class QuestionnairesService {
  // daftarkan semua model yang akan digunakan ke dalam constructor agar bisa digunakan
  constructor(
    @InjectModel(Questionnaire.name)
    private questionnaireModel: Model<QuestionnaireDocument>,
    @InjectModel(Respondent.name)
    private respondentModel: Model<RespondentDocument>,
    @InjectModel(RespondentAnswer.name)
    private respondentAnswerModel: Model<RespondentAnswerDocument>,
    @InjectModel(LearningMethodRecommendation.name)
    private learningMethodRecommendationModel: Model<LearningMethodRecommendationDocument>,
  ) {}

  // ambil semua soal kuesioner
  async findAll() {
    return await this.questionnaireModel.find().exec();
  }

  // simpan jawaban kuesioner
  async storeAnswers(storeAnswerDto: StoreAnswersDto) {
    const { respondent, questionnaireAnswers } = storeAnswerDto;

    // menghitung CF final tiap tipe gaya belajar
    const learningTypesResult = this.scoreLearningTypes(questionnaireAnswers);

    // menentukan tipe gaya belajar yang paling cocok
    const bestLearningTypes = this.findTheBestLearningType(learningTypesResult);

    // memilih rekomendasi cara belajar yang sesuai berdasarkan tipe gaya belajar
    const learningMethodRecommendations = await this.recommendLearningMethods(
      bestLearningTypes,
    );

    // menyimpan data responden ke database
    respondent._id = new mongoose.Types.ObjectId();
    respondent.learningTypes = learningTypesResult;
    respondent.bestLearningTypes = bestLearningTypes;
    respondent.learningMethodRecommendations = learningMethodRecommendations;
    const storedRespondent = await this.respondentModel.create(respondent);

    // menyimpan data jawaban responden ke database
    await this.respondentAnswerModel.create({
      _id: new mongoose.Types.ObjectId(),
      respondent: storedRespondent._id,
      questionnaireAnswers: questionnaireAnswers,
    });

    return { result: storedRespondent };
  }

  scoreLearningTypes(questionnaireAnswers: any[]) {
    const learningTypesFinalCF = {
      visual: 0,
      auditory: 0,
      readWrite: 0,
      kinesthetic: 0,
    };
    for (const key in learningTypesFinalCF) {
      learningTypesFinalCF[key] = this.calculateLearningTypeCf(
        questionnaireAnswers,
        key,
      );
    }

    return learningTypesFinalCF;
  }

  calculateLearningTypeCf(questionnaireAnswers: any[], type: string) {
    // menghitung cf kombinasi (CF user * CF expert)
    const combinationCfs: number[] = questionnaireAnswers.map((question) => {
      const answer = question.answerChoices.filter(
        (answer) => answer.type == type,
      )[0];
      return answer.userCf * answer.expertCf;
    });
    // menghitung CF final
    let oldCf = combinationCfs[0];
    for (let i = 1; i < combinationCfs.length; i++) {
      oldCf = oldCf + combinationCfs[i] * (1 - oldCf);
    }
    return oldCf;
  }

  findTheBestLearningType(learningTypesResult: object) {
    const cfs: number[] = Object.values(learningTypesResult);

    const maxCf = Math.max(...cfs);
    const bestLearningTypes: string[] = [];
    for (const key in learningTypesResult) {
      if (learningTypesResult[key] === maxCf) {
        bestLearningTypes.push(key);
      }
    }

    return bestLearningTypes;
  }

  async recommendLearningMethods(bestLearningTypes: string[]) {
    // memilih rekomendasi cara belajar
    return await this.learningMethodRecommendationModel
      .find({ type: bestLearningTypes })
      .exec();
  }
}
