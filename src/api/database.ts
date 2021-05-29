import Loki from 'lokijs';

const db = new Loki("todolist");

export const users = db.addCollection("user", {unique: ['mail']});
export const toDoLists = db.addCollection("toDoList", {unique: ['owner']});
export const items = db.addCollection("item");
