function FormDataMock() {
    this.append = jest.fn();
}
  
global.FormData = FormDataMock

import { Trade_Item } from "../classes/Trade_Item";
import 'react-native';
import { test_Reguser } from './user_account.test.js';
import { Tag } from "../classes/Tag.js";
import { communicator } from '../helpers/init';

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
    id: "1",
    exchange_item: "test exchange"
}

const test_tag_json = {
    id:"1",
    name:"Test",
    date_created:"2022-10-12",
    exchange:"1"
}

export let test_item;

describe("testing the trade item class", () => {

    test("Given I am a user and I am Logged in, when I enter the name, estimate value and description of an item I would like to trade then the details of my item will be saved and posted on the main page's list of trading items", () => {

        let Promises = [];

        for (let i = 0; i < 10; i++) {
            let testName = generateString(10);
            let test_item_value = Math.random();
            let testDescription = generateString(100);

            Promises.push(communicator.makeRequestByCommand("add-trade-item", [`${testName}`,`${test_item_value}`, `${testDescription}`, `${test_Reguser.getID()}`]));

            test_item_obj['item_name'] = testName;
            test_item_obj['item_value'] = test_item_value;
            test_item_obj['description'] = testDescription;


            test_item = new Trade_Item(test_item_obj);
            test_item.setOwner(test_Reguser);
            let date = new Date();
            expect(test_item.setDateCreated(date)).toBe(test_item);
            expect(test_item.getName()).toBe(test_item_obj["item_name"]);
            expect(test_item.getValue()).toBe(test_item_obj["item_value"]);
            expect(test_item.getDescription()).toBe(test_item_obj["description"]);
            expect(test_item.getID()).toBe(test_item_obj["id"]);
            expect(test_item.getOwner()).toBe(test_Reguser);
            expect(test_item.getDateCreated()).toBe(date);
        }
        
        return Promise.all(Promises).then(posted => {
            posted.forEach(item => {
                expect(item).not.toBe(0);
            })
        })
    });

    test("Given that I am using the app, when I make a post about the product I want to trade with an image(s), then the post and its photo should appear on the posts/main feed.", () => {
        let images = [{
            uri: "/test1.jpg",
            base64: "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAOTXL0Y4OHwAAAABJRU5ErkJggg=="
        }];
    
        item_id = 1;

        return communicator.makePostRequestForImage(images, item_id, "trade");
    })

    // test("testing the ability to fetch an image from the server", () => {
    //     return test_item.fetchImages().then(() => {
    //         expect(test_item.hasImages).toBe(true);
    //         expect(test_item.images.length).toBe(1);
    //         expect(test_item.images[0]).toBe('https://sudocode.co.za/SwapShop/assets/images/filler_image.jpg');
    //     })
    // });

    test("Given that I am using the app, when I am redirected to the main page, then I should be able to see product posts attached with an image of how the product looks like.", () => {
        let slildeshow = test_item.getImageSlideShow();
        expect(slildeshow.length).toBe(1);
        expect(slildeshow[0].url).toBe('https://sudocode.co.za/SwapShop/assets/images/filler_image.jpg');
    })
    
    test("Given that I am using the app, when I make a post then I should be able state the item I want to be exchanged as a tag and I should  also see that option on the feed.", () => {
        let TestTag = new Tag(test_tag_json);

        test_item.addExchangeTag(TestTag);
        let tags = test_item.getExchange();
        expect(tags.length).toBe(1);
        expect(tags[0].getID()).toBe("1");
        expect(tags[0].getName()).toBe("Test");
        
        let dropItem = tags[0].getTagValue();

        expect(dropItem.label).toBe("Test");
        expect(dropItem.value).toBe(tags[0]);

        expect(tags[0].date_created).toBe("2022-10-12");
        expect(tags[0].id).toBe("1");

    })

    test("Given that I am using the app, when I post a trade item, then it should be linked to a tag that can help identify that item and similar or related items when I search for it with that tag.", () => {
        let TestTag = new Tag(test_tag_json);
        let Test_Tag = {id: 0, name: 'tags_name', item: 88}
        
        test_item.addTag(TestTag);
        let tags = test_item.getTags();
        expect(tags.length).toBe(1);
        expect(tags[0].getID()).toBe("1");
        expect(tags[0].getName()).toBe("Test");
        
        let dropItem = tags[0].getTagValue();

        expect(dropItem.label).toBe("Test");
        expect(dropItem.value).toBe(tags[0]);

        expect(tags[0].date_created).toBe("2022-10-12");
        expect(tags[0].id).toBe("1"); 
    })

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

    test("Given that I am using the app, when I want to make a new post, then I should be given the option to make further detailed description about the product I want to trade, as well as a way for me to be contacted.", () => {
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

        // let Exchange;
        // for (let i =0; i < Math.floor((Math.random()+1)*10); i++) {
        //     Exchange = generateString(Math.floor(Math.random()*50));
        //     expect(test_item.setExchangeItem(Exchange)).toBe(test_item);
        //     expect(test_item.getExchangeItem()).toBe(Exchange);
        // }
    });

    test("Given that I am a using the app, when I have managed to successfully trade an item then I should be able to close the item so that I do not receive further queries about it. ", () => {
        test_item.updateSoldStatus(communicator, "0").then(() => {
            expect(test_item.sold).toBe(0);
            test_item.updateSoldStatus(communicator, "1").then(() => {
                expect(test_item.sold).toBe(1);
            })
        test
        })
        
    });
})