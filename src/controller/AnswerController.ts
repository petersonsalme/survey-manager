import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../error/AppError";
import { SurveysUsersRepository } from "../repository/SurveysUsersRepository";

class AnswerController {

    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
        const surveysUsers = await surveysUsersRepository.findOne({ id: String(u) });
        if (!surveysUsers) {
            throw new AppError(`Cannot find by uuid ${u}`, 400);
        }

        surveysUsers.value = Number(value);

        await surveysUsersRepository.save(surveysUsers);

        return response.json(surveysUsers);
    }

}

export { AnswerController };
