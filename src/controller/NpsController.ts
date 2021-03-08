import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../repository/SurveysUsersRepository";

class NpsController {

    async execute(request: Request, response: Response) {
        const { survey_id } = request.params;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
        const surveysUsers = await surveysUsersRepository.find({ survey_id });

        const detractors = surveysUsers.filter(survey => survey.value && [0, 1, 2, 3, 4, 5, 6].includes(survey.value)).length;
        const passives =  surveysUsers.filter(survey => survey.value && [7, 8].includes(survey.value)).length;
        const promoters = surveysUsers.filter(survey => survey.value && [9, 10].includes(survey.value)).length;

        const calculate = Number((((promoters - detractors) / surveysUsers.length) * 100).toFixed(2));

        return response.json({
            detractors,
            promoters,
            passives,
            totalAnswers: surveysUsers.length,
            nps: calculate
        });
    }

}

export { NpsController };