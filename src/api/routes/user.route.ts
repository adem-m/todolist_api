import express, {Request, Response} from "express";
import {UserController} from "../controllers";

const router = express.Router();

router.route("/")
    .post(async (request: Request, response: Response) => {
        const {name, lastname, mail, password, birthdate} = request.body;
        if (name === undefined ||
            lastname === undefined ||
            mail === undefined ||
            password === undefined ||
            birthdate === undefined) {
            return response.sendStatus(400);
        }

        const user = new UserController().create({
            name,
            lastname,
            mail,
            password,
            birthdate
        });

        if (user !== null) {
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

        const user = new UserController().getByMail(mail);

        return response.json({exists: user !== null});
    });

export default router;
