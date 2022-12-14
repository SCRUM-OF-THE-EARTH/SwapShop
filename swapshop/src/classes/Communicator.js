import APIcommands from "../helpers/APIcommands.js";

// the Communicator class is used to handle and requests that happen between the app and the api layer and the database layer
// it has 2 basic parameters:
//  | url - the base url to the api layer
//  | calls - the commands conatining the api file names. parameters names and command names. This is found in '../helpers/APIcommands.js' file

export class Communicator {

    // the constructor class takes in the url that would direct the communicator to the API files
    constructor(url) {
        this.url = url;
        this.postUrl = "https://sudocode.co.za/SwapShop/assets/images/recievePhoto.php"
        this.calls = APIcommands;
    }

    // getCallCommand is used to search through the list of API commands and find the command object with the correct command name
    // it takes in a command name 
    // and return the json object if it finds a matching entry
    // but returns false if it can not find the correct command
    getCallByCommand(command) {
        let results = false;

        this.calls.forEach(item => {
            if (item.command == command){
                results = item;
                return;
            }
        });

        return results;
    }

    // constructURL is used to to build the full url that would direct the system to the correct api with the associated parameter names and values 
    // in place
    //
    // it takes in a call which id found using getCallByCommand and an array of parameter values in the correct order
    // it returns the fully constructed URL to the command made by the user

    constructURL(call, param_values) {
        let APIurl = this.url + call.file+"?";

        call.param_names.forEach((param, i) => {
            param_values[i] = param_values[i].replace('/\n/g', '%0A');
            param_values[i] = param_values[i].replace('/ /g', '%20');
            param_values[i] = param_values[i].replace("/'/g", "\'");
            APIurl += param+"="+param_values[i];
            if (i != call.param_names.length-1){
                APIurl += "&&";
            }
        })
        return APIurl;
    }

    // makeRequestByCommand takes in a command name as a string and an array of parameter values in the correct order (check APICommands for order of parameters)
    // and it makes a call to the api layer using the constructed URL and the call that is found by the command name
    //
    // it is asynchronous since js fetch requests are themselves asynchronous
    // this mehtod will retrieve data from an api and then check the "success" parameter of the json object
    // if ut was a success then it will return the results from the api command
    // if not then it will return false
    async makeRequestByCommand(commandName, param_values) {
        let call = this.getCallByCommand(commandName);

        let APIurl = this.constructURL(call, param_values);

        let response = await fetch(APIurl).catch(e=>console.error(e))
        let json = await response.json();

        if (json['success'] == 1) {
            return json["results"];   
        }

        return false;
    }



    // makePostRequestForImage takes in a list of image objects , an item id and a type (either "trade" or "profile") and makes a POST fetch request to the server to save an image to an associated
    // item object
    async makePostRequestForImage(images, item_id, type) {
        let promises = [];
            images.forEach(image => {
                let body = new FormData();
                let fileName =  image.uri.substring(image.uri.lastIndexOf("/")+1);
                body.append('image_content', image.base64);
                body.append('image_file', fileName);
                body.append('item_id', item_id);
                body.append('item_type', type);

                promises.push(
                fetch(this.postUrl, {
                    method: 'POST',
                    headers: {  
                        "content-type": "multipart/form-data",
                    },
                    body: body
                }).then(res => {
                    return res.status;
                }));
            
        })
        return Promise.all(promises);
    }
}

