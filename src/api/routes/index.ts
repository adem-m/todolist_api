import {Express} from "express";
import userRouter from "./user.route";
import toDoListRouter from "./todolist.route";
import itemRouter from "./item.route";
import databaseRouter from "./database.route";

export const buildRoutes = (app: Express) => {
    app.use("/users", userRouter);
    app.use("/todolists", toDoListRouter);
    app.use("/items", itemRouter);
    app.use("/clear", databaseRouter);
}
