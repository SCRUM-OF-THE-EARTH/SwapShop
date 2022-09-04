import { communicator } from "../classes/Communicator.js"


export class User_Account {
    constructor() {
        this.fname ="";
        this.lname = "";
        this.username = "";
        this.email = "";
        this.id =0;
    }

    logUser() {
        console.group("user");
        console.log("Name: "+this.fname+" "+this.lname);
        console.log("Username: "+this.username);
        console.log("Email: "+this.email);
        console.groupEnd();

        return this;
    }

    setID(id) {
        this.id = id;
        return this;
    }

    setFisrtName(fname){
        this.fname = fname;
        return this;
    }

    setLastName(lname) {
        this.lname = lname;
        return this;
    }

    setFullName(fullName) {
        let names = fullName.split(" ");
        if (names.length != 2 || (names[0] == "" || names[1] == "")){
            throw Error(`0 can not set the full name of a user with ${names.length}, method requires 2 names (first and last)`);
        }

        console.log(names[0], names[1])
        this.fname = names[0];
        this.lname = names[1];

        return this;
    }

    getFirstName() {
        return this.fname;
    }

    getLastName() {
        return this.lname;
    }

    getFullName() {
        return this.fname + " "+ this.lname;
    }

    setUsername(user) {
        console.log(user);
        if (user.includes(' ')){
            throw Error("1 username can not contain spaces");
        }
        this.username = user;
        return this;
    }

    getUsername() {
        return this.username;
    }

    setEmail(Email) {
        this.email =Email;
        return this;
    }

    getEmail() {
        return this.email;
    }

    getID() {
        return this.id;
    }
}

export class Login_user extends User_Account {
    constructor() {
        super();
    }

    async Login(password) {
        let response = await communicator.makeRequestByCommand("login_account", [this.username, password]);

        if (!response) {
            return false;
        }
                this.setID(response["id"])
                .setUsername(response["username"])
                .setFisrtName(response["fname"])
                .setLastName(response["lname"])
                .setEmail(response["email"]);

            

        return true;
    }
        
}

export class Registering_User extends User_Account {
    constructor(fullName, username, email) {
        super();
        this.setFullName(fullName)
        .setUsername(username)
        .setEmail(email);

    }

    async register_Account(password) {
        let response = await communicator.makeRequestByCommand("register_account", [this.getFirstName(), this.getLastName(), this.getUsername(), password, this.getEmail()]);
    
        if (!response) {
            return false;
        }
        this.setID(response["id"]);
        return true;
 
        
    }

}
