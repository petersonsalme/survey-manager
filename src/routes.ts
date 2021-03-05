import { Router } from "express";
import { SurveysController } from "./controller/SurveysController";
import { UserController } from "./controller/UserController";

const router = Router();

const userController = new UserController();
router.post("/users", userController.create);

const surveysController = new SurveysController();
router.get("/surveys", surveysController.show);
router.post("/surveys", surveysController.create);

export { router };
