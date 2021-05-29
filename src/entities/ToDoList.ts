import { Result } from "../commons";
import { IEmailService } from "../services";
import { Item } from "./Item";
import { User } from "./User";

export class ToDoList {
    static readonly MAX_ITEMS = 10;
    static readonly NOTIFICATION_THRESHOLD = 8;
    static readonly TIMEOUT = 30 * 60 * 1000; // in ms
    private items: Array<Item>;

    constructor(private owner: User, private notifier: IEmailService){
        this.items = new Array<Item>();
    }

    public getItems(): Array<Item> {
        return this.items;
    }

    public getOwner(): User {
        return this.owner;
    }

    private itemExists(item: Item): boolean {
        const searched = this.items.find(function(el: Item){
            return el.getName() === item.getName();
        });
        return searched !== undefined;
    }

    private isTimeoutActive(item: Item): boolean {
        if(this.items.length === 0){
            return false;
        }
        const lastItem = this.items[this.items.length - 1];
        const diff = item.getCreatedAt().getTime() - lastItem.getCreatedAt().getTime();
        return diff < ToDoList.TIMEOUT;
    }
    
    public addItem(item:Item): Result<Item>{
        if(this.itemExists(item)){
            return Result.ko<Item>("Already exists");
        }

        if(this.items.length === ToDoList.MAX_ITEMS){
            return Result.ko<Item>("Max capacity reached");
        }

        if(this.isTimeoutActive(item)){
            return Result.ko<Item>("Must wait timeout end");
        }

        this.items.push(item);
        if(this.items.length === ToDoList.NOTIFICATION_THRESHOLD){
            this.notifier.notifyTwoItemsRemaining(this.owner);
        }
        return Result.ok<Item>(item);
    }
}
