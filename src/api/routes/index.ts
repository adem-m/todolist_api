import {Express} from "express";
import userRouter from "./user.route";

export const buildRoutes = (app: Express) => {
    app.use("/users", userRouter);
}
