import {User} from "../../../src/entities";
import {
    itemsBaseUrl,
    sendDeleteRequest,
    sendGetRequest,
    sendPostRequest,
    todolistsBaseUrl,
    usersBaseUrl
} from "../test.commons";

describe("Typical use case", () => {
    const validDate = new Date();
    validDate.setFullYear(validDate.getFullYear() - 15);
    const user = User.build({
        name: "John",
        lastname: "Doe",
        mail: "john@doe.com",
        password: "johndoedohnjoe",
        birthdate: validDate
    }).getValue();

    const firstItem = {
        mail: user.mail,
        name: "First item",
        content: "Very important"
    };
    const secondItem = {
        mail: user.mail,
        name: "Second item",
        content: "Not important"
    };
    const thirdItem = {
        mail: user.mail,
        name: "Third item",
        content: "Quite important"
    };

    it("Create user, create todolist, create 3 items, delete first item", async () => {
        const createUserResponse = await sendPostRequest(usersBaseUrl, JSON.stringify(user));
        expect(createUserResponse.status).toBe(201);

        const userExistsResponse = await sendGetRequest(`${usersBaseUrl}exists?mail=${user.mail}`);
        expect(userExistsResponse.body).toHaveProperty("exists");
        expect(userExistsResponse.body?.exists).toBeTruthy();

        const createTodolistResponse = await sendPostRequest(todolistsBaseUrl, JSON.stringify({mail: user.mail}));
        expect(createTodolistResponse.status).toBe(201);

        const todolistExistsResponse = await sendGetRequest(`${todolistsBaseUrl}exists?mail=${user.mail}`);
        expect(todolistExistsResponse.body).toHaveProperty("exists");
        expect(todolistExistsResponse.body?.exists).toBeTruthy();

        const firstItemResponse = await sendPostRequest(itemsBaseUrl, JSON.stringify(firstItem));
        expect(firstItemResponse.status).toBe(201);
        const secondItemResponse = await sendPostRequest(itemsBaseUrl, JSON.stringify(secondItem));
        expect(secondItemResponse.status).toBe(201);
        const thirdItemResponse = await sendPostRequest(itemsBaseUrl, JSON.stringify(thirdItem));
        expect(thirdItemResponse.status).toBe(201);

        const firstItemsCheck = await sendGetRequest(`${itemsBaseUrl}all?mail=${user.mail}`);
        expect(firstItemsCheck.body).toBeInstanceOf(Array);
        expect(firstItemsCheck.body.length).toBe(3);

        const deleteResponse = await sendDeleteRequest(
            `${itemsBaseUrl}${firstItemsCheck.body[0].id}?mail=${user.mail}`);
        expect(deleteResponse.status).toBe(204);

        const secondItemsCheck = await sendGetRequest(`${itemsBaseUrl}all?mail=${user.mail}`);
        expect(secondItemsCheck.body.length).toBe(2);
        expect(secondItemsCheck.body[0].id).toBe(2);
        expect(secondItemsCheck.body[0].name).toBe(secondItem.name);
        expect(secondItemsCheck.body[0].content).toBe(secondItem.content);
        expect(secondItemsCheck.body[1].id).toBe(3);
        expect(secondItemsCheck.body[1].name).toBe(thirdItem.name);
        expect(secondItemsCheck.body[1].content).toBe(thirdItem.content);
    });
});
