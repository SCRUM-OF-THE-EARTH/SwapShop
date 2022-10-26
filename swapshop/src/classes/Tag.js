// The Tag class is used to hold information regarding Tag objects
// it conatins the following methods:
//  | get and set methods for parameters
//  | compareTerm which compares the name of the Tag to some searhcTerm
export class Tag {
    constructor(item) {
        this.name = item['name']; 
        this.date_created = item['date_created'];
        this.id = item['id'];
        this.exchange = item['exchange'];
    }

    // getName is used to retirieve the name of the tag
    // it takes in no parameters
    // and returns the Tag's name aas a string
    getName() {
        return this.name;
    }

    // getID is used to retrieve the ID of the tag
    // it takes in no parameters
    // and returns the Tag as an int
    getID() {
        return this.id;
    }

    getTagValue() {
        let tempTagItem = {label: "", value: 0};
        tempTagItem['label'] = this.name;
        tempTagItem['value'] = this;

        return tempTagItem;
    }

    // compareTerm is used to compare the Tag obejects name to a search Term
    // it takes in a string search term as a parameter
    // and returns a boolean
    //  -> true if the tag namw contaisn the search Term
    //  -> false if the tag name does not contain the searchTerm
    compareTerm(searchTerm) {
        searchTerm = searchTerm.toLowerCase();

        if(this.name.toLowerCase().includes(searchTerm)) {
            return true;
        }

        return false;
    }
}