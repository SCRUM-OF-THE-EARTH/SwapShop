import { Communicator } from '../classes/Communicator.js';
import APIcommands from '../helpers/APIcommands.js';

const communicator = new Communicator();

describe("testing the communicator system", () => {
    test("testing that the communicator can retrieve a call json item by its name", () => {
        APIcommands.forEach(call=> {
            expect(communicator.getCallByCommand(call.command)).toBe(call);  
        });
    });

    test("testing the commuicators ability to handle an incorrect command name", () => {
        expect(communicator.getCallByCommand("randomTestCommand")).toBe(false);
    })
})