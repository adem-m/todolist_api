import {clearDatabase, sendGetRequest, sendPostRequest, usersBaseUrl, validUser} from "../test.commons";

jest.setTimeout(10000);

describe("User controller", () => {
    afterEach(async () => {
        await clearDatabase();
    });

    it("Should create a user when query is correct", async () => {
        const response = await sendPostRequest(usersBaseUrl, JSON.stringify(validUser));
        expect(response.status).toBe(201);
    });

    it("Should not create a user when query is not correct", async () => {
        const invalidUser = {...validUser};
        invalidUser.password = "short";
        const response = await sendPostRequest(usersBaseUrl, JSON.stringify(invalidUser));
        expect(response.status).toBe(400);
    });

    it("Should return true if user exists", async () => {
        await sendPostRequest(usersBaseUrl, JSON.stringify(validUser));
        const response = await sendGetRequest(`${usersBaseUrl}exists?mail=${validUser.mail}`);
        expect(response.body).toHaveProperty("exists");
        expect(response.body?.exists).toBeTruthy();
    });

    it("Should return false if user does not exists", async () => {
        const response = await sendGetRequest(`${usersBaseUrl}exists?mail=${validUser.mail}`);
        expect(response.body).toHaveProperty("exists");
        expect(response.body?.exists).toBeFalsy();
    });
});
