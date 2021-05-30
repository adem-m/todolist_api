import express from 'express';
import {buildRoutes} from "./routes";


export const run = () => {
    const port = 3000;
    const app = express();
    app.use(express.json());

    buildRoutes(app);

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}

run();
