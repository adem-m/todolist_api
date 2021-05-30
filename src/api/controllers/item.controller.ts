import {items} from "../database";
import {UserController} from "./user.controller";
import {Item} from "../../entities";
import {ToDoListController} from "./todolist.controller";

interface ItemCreationProps {
    name: string,
    content: string,
    mail: string
}

interface CoreItem {
    id: number,
    name: string,
    content: string,
    createdAt: string,
    owner: string
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

    getAll(mail: string): CoreItem[] | null {
        if (new UserController().getByMail(mail) === null || new ToDoListController().checkIfExists(mail) === null) {
            return null;
        }
        const allItems = items.find();

        const userItems = allItems.filter(item => {
            return item.owner.mail === mail
        });

        return ItemController.formatGetAllResult(userItems);
    }

    delete(mail: string, id: number): Item | null {
        if (new UserController().getByMail(mail) === null || new ToDoListController().checkIfExists(mail) === null) {
            return null;
        }
        const item = items.get(id);

        if (item === null) {
            return null;
        }
        items.remove(item);
        return item as Item;
    }

    private static formatGetAllResult(items: any[]): CoreItem[] {
        return items.map(item => {
            return {
                id: item.$loki,
                name: item.name,
                content: item.content,
                createdAt: item.createdAt,
                owner: item.owner.mail
            };
        });
    }
}
