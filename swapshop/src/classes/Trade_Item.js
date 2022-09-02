import { Communicator } from "./Communicator";
import {View, Text} from 'react-native';

export class Trade_Item {
    constructor(item) {
        console.log("new trade item has been created with:")
        console.log(item)
        this.item_name = item['item_name'];
        this.item_value = item['item_value'];
        this.owner_id = item['owner_id']
        this.item_description = item['description'];
        this.id = item['id'];

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

    setOwnerID(owner) {
        this.owner_id = owner;
        return this;
    }

    getOwnerID() {
        return this.owner_id;
    }

    setDescription(desc) {
        this.item_description = desc;
        return this;
    }

    getDescription() {
        return this.item_description;
    }

    createItemBlock() {
        return (
            <View>
                <Text>Item Name: {this.item_name}</Text>
                <Text>Item Description: {this.item_description}</Text>
                <Text>Estimated value: {this.item_value}</Text>
            </View>
        );
    }

    logItem() {
        console.group(`item ${this.id}`);
        console.log(`item Name: ${this.item_name}`);
        console.log(`Item estimated value: ${this.item_value}`);
        console.log(`item Owner:`)
        console.log(`owner id: ${this.owner_id}`);
        console.log(`Item description: ${this.item_description}`);
        console.groupEnd();
    }


}