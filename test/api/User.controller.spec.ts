import {User} from "../../src/entities";
import fetch from "node-fetch";

describe("User controller", () => {
    const baseUrl = "http://localhost:3000/users/";
    const validDate = new Date();
    validDate.setFullYear(validDate.getFullYear() - 15);
    const validUser = User.build({
        name: "Adem",
        lastname: "Mrizak",
        mail: "adem@mrizak.com",
        password: "ademmrizak",
        birthdate: validDate
    }).getValue();

    it("Should create a user when query is correct", async () => {
        const init = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(validUser)
        };
        let status = 0;
        await fetch(baseUrl, init)
            .then(response => {
                status = response.status;
            });

        expect(status).toBe(201);
    });

    it("Should not create a user when query is not correct", async () => {
        const invalidUser = {...validUser};
        invalidUser.password = "short";
        const init = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(invalidUser)
        };
        let status = 0;
        await fetch(baseUrl, init)
            .then(response => {
                status = response.status;
            });

        expect(status).toBe(400);
    });
});
