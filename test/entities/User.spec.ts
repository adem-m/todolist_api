import {User} from "../../src/entities";

describe("User entity", function () {
    const validDate = new Date();
    validDate.setFullYear(validDate.getFullYear() - 13);

    const props = {
        name: "name",
        lastname: "lastname",
        password: "123456789",
        mail: "TEST@test.test",
        birthdate: validDate
    }

    it("should be valid", function () {
        const res = User.build(props);

        expect(res.isSuccess).toBe(true);
        expect(res.error).toBe(undefined);
        expect(res.getValue()).toBeTruthy();
    })

    it("should be invalid when name is empty", function () {
        const res = User.build({
            ...props,
            name: ""
        });

        expect(res.isSuccess).toBe(false);
        expect(res.error).toBe("Name too short");
    })

    it("should be invalid when lastname is empty", function () {
        const res = User.build({
            ...props,
            lastname: ""
        });

        expect(res.isSuccess).toBe(false);
        expect(res.error).toBe("Lastname too short");
    })

    it("should be invalid if password is too short", function () {
        const res = User.build({
            ...props,
            password: "1234567"
        });

        expect(res.isSuccess).toBe(false);
        expect(res.error).toBe("Invalid password");
    })

    it("should be invalid if password is too long", function () {
        const res = User.build({
            ...props,
            password: "01234567890123456789012345678901234567890"
        });

        expect(res.isSuccess).toBe(false);
        expect(res.error).toBe("Invalid password");
    })

    it("should be invalid when mail is invalid", function () {
        const res = User.build({
            ...props,
            mail: "a random mail"
        });

        expect(res.isSuccess).toBe(false);
        expect(res.error).toBe("Invalid mail");
    })

    it("should be invalid when user is too young", function () {
        const invalidDate = new Date(validDate);
        invalidDate.setDate(invalidDate.getDate() + 1);

        const res = User.build({
            ...props,
            birthdate: invalidDate
        });

        expect(res.isSuccess).toBe(false);
        expect(res.error).toBe("Too young");
    })
})
