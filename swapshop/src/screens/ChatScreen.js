import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect, useCallback, useContext} from 'react';
import {View, ScrollView, Text, Button, StyleSheet, Image} from 'react-native';
import {Bubble, GiftedChat, Send, Actions} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import colors from "../../config/colors";
//import { collection, addDoc, query, orderBy, onSnapshot, QuerySnapshot, doc, getDoc } from "firebase/firestore";
import { db, firebase } from "../firebaseConfig/firebase";
import { login_user } from "../classes/User_Account"; 
import { user_chat_info } from "../classes/User_Chats";
import themeContext from '../components/themeContext';

// create a chat screen UI
// so the user can be redirected to this page when, they choose the option to contact the client.
// this will make use of React-Native Gifted Chats (a builtin package which handles the components of the chat screen interface)
const ChatScreen = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);
  const[img, setImage] = useState(null);
  const[uploading, setUploading] = useState(false);
  const [imageList, setImgaeList] = useState('');
  const item = route.params;
  
  // get the current users email and name
  let currUserID = login_user.getEmail();
  let currUserName = login_user.getFullName();

  let othrUserID = item.owner.getEmail();
  let othrUserName = item.owner.getFullName();

  let users = new Map([
    [currUserID, currUserName],
    [othrUserID, othrUserName]
  ])

  let IDs = [currUserID, othrUserID];
  IDs.sort();

  let username_1 = login_user.getUsername().toUpperCase();
  let username_2 = item.owner.getUsername().toUpperCase();
  let names = [username_1, username_2];
  names.sort();
  let db_tmp = names[0] + names[1];

  let chat_database = db_tmp;


  let pic = 'https://placeimg.com/140/140/any';

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, 
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image, true);
      xhr.send(null);
    })
    const ref = firebase.storage().ref().child('Pictures/Image1')
    const snapshot = ref.put(blob)
    snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
      ()=>{
        setUploading(true)
      },
      (error) => {
        setUploading(false)
        console.log(error)
        blob.close()
        return 
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false)
          console.log("Download URL: ", url)
          setImage(url)
          blob.close()
          return url
        })
      }
      )
  }

  useEffect(() => {

    // setMessages([
    //   {
    //     _id: 1,
    //     text: 'Hello developer',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'React Native',
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //     image: pic,
    //   },
    // ])

    // the collection of messages (in firestore database) is ordered in descending order by the time the message has been sent
    // then a listener is set to detect if any changes have occured in the collection
    // if so it updates the chat screen on both the users end by using react-native-gifted-chat builtin setMessage function
    const unsub = db.collection("chat_rooms")
    .doc(chat_database + "_room")
    .collection("messages").orderBy('createdAt', 'desc').onSnapshot(snapshot => setMessages(
      snapshot.docs.map(doc=>({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user,
        //image: doc.data().image,
      }))
    ))

    return unsub;
    
  }, []);

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
      //image,
    }=messages[0];

    db.collection("chat_rooms").doc(chat_database + "_room")
    .set({
      members:
      {
        user1_id: IDs[0],
        user2_id: IDs[1],
        user1_name: users.get(IDs[0]),
        user2_name: users.get(IDs[1]),
      }
    })

    db.collection("chat_rooms")
    .doc(chat_database + "_room")
    .collection("messages").add({
      _id,
      createdAt,
      text,
      user,
      //image,
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

  // const renderMessageImage = (props) => {
  //   return(
  //   <View>
  //     <Image source={{uri: pic}} />
  //   </View>
  //   )
  // }

  const renderActions = (props) => {
    return (
      <Actions
        {...props}
        //options={{
          //['Upload Picture']: pickImage,
        //}}
        //optionTintColor={colors.mediumSeaGreen}
        icon={() => (
          <MaterialCommunityIcons name={'image'} size={28} color={colors.mediumSeaGreen} />
        )}
        onPressActionButton={pickImage}
      />
    )
  }

  // when messages have filled the screen and the user scrolls up, there is going to be an arrow that
  // when pressed will scroll back to the bottom (recent message)
  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color={colors.black} />
    );
  }

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
      renderActions={renderActions}
      //renderMessageImage={renderMessageImage}
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