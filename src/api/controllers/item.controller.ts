import {items} from "../database";
import {UserController} from "./user.controller";
import {Item} from "../../entities";
import {ToDoListController} from "./todolist.controller";

interface ItemCreationProps {
    name: string,
    content: string,
    mail: string
}

export class ItemController {
    create(props: ItemCreationProps): Item | null {
        const owner = new UserController().getByMail(props.mail);
        if (owner === null) {
            return null;
        }
        const item = Item.build({
            name: props.name,
            content: props.content,
            owner,
            createdAt: new Date()
        });

        if (new ToDoListController().checkIfExists(props.mail) &&
            item.isSuccess
            && items.insert(item.getValue()) !== undefined) {
            return item.getValue();
        }
        return null;
    }
}
