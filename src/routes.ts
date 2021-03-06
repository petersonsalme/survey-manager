import { Router } from "express";
import { SendMailController } from "./controller/SendMailController";
import { SurveysController } from "./controller/SurveysController";
import { UserController } from "./controller/UserController";

const router = Router();

const userController = new UserController();
router.post("/users", userController.create);

const surveysController = new SurveysController();
router.get("/surveys", surveysController.show);
router.post("/surveys", surveysController.create);

const sendMailController = new SendMailController();
router.post("/send-mail", (req, res) => sendMailController.execute(req, res));

export { router };
