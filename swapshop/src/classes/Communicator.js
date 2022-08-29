import APIcommands from "../helpers/APIcommands.js";

export class Communicator {
    constructor() {
        this.url = "https://sudocode.co.za/SwapShop/backend/";
        this.APIfile = "";
        this.params = [];
        this.calls = APIcommands;

    }

    addCalls(commandName, filename, param_names) {
        let call = {
            command: commandName,
            file: filename,
            param_name: param_names
        }

        this.calls.push(call);
    }

    getCallByCommand(command) {
        let results;

        this.calls.forEach(item => {
            if (item.command == command){
                results = item;
                return;
            }
        })

        return results;
    }

    constructURL(commandName, param_values) {

        let call = this.getCallByCommand(commandName);

        let APIurl = this.url + call.file+"?";

        call.param_names.forEach((param, i) => {
            APIurl += param+"="+param_values[i];
            if (i != call.param_names.length-1){
                APIurl += "&&";
            }
        })

        return APIurl;
    }

    async makeRequestByCommand(commandName, param_values) {
        let APIurl = this.constructURL(commandName, param_values);        

        let response = await fetch(APIurl);
        let json = await response.json();
        return json;

    }
}