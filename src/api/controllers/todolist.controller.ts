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
        if (toDoLists.insert(toDoList) !== undefined) {
            return toDoList;
        }
        return null;
    }
}
