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
                console.log("finding item in json_array", item);
                results = item;
                return;
            }
        })

        return results;
    }

    makeRequestByCommand(commandName, param_values) {
        let call = this.getCallByCommand(commandName);

        console.log(call);

        let APIurl = this.url + call.file+"?";

        console.group("constructing API url")
        call.param_names.forEach((param, i) => {
            console.log(param, param_values)
            APIurl += param+"="+param_values[i];
            console.log()
            if (i != call.param_names.length-1){
                APIurl += "&&";
            }
        })

        console.log(APIurl);
        let results;

        fetch(APIurl)
        .then(data => data.json())
        .then(data => {
            if (call.return_type == "boolean"){
                if (data.success == 1) {
                    results = true;
                } else {
                    results = false;
                }
            }
        });

        return results;
    }
}