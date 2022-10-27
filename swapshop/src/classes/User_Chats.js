import { login_user } from "./User_Account";

export class User_Chats {
    constructor() {
        this.username = login_user.getUsername();
        this.user_id = login_user.getEmail();
        this.user_FullName = login_user.getFullName();
        this.chat_rooms = [];
        this.room_member = new Map();
        this.member = null;
    }

    //username = login_user.getUsername();

    getCurrentUserID(){
        return this.user_id;
    }
    
    setChatRoom(room, member){
        this.chat_rooms.push(room);
        this.room_member.set(room, member);
    }

    getChatRoom(){
        return this.chat_rooms;
    }

    getRoomMember(){
        return this.room_member;
    }

    setMember(member){
        this.member = member; 
    }

    getMember(){
        return this.member;
    }
}

export const user_chat_info = new User_Chats();