import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repository/SurveysRepository";
import { SurveysUsersRepository } from "../repository/SurveysUsersRepository";
import { UsersRepository } from "../repository/UsersRepository";
import SendMailService from "../service/SendMailService";
import path from 'path';
import { User } from "../model/User";
import { Survey } from "../model/Survey";
import { SurveyUser } from "../model/SurveyUser";

class SendMailController {

    async execute(request: Request, response: Response) {
        const {email, survey_id} = request.body;

        try {
            const user = await this.getUserBy(email);
            const survey = await this.getSurveyBy(survey_id);
            const surveyUser = await this.getSurveyUserBy(user, survey);

            const npsPath = path.resolve(__dirname, '..', 'view', 'email', 'npsMail.hbs');
            const variables = this.buildTemplateVariables(user, survey, surveyUser);

            await SendMailService.execute(email, survey.title, variables, npsPath.toString());

            return response.json(surveyUser);
        } catch(error) {
            return response.status(400).json({
                name: error.name,
                message: error.message
            });
        }
    }

    private async getUserBy(email: string): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findOne({ email });
        if (!user) {
            throw Error(`User cannot be found by email ${email}`)
        }

        return user;
    }

    private async getSurveyBy(id: string): Promise<Survey> {
        const surveysRepository = getCustomRepository(SurveysRepository);
        const survey = await surveysRepository.findOne({ id });
        if (!survey) {
            throw Error(`Survey cannot be found by id ${id}`);
        }

        return survey;
    }

    private buildTemplateVariables(user: User, survey: Survey, surveyUser: SurveyUser) {
        return {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: surveyUser.id,
            link: process.env.ANSWER_URL
        }
    }

    private async getSurveyUserBy(user: User, survey: Survey): Promise<SurveyUser> {
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
        const existentSurveysUsers = await surveysUsersRepository.findOne({
            where: { user_id: user.id, value: null },
            relations: ['user', 'survey']
        });
        
        if (existentSurveysUsers) {
            return existentSurveysUsers;
        }

        return this.createSurveyUser(user, survey);
    }

    private async createSurveyUser(user: User, survey: Survey): Promise<SurveyUser> {
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
        const surveyUser = surveysUsersRepository.create({ user, survey });
        await surveysUsersRepository.save(surveyUser);
        
        return surveyUser;
    }

}

export { SendMailController };
