import React, { useEffect, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import colors from '../../config/colors';
import { db } from '../firebaseConfig/firebase';
import { user_chat_info } from '../classes/User_Chats';
import { login_user } from '../classes/User_Account';
import { customChatRoom } from '../classes/Chat_Rooms';
import themeContext from '../components/themeContext';


// const Messages = [
//   /*{
//     id: '1',
//     userName: user_chat_info.getCurrentUserID(),
//     userImg: require('../../assets/profile.jpg'),
//     messageTime: '1 mins ago',
//     messageText:
//       'Hey there!',
//   },*/
//   /*{
//     id: '2',
//     userName: 'John',
//     userImg: require('../../assets/profile.jpg'),
//     messageTime: '1 hour ago',
//     messageText:
//       'This is a test!',
//   },
//   {
//     id: '3',
//     userName: 'Val',
//     userImg: require('../../assets/profile.jpg'),
//     messageTime: '2 hours ago',
//     messageText:
//       'I repeat, this is a test!',
//   },*/
// ];

const MessagesScreen = ({navigation}) => {

  const Messages = [
    {
      id: '1',
      userName: "Leslie Fabishilaki",
      userImg: require('../../assets/profile.jpg'),
      messageTime: '1 mins ago',
      messageText:
        'Hey there!',
    },
    {
      id: '2',
      userName: 'Ciaran Otter',
      userImg: require('../../assets/profile.jpg'),
      messageTime: '1 hour ago',
      messageText:
        'This is a test!',
    },
    {
      id: '3',
      userName: 'Admin account',
      userImg: require('../../assets/profile.jpg'),
      messageTime: '2 hours ago',
      messageText:
        'I repeat, this is a test!',
    },
  ];

  const unsub = db.collection("chat_rooms").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>" , doc.data());
      //customChatRoom.insertActiveRooms(doc.id, doc.data());
      //customChatRoom.insertRoom(doc.id);
      //customChatRoom.pushMessages(doc.id, doc.data().members.user1_name);
    });
  });

  const theme = useContext(themeContext);
    return (
      <View style={[styles.container, { backgroundColor: theme.inputColor }]}>
        <FlatList 
          data={Messages}
          keyExtractor={item=>item.id}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.Card} onPress={() => navigation.navigate('ChatScreen', {owner: login_user} )}>
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
      </View>
    );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    backgroundColor: colors.white,
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