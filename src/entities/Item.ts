import { Result } from "../commons";

interface ItemProps {
    name: string,
    content: string,
    createdAt: Date
}

export class Item {
    private constructor(
        private name: string,
        private content: string,
        private createdAt: Date
    ){}

    public getName(): string {
        return this.name;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public static build(props: ItemProps): Result<Item> {
        if(props.name.length === 0){
            return Result.ko<Item>("Name too short");
        }

        if(props.content.length === 0 || props.content.length > 1000){
            return Result.ko<Item>("Invalid content");
        }

        return Result.ok(new Item(
            props.name,
            props.content,
            props.createdAt
        ));
    }
}