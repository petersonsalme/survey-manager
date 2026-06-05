import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../repository/SurveysUsersRepository";
import { NpsCalculateService } from "../service/NpsCalculateService";

class NpsController {

    async execute(request: Request, response: Response) {
        const { survey_id } = request.params;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
        const surveysUsers = await surveysUsersRepository.find({ survey_id });

        const answers = surveysUsers.filter(survey => survey.value !== null).map(survey => Number(survey.value));
        const npsCalculateService = new NpsCalculateService();
        const result = npsCalculateService.execute(answers);

        return response.json(result);
    }

}

export { NpsController };