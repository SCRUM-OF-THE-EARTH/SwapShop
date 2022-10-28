
import { Tag } from "./Tag";

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
    constructor(command, communicator) {
        this.command = command;
        this.json_items = false;
        this.items = [];
        this.filteredResults =[];
        this.searchTerm;
        this.communicator = communicator;
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
    async fetchItems() {
        return this.json_items = await this.communicator.makeRequestByCommand(this.command);
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
        this.filteredResults = this.items;
    }

    // addItem is used to create a new object usign the call back constructor function and both add it to the json items and items array
    // as well as make an api call to insert into a database
    async addItem(command, param_values) {
        let jsonRes = await this.communicator.makeRequestByCommand(command, param_values);
        if (jsonRes != false) {
            this.json_items.push(jsonRes);
            this.items.push(this.constructorFunc(jsonRes));
            return true;
        }
        
        return false;   
    }

    // deleteItem is used to delete to delete an Item from the list of json items and the database
    async deleteItem(command, id) {
        let jsonRes = await this.communicator.makeRequestByCommand(command, [id])

        this.removeItemByID(id);
        return jsonRes;
    }

    // search items is used to refine the list of items presented by a search term
    // it takes in a string search Term and will compare each object to it
    // it will return the new list of items after it has been filtered by the search term
    searchItems(searchterm) {
        let temp = [];
        this.searchTerm = searchterm;

            this.items.forEach((item) => {
                if (item.compareTerm(this.searchTerm)) {
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

// The trade item list is a sub class of item list that is for trde items speecifically
// it give methods that allow the Trade Items to be sorted and searched and filtered by tags
// for construction it takes in no parameters
//
// it contains the methods
//  | Sort whcih taes in 1 or less parameters for sorting index
//  | searchitem whish takes in a strin gseach term and overwrites the searchTerm super method
//  | filter by tags which takes in a list of tags filters he list of trade ites by the tags they are associated to

export class Trade_item_list extends Item_List {
    constructor(sold, communicator, login_user) {

        if (sold) {
            super("fetch-sold-trade-items", communicator)
        } else {
            super("fetch-trade-items", communicator);
        }
        
        this.index = null;
        this.ActiveTags = [];
        this.login_user = login_user
    }


    // the Sort method is used to sort the list of trade items by the name, price and date created
    // it takes in an integer from 0 to 4 or NULL
    // and returns a sorted list of trade items
    Sort(index) {
        if (index != null) {
            this.index = index;
        } 
        if (index === null) {
            this.filteredResults.sort((a,b) => compareInterest(a,b, this.login_user));
        }

        if (this.index == 0) {
            this.filteredResults.sort((a,b) => Date(b.date_created) < Date(a.date_created) ? 1:-1);
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

    // this searh Term is used to overwrite the super searchItem method
    searchItems(searchterm) {
        this.searchTerm = searchterm;
        super.searchItems(searchterm);
        // this.filterByTags(this.ActiveTags);
        // this.Sort();
    }

    //filterByTags is used to filter the list of items by a list of active tags
    // it takes in a list of tag objects
    // and returns void
    filterByTags(tags) {
        this.ActiveTags = tags;

        super.searchItems(this.searchTerm);

        if (tags.length == 0) {
            this.Sort(this.index);
            return this.filteredResults;
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
        this.Sort(this.index);
        return this.filteredResults;
    }


    // filterByOwnerId take in an id integer and filters the list of object presented to the user by this id
    // it returns this filtered list
    filterByOwnerId(id) {
        this.filteredResults = this.filteredResults.filter((item) => item.getOwner().getID() == id)
        return this.filteredResults;
    }
}

// The Tag list class is a sub class of item_list made specifically for lists of Tag objects
// It contins the ethods
//  | getTags which retrieves teh list of tag items
export class Tag_list extends Item_List {
    constructor(communicator) {
        super("fetch-tags", communicator);
    }


    // getTags is used to retriece the list of tags for the dropdown tag menu
    getTags() {
        let names = [];

        this.items.forEach((item) => {
            let tempTagItem = {label: "", value: 0, key: ''};
            tempTagItem['label'] = item.getName();
            tempTagItem['value'] = item;
            tempTagItem['key'] = item.getID();
            names.push(tempTagItem);
        });
        return names;
    }

    // addTag takes in a tag object and adds it to the list of tags items for this item
    // it returns the tag it took in
    addTag(tag) {
        this.json_items.push(tag);
        let newTag = new Tag(tag)
        this.items.push(newTag);
        return tag;
    }
}


// comapreInterest is used to find the difference in tags between ibjects based on the active users interests
// it takes in two item objects and the login user 
// and returns 1 if there are more matching interests in item a and the login user 
// -1 if there are more matching interests in item b and login user
// or 0 if the matching tags are the same
export function compareInterest(a,b, login_user) {
    let counta = 0;
    let countb = 0;

    login_user.getInterests().forEach(tag_id => {
        a.getTags().forEach((tag) => {
            if (tag.getID() == tag_id) {
                counta++;
            }
        });

        b.getTags().forEach((tag) => {
            if (tag.getID() == tag_id) {
                countb++;
            }
        })
    });
    
    if (counta < countb) {
        return 1;
    } 
    if (counta > countb) {
        return -1;
    }

    return 0;     
}