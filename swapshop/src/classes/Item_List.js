import { Communicator } from "./Communicator";

const communicator = new Communicator();

export class Item_List {
    constructor() {
        this.json_items;
        this.items = [];
        console.log("item list has been created");
    }

    async fetchItems(command, constructorFunc) {
        this.json_items = await communicator.makeRequestByCommand(command);
        this.loadItems(constructorFunc)
        return this;
    }

    loadItems(contructorFunc) {
        this.json_items.forEach(item => {
            this.Items.push(contructorFunc(item));
        });
    }
}