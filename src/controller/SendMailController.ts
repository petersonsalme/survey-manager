import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repository/SurveysRepository";
import { SurveysUsersRepository } from "../repository/SurveysUsersRepository";
import { UsersRepository } from "../repository/UsersRepository";
import SendMailService from "../service/SendMailService";

class SendMailController {

    async execute(request: Request, response: Response) {
        const {email, survey_id} = request.body;
        
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findOne({ email });
        if (!user) {
            return response.status(400).json({
                error: `User cannot be found by email ${email}`
            });
        }

        const surveysRepository = getCustomRepository(SurveysRepository);
        const survey = await surveysRepository.findOne({ id: survey_id });
        if (!survey) {
            return response.status(400).json({
                error: `Survey cannot be found by id ${survey_id}`
            });
        }

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
        const surveyUser = surveysUsersRepository.create({ 
            user_id: user.id,
            survey_id
        });
        await surveysUsersRepository.save(surveyUser);

        await SendMailService.execute(email, survey.title, survey.description);

        return response.json(surveyUser);
    }

}

export { SendMailController };
