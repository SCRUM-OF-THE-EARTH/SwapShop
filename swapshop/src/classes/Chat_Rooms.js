import { db } from "../firebaseConfig/firebase";
import { login_user } from "../helpers/init";

//this class keeps track of all the chat rooms active in the database
export class Chat_Rooms{

    constructor() {
        this.profilePic = require("../../assets/profile.jpg");
        this.rooms_names = [];
        this.room_data = new Map();
        this.messages = new Map();
        this.otherUsers = [];
    }

    //add a chat room name, fetched from the database
    addRoomName(room_id){
        this.rooms_names.push(room_id);
    }

    //return all te active chat room names
    getRoomNames(){
        return this.rooms_names;
    }

    //add the data belonging to the respective chat rooms
    addRoomData(room_id, users_data){
        this.room_data.set(room_id, users_data);
    }

    // return the chat room data
    getRoomData(){
        return this.room_data;
    }

    // push the active chat channels to the message list
    pushMessages(user, _id, username, time, text){
        const currUser = login_user.getFullName();
        const i = username.find(function(element){
            return element != currUser;
        });

        const message = {
            id: _id,
            userInfo: user, 
            userName: i,
            userImg: this.profilePic,
            messageTime: time,
            messageText: text,
        }

        if(this.messages.has(_id) === false){
            this.messages.set(_id, message);
        }
    }

    // fetch the message list
    getMessages(){
        return this.messages;
    }
}

export const customChatRoom = new Chat_Rooms();