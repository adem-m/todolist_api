import {Item, ToDoList, User} from "../../src/entities";

const notifyTwoItemsRemaining = jest.fn()
    .mockImplementation(async () => {
    });

describe("ToDoList entity", function () {
    const birthdate = new Date();
    birthdate.setFullYear(birthdate.getFullYear() - 13);

    const notifier = {
        notifyTwoItemsRemaining
    }

    const user = User.build({
        name: "name",
        lastname: "lastname",
        mail: "mail@mail.mail",
        password: "123456789",
        birthdate
    }).getValue();
    const list = new ToDoList(user, notifier);

    const props = {
        name: "name",
        content: "content",
        createdAt: new Date(),
        owner: user
    };
    const item = Item.build(props).getValue();

    beforeEach(function () {
        notifyTwoItemsRemaining.mockClear();
        const array = list.getItems();
        while (array.length) {
            array.pop();
        }
    })

    it("should add new item", function () {
        const res = list.addItem(item);

        expect(res.isSuccess).toBe(true);
        expect(res.error).toBe(undefined);
        expect(res.getValue()).toBeTruthy();
        expect(list.getItems().length).toBe(1);
        expect(notifyTwoItemsRemaining).toHaveBeenCalledTimes(0);
    })

    it("should not add already existing item", function () {
        list.addItem(item);
        const creationTime = item.getCreatedAt().getTime() + 1 + ToDoList.TIMEOUT;
        const item2 = Item.build({
            ...props,
            createdAt: new Date(creationTime)
        }).getValue();
        const res = list.addItem(item2);

        expect(res.isSuccess).toBe(false);
        expect(res.error).toBe("Already exists");
        expect(list.getItems().length).toBe(1);
        expect(notifyTwoItemsRemaining).toHaveBeenCalledTimes(0);
    })

    it("should not add item if max capacity is reached", function () {
        let time = item.getCreatedAt().getTime();
        for (let i = 0; i < ToDoList.MAX_ITEMS; i++) {
            const item = Item.build({
                ...props,
                name: `name${i}`,
                createdAt: new Date(time)
            })
                .getValue();
            list.addItem(item);
            time += ToDoList.TIMEOUT;
        }

        const item2 = Item.build({
            ...props,
            name: "name",
            createdAt: new Date(time)
        }).getValue();
        const res = list.addItem(item2);

        expect(res.isSuccess).toBe(false);
        expect(res.error).toBe("Max capacity reached");
        expect(list.getItems().length).toBe(10);
        expect(notifyTwoItemsRemaining).toHaveBeenCalledTimes(1);
        expect(notifyTwoItemsRemaining).toHaveBeenCalledWith(list.getOwner());
    })

    it("should not add a new item before timeout", function () {
        list.addItem(item);
        const creationTime = item.getCreatedAt().getTime() + ToDoList.TIMEOUT - 1;
        const item2 = Item.build({
            ...props,
            name: "name2",
            createdAt: new Date(creationTime)
        }).getValue();
        const res = list.addItem(item2);

        expect(res.isSuccess).toBe(false);
        expect(res.error).toBe("Must wait timeout end");
        expect(list.getItems().length).toBe(1);
        expect(notifyTwoItemsRemaining).toHaveBeenCalledTimes(0);
    })

    it("should send mail when list has reached threshold", function () {
        let time = item.getCreatedAt().getTime();
        for (let i = 0; i < ToDoList.NOTIFICATION_THRESHOLD - 1; i++) {
            const item = Item.build({
                ...props,
                name: `name${i}`,
                createdAt: new Date(time)
            })
                .getValue();
            list.addItem(item);
            time += ToDoList.TIMEOUT;
        }

        const item2 = Item.build({
            ...props,
            name: "name",
            createdAt: new Date(time)
        }).getValue();
        const res = list.addItem(item2);

        expect(res.isSuccess).toBe(true);
        expect(res.error).toBe(undefined);
        expect(res.getValue()).toBeTruthy();
        expect(notifyTwoItemsRemaining).toHaveBeenCalledTimes(1);
        expect(notifyTwoItemsRemaining).toHaveBeenCalledWith(list.getOwner());
    })
})
