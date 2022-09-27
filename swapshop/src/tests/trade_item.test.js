import React from "react";
import { Trade_Item } from "../classes/Trade_Item";
import { User_Account } from "../classes/User_Account";
import 'react-native';
import renderer from "react-test-renderer";
import { test_Reguser } from './user_account.test.js';

function generateString(length){
    let results = Math.random().toString(36).substring(2,length);
    if (results.includes(' ')) {
        results = generateString(7);
    }

    return results;
}

const test_item_obj = {
    item_name: "test_item",
    item_value: Math.random(),
    owner: test_Reguser,
    description: "description of the test Item",
    id: 1,
    exchange_item: "test exchange"
}

export let test_item;

describe("testing the trade item class", () => {

    test("testing contruction of new trade item", () => {
        test_item = new Trade_Item(test_item_obj);
        test_item.setOwner(test_Reguser);
        let date = new Date();
        expect(test_item.setDateCreated(date)).toBe(test_item);
        expect(test_item.getName()).toBe(test_item_obj["item_name"]);
        expect(test_item.getValue()).toBe(test_item_obj["item_value"]);
        expect(test_item.getDescription()).toBe(test_item_obj["description"]);
        expect(test_item.getID()).toBe(test_item_obj["id"]);
        expect(test_item.getOwner()).toBe(test_Reguser);
        expect(test_item.getExchangeItem()).toBe("test exchange");
        expect(test_item.getDateCreated()).toBe(date);
    });

    test("testing the comapring terms function relating to the search system", () => {

        let name = test_item.getName();
        expect(test_item.compareTerm("")).toBe(true)
        for (let i = 0; i < name.length; i++) {
            expect(test_item.compareTerm(name.charAt(i))).toBe(true);
        }

        let build = "";
        for (let i =0; i < name.length; i++) {
            build += name.charAt(i);
            expect(test_item.compareTerm(build)).toBe(true);
        }

        let wrong_string = generateString(name.length);
        expect(test_item.compareTerm(wrong_string)).toBe(false);
    })

    test("testing the setting ability of trade item class", () => {
        let Name
        for (let i = 0; i < Math.floor((Math.random()+1)*10); i++) {
            Name = generateString(7);
            expect(test_item.setName(Name)).toBe(test_item);
            expect(test_item.getName()).toBe(Name);
        }

        let value
        for (let i =0; i < Math.floor((Math.random()+1)*10); i++){
            value = Math.random();
            expect(test_item.setValue(value)).toBe(test_item);
            expect(test_item.getValue()).toBe(value);
        }

        let ID 
        for (let i =0; i < Math.floor((Math.random()+1)*10); i++) {
            ID = Math.floor(Math.random()*9999);
            expect(test_item.setID(ID)).toBe(test_item);
            expect(test_item.getID()).toBe(ID);
        }

        let Description;
        for (let i =0; i < Math.floor((Math.random()+1)*10); i++) {
            Description = generateString(Math.floor(Math.random()*50));
            expect(test_item.setDescription(Description)).toBe(test_item);
            expect(test_item.getDescription(Description)).toBe(Description)
        }

        let date;
        for (let i =0; i < Math.floor((Math.random()+1)*10); i++) {
            date = new Date();
            expect(test_item.setDateCreated(date)).toBe(test_item);
            expect(test_item.getDateCreated()).toBe(date);
        }

        let Exchange;
        for (let i =0; i < Math.floor((Math.random()+1)*10); i++) {
            Exchange = generateString(Math.floor(Math.random()*50));
            expect(test_item.setExchangeItem(Exchange)).toBe(test_item);
            expect(test_item.getExchangeItem()).toBe(Exchange);
        }

        let Test_Tag = {id: 0, name: 'tags_name', item: 88}
        let Test_Tag_2 = {id: 1, name: 'tag2_name', item: 85};
        expect(test_item.addTag(Test_Tag)).toBe(test_item);
        expect(test_item.getTags()).toStrictEqual([Test_Tag]);
        expect(test_item.addTag(Test_Tag_2)).toBe(test_item);
        expect(test_item.getTags()).toStrictEqual([Test_Tag, Test_Tag_2]);
        
    });

    test("testing the return of the item generator", () => {
        const tree = renderer.create(test_item.createItemBlock()).toJSON();
        expect(tree.children.length).toBe(2);
    })

})