import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect, useCallback, useLayoutEffect} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from "../../config/colors";
//import { collection, addDoc, query, orderBy, onSnapshot, QuerySnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import { login_user } from "./SignInScreen"; 

// create a chat screen UI
// so the user can be redirected to this page when, they choose the option to contact the client.
// this will make use of React-Native Gifted Chats (a builtin package which handles the components of the chat screen interface)
const ChatScreen = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    // the collection of messages (in firestore database) is ordered in descending order by the time the message has been sent
    // then a listener is set to detect if any changes have occured in the collection
    // if so it updates the chat screen on both the users end by using react-native-gifted-chat builtin setMessage function
    const unsub = db.collection("messages").orderBy('createdAt', 'desc').onSnapshot(snapshot => setMessages(
      snapshot.docs.map(doc=>({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user,
      }))
    ))

    return unsub;
    
  }, []);

  // useLayoutEffect(() => {
    
  //   const unsub = db.collection("messages").orderBy('createdAt', 'desc').onSnapshot(snapshot => setMessages(
  //     snapshot.docs.map(doc=>({
  //       _id: doc.data()._id,
  //       createdAt: doc.data().createdAt.toDate(),
  //       text: doc.data().text,
  //       user: doc.data().user,
  //     }))
  //   ))

  //   return unsub;
  // }, [])

  // when the user types a message and presses send, the new message will appear, on the screen (under previous one)
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
    // initialise the constants that will be passed as params to the database and gifted chat
    const {
      _id,
      createdAt,
      text,
      user,
    }=messages[0];

    db.collection('messages').add({
      _id,
      createdAt,
      text,
      user,
    })

  }, []);

  // rendering the send button
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={40}
            color={colors.seaGreen}
          />
        </View>
      </Send>
    );
  };

  // render the chat bubble
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: colors.seaGreen,
          },
          left: {
            backgroundColor: colors.lightGray,
          }
        }}
        textStyle={{
          right: {
            color: colors.white,
          },
        }}
      />
    );
  };

  // when messages have filled the screen and the user scrolls up, there is going to be an arrow that
  // when pressed will scroll back to the bottom (recent message)
  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color={colors.black} />
    );
  }

  // get the current users email and name
  let currUserID = login_user.getEmail();
  let currUserName = login_user.getFullName();

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      // pass the user details in the user component
      user={{
        _id: currUserID,
        name: currUserName
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});