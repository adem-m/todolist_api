import {
    clearDatabase,
    itemsBaseUrl,
    sendDeleteRequest,
    sendGetRequest,
    sendPostRequest,
    todolistsBaseUrl,
    usersBaseUrl,
    validItem,
    validUser
} from "../test.commons";

describe("Item controller", () => {
    beforeEach(async () => {
        await sendPostRequest(usersBaseUrl, JSON.stringify(validUser));
    });
    afterEach(async () => {
        await clearDatabase();
    });

    it("Should create item if todolist exists", async () => {
        await sendPostRequest(todolistsBaseUrl, JSON.stringify({mail: validUser.mail}));
        const response = await sendPostRequest(itemsBaseUrl, JSON.stringify(validItem));
        expect(response.status).toBe(201);
    });
    it("Should not create item if todolist does not exists", async () => {
        const response = await sendPostRequest(itemsBaseUrl, JSON.stringify(validItem));
        expect(response.status).toBe(400);
    });
    it("Should return an empty array if no items has been created", async () => {
        await sendPostRequest(todolistsBaseUrl, JSON.stringify({mail: validUser.mail}));
        const response = await sendGetRequest(`${itemsBaseUrl}all?mail=${validUser.mail}`);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBe(0);
    });
    it("Should return an array with created items", async () => {
        await sendPostRequest(todolistsBaseUrl, JSON.stringify({mail: validUser.mail}));
        await sendPostRequest(itemsBaseUrl, JSON.stringify(validItem));
        await sendPostRequest(itemsBaseUrl, JSON.stringify(validItem));
        const response = await sendGetRequest(`${itemsBaseUrl}all?mail=${validUser.mail}`);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBe(2);
        response.body.forEach((item: any) => {
            expect(item.name).toBe(validItem.name);
            expect(item.content).toBe(validItem.content);
        });
    });

    it("Should return a smaller array when item is deleted", async () => {
        await sendPostRequest(todolistsBaseUrl, JSON.stringify({mail: validUser.mail}));
        await sendPostRequest(itemsBaseUrl, JSON.stringify(validItem));
        const filledArrayResponse = await sendGetRequest(`${itemsBaseUrl}all?mail=${validUser.mail}`);
        expect(filledArrayResponse.body.length).toBe(1);
        const deleteResponse = await sendDeleteRequest(
            `${itemsBaseUrl}${filledArrayResponse.body[0].id}?mail=${validUser.mail}`);
        expect(deleteResponse.status).toBe(204);
        const emptyArrayResponse = await sendGetRequest(`${itemsBaseUrl}all?mail=${validUser.mail}`);
        expect(emptyArrayResponse.body.length).toBe(0);
    });

    it("Should return a not found error when deleting non existing item", async () => {
        await sendPostRequest(todolistsBaseUrl, JSON.stringify({mail: validUser.mail}));
        await sendPostRequest(itemsBaseUrl, JSON.stringify(validItem));
        const response = await sendDeleteRequest(
            `${itemsBaseUrl}999?mail=${validUser.mail}`);
        expect(response.status).toBe(404);
    });

    it("Should return a bad request error when no mail specified", async () => {
        await sendPostRequest(todolistsBaseUrl, JSON.stringify({mail: validUser.mail}));
        await sendPostRequest(itemsBaseUrl, JSON.stringify(validItem));
        const filledArrayResponse = await sendGetRequest(`${itemsBaseUrl}all?mail=${validUser.mail}`);
        const response = await sendDeleteRequest(
            `${itemsBaseUrl}${filledArrayResponse.body[0].id}`);
        expect(response.status).toBe(400);
    });
});
