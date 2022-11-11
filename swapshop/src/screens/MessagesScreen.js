import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import colors from '../../config/colors';
import { db } from '../firebaseConfig/firebase';
import { login_user } from '../helpers/init';
import { customChatRoom } from '../classes/Chat_Rooms';
import { User_Account } from '../classes/User_Account';
import Tab from "../components/Tab"
import themeContext from '../components/themeContext';
import { useState } from 'react';

const MessagesScreen = ({navigation}) => {

  // initialise message list
  const [Messages, setMessages] = useState([]);
  const [rendered, rerender] = useState(false);

  //the following functions will compare the members' details so as to distinguish them from the current logged in user
  function uname(variable){
    const curr = login_user.getUsername();

    const i = variable.find(function(element){
      return element != curr;
    });

    return i;
  }

  function email(variable){
    const curr = login_user.getEmail();
    
    const i = variable.find(function(element){
      return element != curr;
    });

    return i;
  }

  function fname(variable){
    const curr = login_user.getFullName();
    
    const i = variable.find(function(element){
      return element != curr;
    });

    return i;
  }
  // end of region

  // fetch data from the database and pass it onto the chat rooms class
  // this will enable us to access the values from the documents in the database
  const unsub = db.collection("chat_rooms").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>" , doc.data());
      const otherUser = new User_Account();
      otherUser.setEmail(email([doc.data().members.user1_id, doc.data().members.user2_id]));
      otherUser.setUsername(uname([doc.data().members.user1_uname, doc.data().members.user2_uname]));
      otherUser.setFullName(fname([doc.data().members.user1_fname, doc.data().members.user2_fname]));
      customChatRoom.addRoomName(doc.id);
      customChatRoom.addRoomData(doc.id, doc.data().members);
      customChatRoom.pushMessages(otherUser, doc.id,
        [doc.data().members.user1_fname,doc.data().members.user2_fname],
        "",
        "tap to see chat")
    });
  });

  // fetch data stored in the chat rooms class
  const rooms = customChatRoom.getRoomNames();

  for (let i = 0; i < rooms.length; i++){
    const name = rooms[i]
    const currUser = login_user.getUsername().toUpperCase();

    if (name.includes(currUser)){
      const roomMsgs = customChatRoom.getMessages();

      const msg = roomMsgs.get(name);

      if(Messages.includes(msg) === false){
        Messages.push(msg);
      }
    }
  }
  if (!rendered) {
    rerender(true);
    setMessages(Messages);
  }
  

  const theme = useContext(themeContext);
  
    return (
      <View style={[styles.container, { backgroundColor: theme.inputColor }]}>
        <FlatList 
          data={Messages}
          keyExtractor={item=>item.id}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.Card} onPress={() => navigation.navigate('ChatScreen', {owner: item.userInfo} )}>
              <View style={styles.UserInfo}>
                <View style={styles.UserImgWrapper}>
                  <Image style={styles.UserImg} source={item.userImg} />
                </View>
                <View style={styles.TextSection}>
                  <View style={styles.UserInfoText}>
                    <Text style={styles.UserName}>{item.userName}</Text>
                    <Text style={styles.PostTime}>{item.messageTime}</Text>
                  </View>
                  <Text style={styles.MessageText}>{item.messageText}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        
        
        <Tab nav={navigation} activeTab="message"/>
        
      </View>
    );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
  },
  topText: {
    fontSize: 20,
  },
  Card: {
    width: "100%",
  },
  UserInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  UserImgWrapper: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  UserImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  TextSection: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 15,
    paddingLeft: 0,
    marginLeft: 10,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  UserInfoText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  UserName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  PostTime: {
    fontSize: 12,
    color: colors.black,
  },
  MessageText: {
    fontSize: 14,
    color: colors.black_v2,
  },
});