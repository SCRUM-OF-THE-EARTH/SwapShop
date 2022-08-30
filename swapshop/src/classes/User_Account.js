import { Communicator } from './Communicator.js';

const communicator = new Communicator();


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
    constructor(username) {
        super();
        this.setUsername(username);
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
        this.communicator = new Communicator();

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
