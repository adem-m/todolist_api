import {
    clearDatabase,
    sendGetRequest,
    sendPostRequest,
    todolistsBaseUrl,
    usersBaseUrl,
    validUser
} from "../test.commons";

jest.setTimeout(10000);

describe("Todolist controller", () => {
    afterEach(async () => {
        await clearDatabase();
    });

    it("Should create todolist if user exists", async () => {
        await sendPostRequest(usersBaseUrl, JSON.stringify(validUser));
        const response = await sendPostRequest(todolistsBaseUrl, JSON.stringify({mail: validUser.mail}));
        expect(response.status).toBe(201);
    });
    it("Should not create todolist if user does not exists", async () => {
        const response = await sendPostRequest(todolistsBaseUrl, JSON.stringify({mail: validUser.mail}));
        expect(response.status).toBe(400);
    });
    it("Should return true if todolist exists", async () => {
        await sendPostRequest(usersBaseUrl, JSON.stringify(validUser));
        await sendPostRequest(todolistsBaseUrl, JSON.stringify({mail: validUser.mail}));
        const response = await sendGetRequest(`${todolistsBaseUrl}exists?mail=${validUser.mail}`);
        expect(response.body).toHaveProperty("exists");
        expect(response.body?.exists).toBeTruthy();
    });
    it("Should return false if todolist does not exists", async () => {
        await sendPostRequest(usersBaseUrl, JSON.stringify(validUser));
        const response = await sendGetRequest(`${todolistsBaseUrl}exists?mail=${validUser.mail}`);
        expect(response.body).toHaveProperty("exists");
        expect(response.body?.exists).toBeFalsy();
    });
});
