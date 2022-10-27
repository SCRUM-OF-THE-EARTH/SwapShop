import { db } from "../firebaseConfig/firebase";
import { login_user } from "../helpers/init";

export class Chat_Rooms{

    constructor() {
        this.profilePic = require("../../assets/profile.jpg");
        this.rooms_names = [];
        this.room_data = new Map();
        this.messages = new Map();
    }

    addRoomName(room_id){
        this.rooms_names.push(room_id);
    }

    getRoomNames(){
        return this.rooms_names;
    }

    addRoomData(room_id, users_data){
        this.room_data.set(room_id, users_data);
    }

    getRoomData(){
        return this.room_data;
    }

    pushMessages(_id, username, time, text){
        const currUser = login_user.getFullName();
        const i = username.find(function(element){
            return element != currUser;
        });

        const message = {
            id: _id,
            userName: i,
            userImg: this.pic,
            messageTime: time,
            messageText: text,
        }

        this.messages.set(id, message);
    }

    getMessages(){
        return this.messages;
    }
}

export const customChatRoom = new Chat_Rooms();