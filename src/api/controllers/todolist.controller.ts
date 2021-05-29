import {ToDoList} from "../../entities";
import {toDoLists} from "../database";
import {UserController} from "./user.controller";

export class ToDoListController {
    create(mail: string): ToDoList | null {
        const owner = new UserController().getByMail(mail);
        if (owner === null) {
            return null;
        }
        const toDoList = new ToDoList(owner, {
            notifyTwoItemsRemaining: async () => {
            }
        });
        if (!this.checkIfExists(mail) && toDoLists.insert(toDoList) !== undefined) {
            return toDoList;
        }
        return null;
    }

    checkIfExists(mail: string): boolean {
        const lists = toDoLists.find() as unknown as ToDoList[];
        const result = lists.filter(list => {
            return list.owner.mail === mail
        });
        return result.length !== 0;
    }
}
