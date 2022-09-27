import { Tag } from "../classes/Tag";

let Test_josn_item = {
    'name': 'test_name',
    'date_created': new Date(),
    'id': Math.floor(Math.random() * 1000)
}

let test_Tag;

function generateString(length){
    let results = Math.random().toString(36).substring(2,length);
    if (results.includes(' ')) {
        results = generateString(7);
    }

    return results;
}

describe("testing the Tag class and its methods", () => {

    test("testing the creation of a new tag", () => {
        test_Tag = new Tag(Test_josn_item);
        expect(test_Tag.getName()).toBe(Test_josn_item['name']);
        expect(test_Tag.date_created).toBe(Test_josn_item['date_created']);
        expect(test_Tag.getID()).toBe(Test_josn_item['id']);
    });

    test("testing the compare term function with valid term", () => {
        let term = test_Tag.getName();

        for (let i =0; i < term.length; i++) {
            expect(test_Tag.compareTerm(term.substring(0, i))).toBe(true);
        }
    });

    test("testing the compare term function with valid term", () => {
        let term = generateString(1000);

        expect(test_Tag.compareTerm(term)).toBe(false);
    })

});
