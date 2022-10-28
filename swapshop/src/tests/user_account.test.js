import { Login_user, Registering_User, User_Account } from "../classes/User_Account";
import { communicator } from "../helpers/init"

require('jest-fetch-mock').enableMocks()
fetchMock.dontMock();

function generateString(length){
    let results = Math.random().toString(36).substring(2,length);
    if (results.includes(' ')) {
        results = generateString(7);
    }

    return results;
}

let fname = generateString(7);
let lname = generateString(7);
let username = generateString(7);
let password = generateString(7);
let email = generateString(7);

export const test_Reguser = new Registering_User(fname+" "+lname, username, email, communicator);
let test_LogUser;

describe("testing the login, register and user account system", () => {

    test("Given I am an unregistered user, when I enter my full name, a valid username, a valid password and my email address then the app will save my details and create a new account for me.", () => {
        expect(test_Reguser.getFirstName()).toBe(fname)
        expect(test_Reguser.getLastName()).toBe(lname);
        expect(test_Reguser.getUsername()).toBe(username);
        expect(test_Reguser.getEmail()).toBe(email);

        return test_Reguser.register_Account(password).then(data => {
            expect(data).toBe(true);
        });
    })

    test("Given I am an unregistered user, when I enter my full name and email and an invalid username or invalid password then the system will not create a new account for me.", () => {

        let New_test_Reguser;

        New_test_Reguser = new Registering_User("", username, email, communicator);
        expect(New_test_Reguser.getError()).toBe("please enter a first and last name");

        New_test_Reguser = new Registering_User(fname+" "+lname, "", email, communicator);
        expect(New_test_Reguser.getError()).toBe("Username can not be empty");

        New_test_Reguser = new Registering_User(fname+" "+lname, username, email, communicator);

        responses = [];
        responses.push(New_test_Reguser.register_Account("").then(reg_user => {
            expect(reg_user.getError()).toBe("password can not be empty");
        }));

        responses.push(New_test_Reguser.register_Account(password).then(data => {
            expect(data.getError()).toBe("sorry. Something went wrong");
        }));

        return Promise.all(responses);
    });

    test("Given I am a registered user when I enter my username and password then the app will retrieve my details, save them in the app and take me to the main screen.", () => {
        
        test_LogUser = new Login_user(communicator);
        test_LogUser.setUsername(username)
        expect(test_LogUser.getUsername()).toBe(username);

        return test_LogUser.Login(password).then((data) => {
            expect(data).toBe(true);
            expect(test_LogUser.getFirstName()).toBe(fname);
            expect(test_LogUser.getLastName()).toBe(lname);
            expect(test_LogUser.getEmail()).toBe(email);
        });
    });

    test("Given I am a registered user when I enter an invalid username or password then the app will not retrieve my details, will not log me into the main screen and will display an error.", () => {
        
        let wrong_password = generateString(10);
        let Promises = [];

        Promises.push(test_LogUser.Login(wrong_password).then((data) => {
            expect(test_LogUser.getError()).toBe("sorry. Something went wrong");
            expect(data).toBe(false);
        }));
        return Promise.all(Promises);
    });

    test("testing the user accounts class functions", ()=> {
        let user_account = new User_Account();

        expect(user_account.setID(1)).toBe(user_account);
        expect(user_account.getID()).toBe(1);

        expect(user_account.setPhoto("test_Photo_Uri.jpg")).toBe(user_account);
        expect(user_account.getPhoto()).toBe("test_Photo_Uri.jpg");

        user_account.setFullName("test");
        expect(user_account.error).toBe("a first and last name, seperated by a space, is required");
        
        user_account.error = false;

        user_account.setFullName("test test test");
        expect(user_account.error).toBe("a first and last name, seperated by a space, is required")


        expect(user_account.setFisrtName("test")).toBe(user_account);
        expect(user_account.getFirstName()).toBe("test");

        expect(user_account.setLastName("test")).toBe(user_account);
        expect(user_account.getLastName()).toBe("test");

        expect(user_account.getFullName()).toBe("test test");

        expect(user_account.setUsername("test")).toBe(user_account);
        expect(user_account.getUsername()).toBe("test");

        expect(user_account.setEmail("test")).toBe(user_account);
        expect(user_account.getEmail()).toBe("test");
    });

    test("testing the user accounts ability to delete an account", () => {
        return test_LogUser.deleteAccount().then((res) => {
            expect(res).toBe(0);
        })
    });

    test("Given that I am using the app, when I click on the profile edit button then I should be allowed to select a new photo which should be uploaded to my profile.", () => {
        for (let i =0; i < 30; i++) {
            let testUrl = generateString(2*i);
            test_LogUser.setPhoto(testUrl);
            expect(test_LogUser.getPhoto()).toBe(testUrl);
        }
    })

})