import { Controller, Get } from '@nestjs/common';
import { PlaygroundService } from './playground.service';

@Controller('api/plg')
export class PlaygroundController {
  constructor(private readonly playgroundService: PlaygroundService) {}

  userCfChanger: object = {
    '0': 0,
    '0.25': 0.2,
    '0.5': 0.4,
    '0.75': 0.6,
    '1': 0.8,
  };

  @Get('answers')
  async findAllWithRespondent() {
    let answers = await this.playgroundService.findAllAnswers();
    // modify users cf
    answers = answers.map((ans) => {
      ans.questionnaireAnswers = ans.questionnaireAnswers.map((question) => {
        question.answerChoices = question.answerChoices.map((ac) => {
          ac.userCf = this.userCfChanger[ac.userCf];
          return ac;
        });
        return question;
      });
      return ans;
    });
    return answers;
  }

  @Get('recalc')
  async recalc() {
    const convertedAns = await this.findAllWithRespondent();
    const newRspds = [];
    for (let i = 0; i < convertedAns.length; i++) {
      const ans = convertedAns[i];
      const newRspd = await this.playgroundService.storeAnswers(
        ans.respondent,
        ans.questionnaireAnswers,
      );
      newRspds.push(newRspd);
    }
    return newRspds;
  }
}
