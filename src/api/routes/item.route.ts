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

router.route("/all")
    .get(async (request: Request, response: Response) => {
        const mail = request.query.mail as string;
        if (mail === undefined) {
            return response.sendStatus(400);
        }
        const items = new ItemController().getAll(mail);

        if (items === null) {
            return response.sendStatus(404);
        }
        return response.json(items);
    });

router.route("/:id")
    .delete(async (request: Request, response: Response) => {
        const mail = request.query.mail as string;
        const id = request.params.id;
        if (mail === undefined || isNaN(parseInt(id))) {
            return response.sendStatus(400);
        }
        const result = new ItemController().delete(mail, parseInt(id));

        if (result === null) {
            return response.sendStatus(404);
        }
        return response.sendStatus(204);
    });

export default router;
