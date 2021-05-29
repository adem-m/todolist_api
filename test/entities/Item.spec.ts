import {Item, User} from "../../src/entities";

describe("Item entity", function () {
    const validDate = new Date();
    validDate.setFullYear(validDate.getFullYear() - 15);
    const props = {
        name: "name",
        content: "content",
        createdAt: new Date(),
        owner: User.build({
            name: "toto",
            lastname: "toto",
            password: "tototototo",
            mail: "toto@toto.com",
            birthdate: validDate
        }).getValue()
    };

    it("should be valid", function () {
        const res = Item.build(props);

        expect(res.isSuccess).toBe(true);
        expect(res.error).toBe(undefined);
        expect(res.getValue()).toBeTruthy();
    })

    it("should be invalid if name is empty", function () {
        const res = Item.build({
            ...props,
            name: ""
        });

        expect(res.isSuccess).toBe(false);
        expect(res.error).toBe("Name too short");
    })

    it("should be invalid if content is empty", function () {
        const res = Item.build({
            ...props,
            content: ""
        });

        expect(res.isSuccess).toBe(false);
        expect(res.error).toBe("Invalid content");
    })

    it("should be invalid if content is too long", function () {
        const res = Item.build({
            ...props,
            content: "this is a testing string!".repeat(41)
        });

        expect(res.isSuccess).toBe(false);
        expect(res.error).toBe("Invalid content");
    })
})
