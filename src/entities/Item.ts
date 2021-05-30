import {Result} from "../commons";
import {User} from "./User";

interface ItemProps {
    name: string,
    content: string,
    createdAt: Date,
    owner: User
}

export class Item {
    private constructor(
        public name: string,
        public content: string,
        public createdAt: Date,
        public owner: User
    ) {
    }

    public static build(props: ItemProps): Result<Item> {
        if (props.name.length === 0) {
            return Result.ko<Item>("Name too short");
        }

        if (props.content.length === 0 || props.content.length > 1000) {
            return Result.ko<Item>("Invalid content");
        }

        return Result.ok(new Item(
            props.name,
            props.content,
            props.createdAt,
            props.owner
        ));
    }

    public getName(): string {
        return this.name;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }
}
