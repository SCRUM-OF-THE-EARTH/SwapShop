import { Item_List, Tag_list, Trade_item_list } from '../classes/Item_List.js';
import { Tag } from '../classes/Tag.js';
import { Trade_Item } from '../classes/Trade_Item.js'
import { Login_user } from '../classes/User_Account.js';
import { login_user } from '../screens/SignInScreen';
require('jest-fetch-mock').enableMocks()
fetchMock.dontMock();

const test_item_list = new Trade_item_list();
const test_tag_list = new Tag_list();
waitFetch();
let test_json_items;
let testItemId;

let testItems =[
    {
      item_name: "a test1",
      item_value: "200",
      item_description: "test item",
      id: '1', 
      date_created: "2022-10-12",
      tags: [{name: "taga", date_created:"2022-10-12", id: 1, exchange: 0}]
    }, 
    {
        item_name: "b test2",
        item_value: "250",
        item_description: "test item",
        id: '2', 
        date_created: "2022-09-12",
        tags: [{name: "taga", date_created:"2022-10-12", id: 1, exchange: 0}, {name: "tagb", date_created:"2022-10-12", id: 2, exchange: 0}]
    }
];

let tempTags = [{name: "taga", date_created:"2022-10-12", id: 1, exchange: 0}, {name: "tagb", date_created:"2022-10-12", id: 2, exchange: 0}]

let interest = []
tempTags.forEach(t => {
    interest.push(new Tag(t))
})

login_user.setInterests(interest);

test_item_list.items = [];

async function waitFetch() {
    if(test_item_list.getItems() == false) {
        setTimeout(waitFetch, 200);
    } 

    test_item_list.json_items = json_items;
    test_item_list.loadItems((item) => {
        let Owner = item["owner_id"];

        let trade_Item = new Trade_Item(item);
        item["tags"].forEach((json_tag) => {
            let tempTag = new Tag(json_tag);
            if (tempTag.exchange == "1") {
                trade_Item.addExchangeTag(tempTag);
            } else {
                trade_Item.addTag(tempTag);
            }
               
        })

        if (Owner != false) {
            trade_Item.setOwner(Owner);
        }
        return trade_Item;
    })
    user.setUsername('admin');
    user.Login('admin');
    return;
}

describe("testing the item_list and its methods", () => {
    test("testing the creation of a new item list", () => {
        return test_item_list.fetchItems('fetch-trade-items').then(() => {
            test_json_items = test_item_list.getJsonItems();
            let loaded = false;
            if (test_json_items != false) {
                loaded = true;
            }
            expect(loaded).toBe(true);

            let count = 0;
            for (let key in test_json_items[0]){
                count++;
            }
            expect(count).toBe(8);
        });
    });

    test("testing the item lists load items method", () => {
        test_item_list.loadItems((item) => {
            let trade_Item = new Trade_Item(item);
            return trade_Item;
        });

        let Test_loaded_item = new Trade_Item(test_json_items[0]);
        
        let comparator = test_item_list.getItems()[0]
        console.log("comparator: ", comparator)

        expect(comparator.getName()).toBe(Test_loaded_item.getName());
        expect(comparator.getID()).toBe(Test_loaded_item.getID());
        expect(comparator.getDescription()).toBe(Test_loaded_item.getDescription());
        expect(comparator.getValue()).toBe(Test_loaded_item.getValue());
    })

    test("testing find by ID", () => {
        let items = test_item_list.getItems();

        items.forEach((item) => {
            let searchId = item.getID();
            let returnItem = test_item_list.findByID(searchId);
            expect(returnItem.getID()).toBe(searchId);
        })
    });

    test("testing adding an item", () => {
        let name = "testItem";
        let desc = "test description"
        let value = '1.1';
        let id = '0';
        let exchange = 'exchange';

        let params = [name, desc, value, id, exchange];
        return test_item_list.addItem('add-trade-item', params).then(() =>{
            let test_new_item = test_item_list.getJsonItems();
            test_new_item = test_new_item[test_new_item.length-1];
            testItemId = test_new_item['id'];
            expect(test_new_item['item_name']).toBe(name);
            expect(test_new_item['item_value']).toBe(value);
            expect(test_new_item['description']).toBe(desc);
            // expect(test_new_item['exchange_item']).toBe(exchange);
        })
    });

    test("testing adding an invalid item item", () => {
        params = "invalid params";

        return test_item_list.addItem('add-trade-item', params).then((res) =>{
            expect(res).toBe(false);
        })
    });

    test("testing deleting an item", () => {
        console.log("the test ID is",testItemId);
        return test_item_list.deleteItem('delete-trade-item', testItemId).then(res => {
            expect(res).toBe(true);
            expect(test_item_list.findByID(testItemId)).toBe(false);
        })
    })

    test("testing search", () => {
        let items = test_item_list.getItems();

        test_item_list.searchItems("");
        expect(test_item_list.filteredResults.length).toBe(items.length);
        items.forEach((item) => {
            let searchterm = item.getName();
             
            test_item_list.searchItems(searchterm);
            let searchres = test_item_list.filteredResults;

            searchres.forEach((item) => {
                expect(item.getName().toLowerCase().includes(searchterm.toLowerCase())).toBe(true);
            })
        })

        test_item_list.searchItems("")
    });

    test("Given that I am using the app, when I am on the posts page and I am searching for an item, then I should be able to sort the items according to price or name and also make use of tags in order to group the items according to its type", () => {
        let index = 0;
        let sort_list;

        test_item_list.items = [];
        testItems.forEach(a => {
            let tempTrade = new Trade_Item(a);
            a.tags.forEach(t => {
                let tempTag = new Tag(t);
                tempTrade.addTag(tempTag);
            })
            test_item_list.items.push(tempTrade);
        })
        sort_list = test_item_list.getItems();
        console.log("sort testing list:", sort_list)
        expect(test_item_list.index).toBe(null);

        let sorted = true;

        let previosCount =Infinity;

        sort_list.forEach((item) => {
            let count = 0;
            item.getTags().forEach((tag) => {
                login_user.getInterests().forEach(i => {
                    if (tag.getID() == i.getID()) {
                        count++;
                    }
                })
            });

            console.log(count);
            console.log(previosCount);
            if (count > previosCount) {
                sorted = false;
                return;
            } else {
                previosCount = count;
            }
        });

        expect(sorted).toBe(false);

        sort_list = test_item_list.Sort();
        expect(test_item_list.index).toBe(null);

        sorted = true;

        previosCount =Infinity;

        sort_list.forEach((item) => {
            let count = 0;
            item.getTags().forEach((tag) => {
                login_user.getInterests().forEach(i => {
                    if (tag.getID() == i.getID()) {
                        count++;
                    }
                })
            });

            if (count > previosCount) {
                sorted = false;
                return;
            } else {
                previosCount = count;
            }
        });

        sort_list = test_item_list.Sort(0);
        expect(test_item_list.index).toBe(0);

        let previous;
        sorted = true;
        sort_list.forEach((item, i) => {
            if (i != 0) {
                if (Date(previous.getDateCreated()) > Date(item.getDateCreated())) {
                    sorted = false;
                } 
            }
            previous = item;
        });

        sort_list = test_item_list.Sort(1);
        expect(test_item_list.index).toBe(1);

        sorted = true;
        sort_list.forEach((item, i) => {
            if (i != 0) {
                if (parseFloat(previous.item_value) < parseFloat(item.item_value)) {
                    sorted = false;
                } 
            }
            previous = item;
        });

        expect(sorted).toBe(true);

        sort_list = test_item_list.Sort(2);
        expect(test_item_list.index).toBe(2);

        sorted = true;
        sort_list.forEach((item, i) => {
            if (i != 0) {
                if (parseFloat(previous.item_value) > parseFloat(item.item_value)) {
                    sorted = false;
                } 
            }
            previous = item;
        });

        expect(sorted).toBe(true);

        sort_list = test_item_list.Sort(3);
        expect(test_item_list.index).toBe(3);

        sorted = true;
        sort_list.forEach((item, i) => {
            if (i != 0) {
                if (parseFloat(previous.item_name) < parseFloat(item.item_name)) {
                    sorted = false;
                } 
            }
            previous = item;
        });

        expect(sorted).toBe(true);

        sort_list = test_item_list.Sort(4);
        expect(test_item_list.index).toBe(4);

        sorted = true;
        sort_list.forEach((item, i) => {
            if (i != 0) {
                if (parseFloat(previous.item_name) > parseFloat(item.item_name)) {
                    sorted = false;
                } 
            }
            previous = item;
        });

        expect(sorted).toBe(true);
    });

    test("testing filter by tag", () => {
        test_item_list.filterByTags([]);
        // test_item_list.filteredResults = test_item_list.getItems()

        expect(test_item_list.filteredResults.length).toBe(2);

        test_item_list.filterByTags([interest[0]]);
        expect(test_item_list.filteredResults.length).toBe(2);

        test_item_list.filterByTags([interest[1]]);
        expect(test_item_list.filteredResults.length).toBe(1);

        test_item_list.filterByTags(interest);
        expect(test_item_list.filteredResults.length).toBe(1);
    });

    test("testing the item lists ability to fetch images for trade items",() => {
        return test_item_list.fetchImages().then(() => {
            test_item_list.getItems().forEach((t) => {
                if (t.hasImages) {
                    t.id = `${t.id}`;
                    let slideshow = t.getImageSlideShow();
                    slideshow.forEach(slide => {
                        expect(slide.url == 'https://sudocode.co.za/SwapShop/assets/images/filler_image.jpg');
                    })
                }
            })
        })
    })

    test("testing the tag list's ability to add tags them to the list of tags and retrieve ", () => {
        test_tag_list.items = [];
        test_tag_list.json_items = [];

        tempTags.forEach(i => {
            test_tag_list.addTag(i);
        });

        let droptags = test_tag_list.getTags();

        let iter = 0;

        for (iter =0; iter < interest.length; iter++) {
            expect(droptags[iter]['label']).toBe(interest[iter].getName())
            expect(droptags[iter]['value']['date_created']).toBe(tempTags[iter]['date_created']);
            expect(droptags[iter]['value']['exchange']).toBe(tempTags[iter]['exchange']);
            expect(droptags[iter]['value']['id']).toBe(tempTags[iter]['id']);
        }
    })


})