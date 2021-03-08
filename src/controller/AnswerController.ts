import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../repository/SurveysUsersRepository";

class AnswerController {

    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
        const surveysUsers = await surveysUsersRepository.findOne({ id: String(u) });
        if (!surveysUsers) {
            return response.status(400).json({
                message: `Cannot find by uuid ${u}`
            });
        }

        surveysUsers.value = Number(value);

        await surveysUsersRepository.save(surveysUsers);

        return response.json(surveysUsers);
    }

}

export { AnswerController };
