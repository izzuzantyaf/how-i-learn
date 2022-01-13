import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StoreAnswersDto } from './dto/store-answers.dto';
import {
  Questionnaire,
  QuestionnaireDocument,
} from './schemas/questionnaire.schema';
import {
  RespondentAnswer,
  RespondentAnswerDocument,
} from './schemas/respondent-answer.schema';
import { Respondent, RespondentDocument } from './schemas/respondent.schema';

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
  ) {}

  // ambil semua soal kuesioner
  async findAll(): Promise<Questionnaire[]> {
    return await this.questionnaireModel.find().exec();
  }

  // simpan jawaban kuesioner
  async storeAnswers(storeAnswerDto: StoreAnswersDto) {
    const { respondent, questionnaireAnswers } = storeAnswerDto;
    // simpan data responden ke database
    const storedRespondent = await this.respondentModel.create({
      name: respondent.name,
      university: respondent.university,
      major: respondent.major,
      age: respondent.age,
    });
    // simpan data jawaban responden ke database
    const storedRespondentAnswer = await this.respondentAnswerModel.create({
      respondentId: storedRespondent._id,
      questionnaireAnswers: questionnaireAnswers,
    });
    return { storedRespondent, storedRespondentAnswer };
  }
}
