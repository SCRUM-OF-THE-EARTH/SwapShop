// the User_Account class is used to store and manage and account of a user based on the details from 
// the database
// it has 5 parameters
//  | fname - the first name of the user (string)
//  | lname - the last name of the user (string)
//  | username - the chosen username of the user (string)
//  | email - the email address of the user (string)
//  | id - the id of the user account (integer)
export class User_Account {
    constructor(communicator) {
        this.fname ="";
        this.lname = "";
        this.username = "";
        this.email = "";
        this.tags = [];
        this.id =0;
        this.photo_url = "";
        this.communicator = communicator;
        this.error = false;
    }

    // setID is used to set the value of the id
    // takes in an integer
    // returns this
    setID(id) {
        this.id = id;
        return this;
    }

    // getID is used to get the value of the ID 
    getID() {
        return this.id;
    }

    // setFirstName is used to set the value of the first name
    // it takes in a string
    // and returns this
    setFisrtName(fname){
        this.fname = fname;
        return this;
    }

    // setLastName is used to set the value of the last name
    // it takes in a string
    // and returns this
    setLastName(lname) {
        this.lname = lname;
        return this;
    }

    // setFullName is used to split the full name taken in and set the first and last name
    // takes in a string (that must contain a space)
    // and returns this
    setFullName(fullName) {

        if (fullName === "") {
            return this.setError("please enter a first and last name");
        }

        let names = fullName.split(" ");
        if (names.length != 2 || (names[0] == "" || names[1] == "")){
            return this.setError("a first and last name, seperated by a space, is required");
        }

        this.fname = names[0];
        this.lname = names[1];

        return this;
    }

    // getFirstName is used to get the value of the first name
    getFirstName() {
        return this.fname;
    }

    // getLastName is used to get the value of the last name
    getLastName() {
        return this.lname;
    }

    // getFullName is used to combine the first and last name and return it
    getFullName() {
        return this.fname + " "+ this.lname;
    }

    // setUsername is used to set the value of the username
    // it takes in a string 
    // and returns this
    setUsername(user) {

        if (user == "") {
            return this.setError("Username can not be empty");
        }

        if (user.includes(' ')){
            return this.setError("1 username can not contain spaces");
        }
        this.username = user;
        return this;
    }

    // getUsername is used to get the value of the username
    getUsername() {
        return this.username;
    }

    // setEmail is used to set the value of the email
    // it takes in a string
    setEmail(Email) {
        this.email =Email;
        return this;
    }

    // getEmail is used to get the value of the email
    getEmail() {
        return this.email;
    }

    //setInterests is used to set the list of user interests to "tags"
    setInterests(tags) {
        this.tags = tags
        return this; 
    }

    // getInterests is used to get the list of exchange tags
    getInterests() {
        return this.tags;
    }
    
    // setPhoto is used to set the user profile photo
    setPhoto(photo) {
        this.photo_url = photo;
        return this;
    }

    // getPhoto is used to get the user profile photo
    getPhoto() {
        return this.photo_url;
    }

    // is used to set the error message of the class
    setError(error) {
        this.error = error;
        return this;
    }

    // getError is used to get teh error
    getError() {
        return this.error;
    }
}

// the Login_user is a sub class of User_Account that is used to validate a user's input in order to try and
// log them into an existing account
export class Login_user extends User_Account {
    constructor(communicator) {
        super(communicator);
    }

    // Login is used to make a request to the server to check the user's details
    // it takes in a string for the password
    // and returns true if the user accoutn exists 
    // and false if the user accoutn does not exist
    async Login(password) {
        let response = false;

        response = await this.communicator.makeRequestByCommand("login_account", [this.username, password]);
        
        if (!response) {
            this.setError("sorry. Something went wrong");
            return false;
        }
        
        this.setID(response["id"])
        .setUsername(response["username"])
        .setFisrtName(response["fname"])
        .setLastName(response["lname"])
        .setEmail(response["email"])
        .setInterests(response["tags"])
        .setPhoto(response["photo"]);

        return true;
    }


    // deleteAccount is used to delete an account from the database
    async deleteAccount() {
        params = [this.getID()];
        return await this.communicator.makeRequestByCommand("delete-account", params);
    }
        
}

// the Register User is a sub class of User_account responsible for creating and 
// posting new user accounts
export class Registering_User extends Login_user {
    constructor(fullName, username, email, communicator) {

        super(communicator);
        this.setFullName(fullName)
        .setUsername(username)
        .setEmail(email);
    }

    // register_Account is used to post the system while also validtaing the users details
    // it takes in a string for a password
    // and returns true id the accoutn was created successfully
    // and false if an error occurred
    async register_Account(password) {

        if (password == "") {
            return this.setError("password can not be empty");
        }
        let response = await this.communicator.makeRequestByCommand("register_account", [this.getFirstName(), this.getLastName(), this.getUsername(), password, this.getEmail()]);
    
        if (!response) {
            return this.setError("sorry. Something went wrong");
        }
        this.setID(response["id"]);
        return true;       
    }

};