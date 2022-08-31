import { Communicator } from "./Communicator";

const communicator = new Communicator();

export class Item_List {
    constructor(command) {
        this.json_items;
        this.fetchItems(command);
        this.items = [];
        console.log("item list has been created");
    }

    async fetchItems(command) {
        this.json_items = await communicator.makeRequestByCommand(command);
    }

    loadItems(contructorFunc) {
        console.log(this.json_items)
        this.json_items.forEach(item => {
            console.log(item);
            this.items.push(contructorFunc(item));
        });

        this.items
    }
}