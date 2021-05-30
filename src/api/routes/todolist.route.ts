import express, {Request, Response} from "express";
import {ToDoListController} from "../controllers";

const router = express.Router();

router.route("/")
    .post(async (request: Request, response: Response) => {
        const {mail} = request.body;
        if (mail === undefined) {
            return response.sendStatus(400);
        }

        const toDoList = new ToDoListController().create(mail);

        if (toDoList !== null) {
            return response.sendStatus(201);
        }
        return response.sendStatus(400);
    });

router.route("/exists")
    .get(async (request: Request, response: Response) => {
        const mail = request.query.mail as string;
        if (mail === undefined) {
            return response.sendStatus(400);
        }

        const result = new ToDoListController().checkIfExists(mail);

        return response.json({exists: result});
    });

export default router;
