import { Communicator } from "./Communicator";


export class Trade_Item {
    constructor(item) {
        console.log("new trade item has been created with:")
        console.log(item)
        this.item_name;
        this.item_value;
        this.owner;
        this.item_description;
        this.id;

        return this;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    getName() {
        return this.name;
    }

    setValue(value) {
        this.item_value = value;
        return this;
    }

    getValue() {
        return this.item_value;
    }

    setOwner(owner) {
        this.owner = owner;
        return this;
    }

    getOwner() {
        return this.owner;
    }

    setDescription(desc) {
        this.item_description = desc;
        return this;
    }

    getDescription() {
        return this.item_description;
    }

    logItem() {
        console.group(`item ${this.id}`);
        console.log(`item Name: ${this.item_name}`);
        console.log(`Item estimated value: ${this.item_value}`);
        console.log(`item Owner:`)
        this.owner.logUser();
        console.log(`Item description: ${this.item_description}`);
    }


}