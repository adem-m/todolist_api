import {User} from "../../src/entities";
import {sendGetRequest, sendPostRequest} from "./test.commons";

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
        const response = await sendPostRequest(baseUrl, JSON.stringify(validUser));
        expect(response.status).toBe(201);
    });

    it("Should not create a user when query is not correct", async () => {
        const invalidUser = {...validUser};
        invalidUser.password = "short";
        const response = await sendPostRequest(baseUrl, JSON.stringify(invalidUser));
        expect(response.status).toBe(400);
    });

    it("Should return true if user exists", async () => {
        await sendPostRequest(baseUrl, JSON.stringify(validUser));
        const response = await sendGetRequest(`${baseUrl}exists?mail=${validUser.mail}`);
        expect(response.body).toHaveProperty("exists");
        expect(response.body?.exists).toBeTruthy();
    });

    it("Should return false if user does not exists", async () => {
        const response = await sendGetRequest(`${baseUrl}exists?mail=nonexistent@test.com`);
        expect(response.body).toHaveProperty("exists");
        expect(response.body?.exists).toBeFalsy();
    });
});
