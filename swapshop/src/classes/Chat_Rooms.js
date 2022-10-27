import { db } from "../firebaseConfig/firebase";

export class Chat_Rooms{

    constructor() {
        this.profilePic = require("../../assets/profile.jpg");
        this.rooms = [];
    }

    pushMessages(ids, username){
        this.messages.push({
            id: ids,
            userName: username,
            userImg: this.pic,
            messageTime: '2 hours ago',
            messageText:
            'I repeat, this is a test!',
        })
    }

    returnMsgs(){
        return this.messages[0];
    }

    insertActiveRooms(roomID, roomData){
        this.rooms.set(roomID, roomData);
    }

    getRooms(){
        return this.rooms;
    }

    insertRoom(roomID){
        this.dbRoom.push(roomID);
    }

    getDBRoom(){
        return this.dbRoom[1];
    }
}

export const customChatRoom = new Chat_Rooms();