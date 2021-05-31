import express, {Request, Response} from "express";
import {items, toDoLists, users} from "../database";

const router = express.Router();

router.route("/")
    .delete((request: Request, response: Response) => {
        users.clear();
        toDoLists.clear();
        items.clear();

        return response.sendStatus(204);
    });

export default router;
