import { Tag_list, Trade_item_list } from '../classes/Item_List.js';
import { Tag } from '../classes/Tag.js';
import { Trade_Item } from '../classes/Trade_Item.js';
import { Communicator } from '../classes/Communicator.js';
import { compareInterest } from '../classes/Item_List';
import { Login_user, User_Account } from '../classes/User_Account.js';
import { trade_items_list } from '../helpers/init.js';
require('jest-fetch-mock').enableMocks()
fetchMock.dontMock();

const communicator = new Communicator("https://sudocode.co.za/SwapShop/backend/");
const login_user = new Login_user(communicator);

const test_item_list = new Trade_item_list(false, communicator, login_user);
const test_tag_list = new Tag_list(communicator);
waitFetch();
let test_json_items;
let testItemId;

let testItems =[
    {
      item_name: "a test1",
      item_value: "200",
      item_description: "test item",
      id: '1',
      owner_id: '1',
      date_created: "2022-10-12",
      tags: [{name: "taga", date_created:"2022-10-12", id: 1, exchange: 0}]
    }, 
    {
        item_name: "b test2",
        item_value: "250",
        item_description: "test item",
        id: '2', 
        owner_id: '2',
        date_created: "2022-09-12",
        tags: [{name: "taga", date_created:"2022-10-12", id: 1, exchange: 0}, {name: "tagb", date_created:"2022-10-12", id: 2, exchange: 0}]
    }
];

let tempTags = [{name: "taga", date_created:"2022-10-12", id: 1, exchange: 0}, {name: "tagb", date_created:"2022-10-12", id: 2, exchange: 0}]

let interest = []
let interestId = [];
tempTags.forEach(t => {
    interest.push(new Tag(t))
    interestId.push(t['id']);
})

login_user.setInterests(interestId);

test_item_list.items = [];

async function waitFetch() {
    if(test_item_list.getItems() == false) {
        setTimeout(waitFetch, 200);
    } 

    test_item_list.json_items = json_items;
    test_item_list.loadItems((item) => {
        let Owner = new User_Account();
        Owner.setID(item["owner_id"]);

        let trade_Item = new Trade_Item(item);
        item["tags"].forEach((json_tag) => {
            let tempTag = new Tag(json_tag);
            if (tempTag.exchange == "1") {
                trade_Item.addExchangeTag(tempTag);
            } else {
                trade_Item.addTag(tempTag);
            }
               
        })

        trade_Item.setOwner(Owner);
        return trade_Item;
    })
    user.setUsername('admin');
    user.Login('admin');
    return;
}

describe("testing the item_list and its methods", () => {
    test("testing the creation of a new item list", () => {

        test_item_list.login_user = login_user;

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
            expect(count).toBe(10);
        });
    });

    test("Given I am a logged in user when I open the main screen then a list of trade items will be displayed that I will be able to scroll through.", () => {
        test_item_list.loadItems((item) => {
            let trade_Item = new Trade_Item(item);
            let Owner = new User_Account();
            Owner.setID(item['owner_id']);
            trade_Item.setOwner(Owner);
            return trade_Item;
        });


        test_item_list.getItems().forEach((comparator, i) => {
            let Test_loaded_item = new Trade_Item(test_json_items[i]);

            expect(comparator.getName()).toBe(Test_loaded_item.getName());
            expect(comparator.getID()).toBe(Test_loaded_item.getID());
            expect(comparator.getDescription()).toBe(Test_loaded_item.getDescription());
            expect(comparator.getValue()).toBe(Test_loaded_item.getValue());
        });
    })

    test("testing find by ID", () => {
        let items = test_item_list.getItems();

        items.forEach((item) => {
            let searchId = item.getID();
            let returnItem = test_item_list.findByID(searchId);
            expect(returnItem.getID()).toBe(searchId);
        })
    });

    test("Given I am a user and I am Logged in, when I enter the name, estimate value and description of an item I would like to trade then the details of my item will be saved and posted on the main page's list of trading items", () => {
        let name = "testItem";
        let desc = "test description"
        let value = '1.1';
        let id = '0';
        let exchange = 'exchange';
        let promises = [];

        let params = [name, desc, value, id, exchange];

        promises.push(test_item_list.addItem('add-trade-item', params).then(() =>{
            let test_new_item = test_item_list.getJsonItems();
            test_new_item = test_new_item[test_new_item.length-1];
            testItemId = test_new_item['id'];
            expect(test_new_item['item_name']).toBe(name);
            expect(test_new_item['item_value']).toBe(value);
            expect(test_new_item['description']).toBe(desc);
            // expect(test_new_item['exchange_item']).toBe(exchange);
        }));

        params = "invalid params";

        

        promises.push(test_item_list.addItem('add-trade-item', params).then((res) =>{
            expect(res).toBe(false);
        }));

        

        return Promise.all(promises);
    });

    test("Given I am using the app when I select the delete option in an item I posted then the item should be deleted from the Item list", () => {
        return test_item_list.deleteItem('delete-trade-item', testItemId).then(res => {
            expect(res).not.toBe(false);
            expect(test_item_list.findByID(testItemId)).toBe(false);
        })
    })

    test("Given I am a logged in user when I type a search term into the search bar then the app will display a of items filtered by similarities between the item name and the search term.", () => {
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
            a['tags'].forEach(t => {
                let tempTag = new Tag(t);
                tempTrade.addTag(tempTag);
            })
            test_item_list.items.push(tempTrade);
        })

        sort_list = test_item_list.getItems();
        expect(compareInterest(sort_list[1],sort_list[0], login_user)).toBe(-1);
        expect(compareInterest(sort_list[0],sort_list[1], login_user)).toBe(1);
        expect(compareInterest(sort_list[1],sort_list[1], login_user)).toBe(0);

        test_item_list.login_user = login_user;

        sort_list = test_item_list.getItems();

        expect(test_item_list.index).toBe(null);

        let sorted = true;

        let previosCount =Infinity;

        sort_list.forEach((item) => {
            let count = 0;
            item.getTags().forEach((tag) => {
                login_user.getInterests().forEach(i => {
                    if (tag.getID() == i) {
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

        expect(sorted).toBe(false);

        test_item_list.filteredResults = test_item_list.getItems();
        sort_list = test_item_list.Sort(null);
        expect(test_item_list.index).toBe(null);

        sorted = true;

        previosCount =Infinity;

        sort_list.forEach((item) => {
            let count = 0;
            item.getTags().forEach((tag) => {
                login_user.getInterests().forEach(i => {
                    if (tag.getID() == i) {
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

        test_item_list.filterByTags([]);

        expect(test_item_list.filteredResults.length).toBe(2);

        test_item_list.filterByTags([interest[0]]);
        expect(test_item_list.filteredResults.length).toBe(2);

        test_item_list.filterByTags([interest[1]]);
        expect(test_item_list.filteredResults.length).toBe(1);

        test_item_list.filterByTags(interest);
        expect(test_item_list.filteredResults.length).toBe(1);
    });

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
            // expect(droptags[iter]['value']['exchange']).toBe(tempTags[iter]['exchange']);
            expect(droptags[iter]['value']['id']).toBe(tempTags[iter]['id']);
        }
    });

    it("Given that I am using the app, when I post an item to trade then I should be able to see a backlog of all the items I had posted.", () => {
        let items = test_item_list.getItems();
        items.forEach(item => {
            let Owner = new User_Account();
            Owner.setID(Math.floor(Math.random()*2))
            item.setOwner(Owner);
        })
        items.forEach((item) => {
            test_item_list.filteredResults = items;
            let ownerId = item.getOwner().getID();
            let filtered = trade_items_list.filterByOwnerId(ownerId);
            filtered.forEach((f) => {
                expect(f.getOwner().getID()).toBe(ownerId);
            })
        })
    })

    


})