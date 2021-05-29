import {User} from "../../entities";
import {users} from "../database";

interface UserCreationProps {
    name: string,
    lastname: string,
    mail: string,
    password: string,
    birthdate: Date
}

export class UserController {
    create(props: UserCreationProps): User | null {
        const user = User.build({
            name: props.name,
            lastname: props.lastname,
            mail: props.mail,
            password: props.password,
            birthdate: new Date(props.birthdate)
        });
        if (user.isSuccess && users.insert(user.getValue()) !== undefined) {
            return user.getValue();
        }
        return null;
    }

    getByMail(mail: string) {
        const result = users.find({'mail': mail});
        if (result.length !== 1) {
            return null;
        }
        return result[0];
    }
}
