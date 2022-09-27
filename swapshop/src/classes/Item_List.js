
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
        this.filteredResults =[];
        this.searchTerm;
    }

    // getItems is simply used to return the array of objects stored in the item list
    getItems() {
        return this.items;
    }

    // getJsonItems simply returns the array of json items 
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
        this.constructorFunc = contructorFunc;
        this.json_items.forEach(item => {
            this.items.push(this.constructorFunc(item));
        });

        this.loaded = true;
        this.filteredResults = this.items;
    }

    // addItem is used to create a new object usign the call back constructor function and both add it to the json items and items array
    // as well as make an api call to insert into a database
    async addItem(command, param_values) {
        let jsonRes = await communicator.makeRequestByCommand(command, param_values);
        if (jsonRes != false) {
            this.json_items.push(jsonRes);
            this.items.push(this.constructorFunc(jsonRes));
            return true;
        }
        
        return false;   
    }

    // deleteItem is used to delete to delete an Item from the list of json items and the database
    async deleteItem(command, id) {
        returnValue = false;
        let jsonRes = await communicator.makeRequestByCommand(command, [id]).then(() => {
            if (jsonRes != false) {
                returnValue = true;
            }
        })
        
        if (returnValue) {
            this.removeItemByID(id);
        }

        return returnValue;
    }

    // search items is used to refine the list of items presented by a search term
    // it takes in a string search Term and will compare each object to it
    // it will return the new list of items after it has been filtered by the search term
    searchItems(searchterm) {
        let temp = [];
        this.searchTerm = searchterm;

            this.items.forEach((item) => {
                if (item.compareTerm(searchterm)) {
                    temp.push(item);
                }
            });

        this.filteredResults = temp;
    }

    // findByID is used to find an item in the list of items with a specific ID
    // it takes in a integer for id 
    // and returns the resulting item if an item with the correct ID is found
    // if no item is found it returns false
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

    // removeItemById is used to delete a trade item from the json_item list and the items list by passing it an id
    removeItemByID(id) {
        let pos = false;
        this.json_items.forEach((item, i) => {
            if (item['id'] == id){
                pos = i;
                return;
            }
        });

        if (pos != false) {
            this.json_items.splice(pos, 1);
        }

        pos = false;
        this.items.forEach((item,i) => {
            if (item.getID() == id) {
                pos = i;
                return;
            }
        });

        if (pos != false) {
            this.items.splice(pos, 1);
        }
    }
};

export class Trade_item_list extends Item_List {
    constructor() {;
        super("fetch-trade-items");
        this.index = 0;
        this.tagsActive = false;
        this.ActiveTags = [];
    }

    Sort(index) {
        if (index != null) {
            this.index = index;
        }

        if (this.index == 0) {
            this.filteredResults.sort((a,b) => Date(b.date_created) > Date(a.date_created) ? 1:-1);
        }
        if (this.index == 1 ){
            this.filteredResults.sort((a,b) => parseFloat(b.item_value) > parseFloat(a.item_value) ? 1:-1);
        }

        if (this.index == 2) {
            this.filteredResults.sort((a,b) => parseFloat(a.item_value) > parseFloat(b.item_value) ? 1:-1);
        }

        if (this.index == 3) {
            this.filteredResults.sort((a,b) => a.item_name > b.item_name ? 1:-1);
        }

        if (this.index == 4) {
            this.filteredResults.sort((a,b) => b.item_name > a.item_name ? 1: -1);
        }
        return this.filteredResults;
    }

    searchItems(searchterm) {
        this.tagActive = true;
        this.searchTerm = searchterm;
        super.searchItems(searchterm);
        this.Sort();
        this.filterByTags(this.ActiveTags);
        
    }

    filterByTags(tags) {
        this.ActiveTags = tags;

        if (tags.length == 0) {
            super.searchItems(this.searchTerm);
            this.Sort();
            return;
        }

        if (!this.tagActive) {
            
            this.searchItems(this.searchTerm);
            this.tagActive = false;
        }
        let isTagged;
        for (let i =this.filteredResults.length -1; i >= 0 ; i--) {
            isTagged = true;

            for (let j =0; j < tags.length; j++) {
                if(!this.filteredResults[i].tags.find(t => t.getID() == tags[j].getID())) {
                    isTagged = false;
                    break;
                }
            }

            if (!isTagged) {
                this.filteredResults.splice(i,1);
            }
        }

    }
}

export class Tag_list extends Item_List {
    constructor() {
        super("fetch-tags");
    }

    getTags() {
        let names = [];

        this.items.forEach((item) => {
            let tempTagItem = {label: "", value: 0};
            tempTagItem['label'] = item.getName();
            tempTagItem['value'] = item;
            names.push(tempTagItem);
        });
        return names;
    }
}