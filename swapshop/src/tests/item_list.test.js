import { Item_List, Trade_item_list } from '../classes/Item_List.js';
import { Trade_Item } from '../classes/Trade_Item.js'
require('jest-fetch-mock').enableMocks()
fetchMock.dontMock();

const test_item_list = new Trade_item_list('fetch-trade-items');
waitFetch();
let test_json_items;
let testItemId;

function waitFetch() {
    if(test_item_list.getItems() == false) {
        setTimeout(waitFetch, 200);
    } 
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

        expect(test_item_list.loaded).toBe(true);
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
            expect(test_new_item['exchange_item']).toBe(exchange);
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
    });
})