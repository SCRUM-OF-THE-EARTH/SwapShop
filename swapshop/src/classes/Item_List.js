
import { communicator } from "./Communicator"

// the item list class is used a data structure to contain and manage:
// - all the posted trade item from users
// - the list of users who have accounts in the swapshop
// - the list of chats that exist between a userst
// etc.

// this class takes in a command name (from APIcommands) in order to fetch a json array of items that are to be organised into an item list
// it has 3 parameters:
//  - json_item : which contains the raw json array that gets returned from the communicator
//  - items : an array of the desired object
// - contructorFunc : the callback function used to create a new instance of the desired object

export class Item_List {
    constructor(command) {
        this.json_items = false;
        this.fetchItems(command);
        this.items = [];
        this.loaded = false;
    }

    // getItems is simply used to return the array of objects stored in the item list
    getItems() {
        return this.items;
    }

    getJsonItems(){
        return this.json_items;
    }
    // fetchItems is used to get the json_array from the communicator 
    // it takes in a command name (command) which it passes on to the communicator 
    // it sets the json_item to the results of the communicators request

    async fetchItems(command) {
        this.json_items = await communicator.makeRequestByCommand(command);
    }


    // loadItems is used to translate the items in the json_array into a list of objects in the desired type
    // it takes in a constructor function which is a callback fucntion used to create an new instance of the object the 
    // developer desires
    // it will go through each json object and create an Object for it and push it to the items array

    loadItems(contructorFunc) {
        console.log(this.json_items)
        this.constructorFunc = contructorFunc;
        this.json_items.forEach(item => {
            console.log(item);
            this.items.push(this.constructorFunc(item));
        });
        this.loaded = true;
    }

    // addItem is used to create a new object usign the call back constructor function and both add it to the json items and items array
    // as well as make an api call to insert into a database
    async addItem(command, param_values) {
        let jsonRes = await communicator.makeRequestByCommand(command, param_values);
        this.json_items.push(jsonRes);
        this.items.push(this.constructorFunc(jsonRes));
        return this;
    }

    // logItem is used to console log each of the items in the list

    // logItems() {
    //     this.items.forEach(item => {
    //         item.logItem();
    //     })
    // }

    // search items is used to refine the list of items presented by a search term
    // it takes in a string search Term and will compare each object to it
    // it will return the new list of items after it has been filtered by the search term
    searchItems(searchterm) {
        let searchResults = [];
        this.items.forEach((item) => {
            if (item.compareTerm(searchterm)) {
                searchResults.push(item);
            }
        });

        return searchResults;
    }

    findByID(id) {
        let resultItem = false;
        this.items.forEach((item) => {
            if (item.getID() == id) {
                resultItem = item;
                return;
            }
        });

        return resultItem;
    }
}