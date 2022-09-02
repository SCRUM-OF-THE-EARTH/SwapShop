import { Login_user, Registering_User, User_Account } from "../classes/User_Account";
// import LoginScreen from "../screens/loginScreen";
require('jest-fetch-mock').enableMocks()
fetchMock.dontMock();

function generateString(length){
    return results = Math.random().toString(36).substring(2,length);
}

let fname = generateString(7);
let lname = generateString(7);
let username = generateString(7);
let password = generateString(7);
let email = generateString(7);

const test_Reguser = new Registering_User(fname+" "+lname, username, email);
const test_LogUser = new Login_user(username);

describe("testing the login, register and user account system", () => {
    test("as a registering user when I input my details they will be saved into the system", () => {
        expect(test_Reguser.getFirstName()).toBe(fname)
        expect(test_Reguser.getLastName()).toBe(lname);
        expect(test_Reguser.getUsername()).toBe(username);
        expect(test_Reguser.getEmail()).toBe(email);
    })

    test("as a registering user when I input my detals I can register a new account", () => {
        return test_Reguser.register_Account(password).then(data => {
            expect(data).toBe(true);
        });
    })

    test("as a registering user when I input an already existing username a new account will not be created", () => {
        return test_Reguser.register_Account(password).then(data => {
            expect(data).toBe(false);
        })
    })

    test("as a logining in user when I input my username and password my details will be saved", () => {
        expect(test_LogUser.getUsername()).toBe(username);   
    });

    test("as a loggining in user when I input my username and password I can fetch my detila from the database and log into the app", () => {
        
        return test_LogUser.Login(password).then((data) => {
            expect(data).toBe(true);
            expect(test_LogUser.getFirstName()).toBe(fname);
            expect(test_LogUser.getLastName()).toBe(lname);
            expect(test_LogUser.getEmail()).toBe(email);
        });
    });

    test("as a logging in user when I input incorrect password I will not be logged in", () => {
        
        let wrong_password = generateString();
        return test_LogUser.Login(wrong_password).then((data) => {
            expect(data).toBe(false);
        })

    });

    test("as a logging in user when I input an incorrect username I will not bew logged into ther system", () => {
        let wrong_username = generateString();
        test_LogUser.setUsername(wrong_username);

        return test_LogUser.Login(password).then(data => {
            expect(data).toBe(false);
        })
    })

    test("testing the user accounts class functions", ()=> {
        let user_account = new User_Account();
        expect(user_account.logUser()).toBe(user_account);

        expect(user_account.setID(1)).toBe(user_account);
        expect(user_account.getID()).toBe(1);

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

})