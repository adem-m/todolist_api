import {Express} from "express";
import userRouter from "./user.route";
import toDoListRouter from "./todolist.route";
import itemRouter from "./item.route";

export const buildRoutes = (app: Express) => {
    app.use("/users", userRouter);
    app.use("/todolist", toDoListRouter);
    app.use("/items", itemRouter);
}
