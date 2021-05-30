import {Result} from "../commons";

interface UserProps {
    name: string,
    lastname: string,
    mail: string,
    password: string,
    birthdate: Date
}

export class User {
    private constructor(
        public name: string,
        public lastname: string,
        public mail: string,
        public password: string,
        public birthdate: Date
    ) {
    }

    static build(props: UserProps): Result<User> {
        if (props.name.length === 0) {
            return Result.ko<User>("Name too short");
        }

        if (props.lastname.length === 0) {
            return Result.ko<User>("Lastname too short");
        }

        if (props.password.length < 8 || 40 < props.password.length) {
            return Result.ko<User>("Invalid password");
        }

        const mailCheck = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if (!mailCheck.test(props.mail.toLowerCase())) {
            return Result.ko<User>("Invalid mail");
        }

        const today = new Date();
        const check = new Date(props.birthdate);
        check.setFullYear(check.getFullYear() + 13);
        if (check > today) {
            return Result.ko<User>("Too young");
        }

        return Result.ok<User>(new User(
            props.name,
            props.lastname,
            props.mail,
            props.password,
            props.birthdate
        ));
    }
}
