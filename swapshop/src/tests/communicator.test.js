import { communicator } from '../classes/Communicator.js';
import APIcommands from '../helpers/APIcommands.js';

describe("testing the communicator system", () => {

    test("testing the creation of a new communiator", () => {
        expect(communicator.url).toBe("https://sudocode.co.za/SwapShop/backend/");
        expect(communicator.calls).toBe(APIcommands);
    });

    test("testing the communicators ability to constructor URLs", () => {
        let testCommand = {
            command:   "test",
            file: "testFile.php",
            param_names: ["param_1", "param_2"] 
        };
        let param_Values = ["test", "test"];

        expect(communicator.constructURL(testCommand, param_Values)).toBe("https://sudocode.co.za/SwapShop/backend/testFile.php?param_1=test&&param_2=test")

    })

    test("testing that the communicator can retrieve a call json item by its name", () => {
        APIcommands.forEach(call=> {
            expect(communicator.getCallByCommand(call.command)).toBe(call);  
        });
    });

    test("testing the commuicators ability to handle an incorrect command name", () => {
        expect(communicator.getCallByCommand("randomTestCommand")).toBe(false);
    });

    test("testing the communicators handling on an unsuccesful request", () => {
        let params = ["oiawersyt9bds0gu", "ahofuipwergauishfjbnilweru&vhblfek"]
        return communicator.makeRequestByCommand("login_account", params).then(data => {
            expect(data).toBe(false);
        });
    })
})