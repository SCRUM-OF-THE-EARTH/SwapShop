# SwapShop
This the repository for the software design group SCRUM OF THE EARTH for the swap shop app


# Classes and usage
## Communictator

The communicatr class is used to handle any API in the app.
it uses a file called `APICommands.js` in teh `helpers` directory 

`APICommands` is an array of json items that are used to create API urls
each json item conatians three values:
  -  command : the chosen name of a API command set by the developer
  - file : the name of API file the user want sthe command to call
  - param_names : an array of strings that represent the keys for the parameters passed to the API for  the `$_REQUEST['key']`
  
When we want to communicator to execute one of these commands:
The communicator has a method called `makeRequestByCommand` which takes in 2 parameters:
  - commandName - the name of the command we want to execute
  - param_values - an array of values for the respectve parameter_names in the commands jsonObject
  
 The communictor then checks whether the APi call was successful and returns:
  - the results of the API call in a json format if the call succeeded
  - false ig the API call failed
