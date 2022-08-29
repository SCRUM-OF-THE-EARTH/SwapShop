import { Login_user, Registering_User } from "../classes/User_Account";
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

describe("testing the register account system for user aaccount", () => {
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
    })

})