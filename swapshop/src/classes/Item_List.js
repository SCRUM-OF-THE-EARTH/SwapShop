import { TouchableNativeFeedbackBase } from "react-native";
import { Communicator } from "./Communicator";

const communicator = new Communicator();

export class Item_List {
    constructor(command) {
        this.json_items;
        this.fetchItems(command);
        this.items = [];
        console.log("item list has been created");
    }

    getItems() {
        return this.items;
    }

    async fetchItems(command) {
        this.json_items = await communicator.makeRequestByCommand(command);
    }

    loadItems(contructorFunc) {
        console.log(this.json_items)
        this.constructorFunc = contructorFunc;
        this.json_items.forEach(item => {
            console.log(item);
            this.items.push(this.constructorFunc(item));
        });
    }

    async addItem(command, param_values) {
        let jsonRes = await communicator.makeRequestByCommand(command, param_values);
        this.items.push(this.constructorFunc(jsonRes));

    }

    logItems() {
        this.items.forEach(item => {
            item.logItem();
        })
    }

    searchItems(searchterm) {
        let searchResults = [];
        this.items.forEach((item) => {
            if (item.compareTerm(searchterm)) {
                searchResults.push(item);
            }
        });

        return searchResults;
    }
}