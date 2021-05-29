import express, {Request, Response} from "express";
import {ItemController} from "../controllers";

const router = express.Router();

router.route("/")
    .post(async (request: Request, response: Response) => {
        const {name, content, mail} = request.body;
        if (name === undefined || content === undefined || mail === undefined) {
            return response.sendStatus(400);
        }

        const item = new ItemController().create({name, content, mail});

        if (item !== null) {
            return response.sendStatus(201);
        }
        return response.sendStatus(400);
    });

export default router;
