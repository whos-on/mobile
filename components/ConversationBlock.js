import { Platform, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from '@rneui/themed';
import { userToBgColor, getStatusMessage, getColorFromStatus, arrToStringList, arrToCharList } from './utils';
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const ConversationBlock = ({ chatId }) => {
    const [chatRoomRes, setChatRoomRes] = useState(null);
    const [chat, setChat] = useState(chatId);
    //console.log("the chat id is... " + chat);
  
    useEffect(() => {
      const getChatInfo = () => {
        const input = {
          chatID: chat,
        };
        axios
          .post(baseURL + "api/chat/info/", input)
          .then((res) => {
            const info = res.data;
            setChatRoomRes(info);
            //let array = [...messagesInfo];
            //array[index] = info;
            //setMessagesInfo(array);
            //console.log("we are getchatinfo");
            //console.log("chat info " + info);
            //console.log("chat info " + typeof info);
            //return info;
          })
          .catch((e) => {
            console.log(e.response.data);
            setIsLoading(false);
          });
      };
  
      getChatInfo();
      console.log("Inside useEffect " + chatRoomRes);
    }, []);

  return (
    <View style={styles.friendBlock}>

    <View style={styles.friendBlock1}>
    <Avatar
      size={64}
      title={arrToCharList(chatRoomRes.people)}
      containerStyle={{ backgroundColor: "#25D366"}}
      rounded
    />
    </View>

    <View style={styles.friendBlock2}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{arrToCharList(chatRoomRes)} </Text>
        <Text style={{color: statusColor , fontWeight: 'bold'}}>{chatRoomRes.messages == null
                ? "Click to add a message"
                : chatRoomRes.messages[chatRoomRes.messages.length - 1]
                    .contents}</Text>
    </View>

    <View style={styles.friendBlock3}>
    <TouchableOpacity
      onPress={() => {}}>
        <Text style={{ color: "#ff0000", fontWeight: "700", paddingLeft: 50}}>
          Remove
        </Text>
    </TouchableOpacity>
    </View>
    </View> 
    
  );
}

const styles = StyleSheet.create({
    friendBlock: {
      flexDirection: "row",
      backgroundColor: "#fff",
      //alignItems: "center",
      //justifyContent: "center",
      padding: 0,
      zIndex: 1,
    },
    friendBlock1: {
        //alignItems: "center",
        //justifyContent: "center",
        padding: 10,
        paddingLeft: 15,
        zIndex: 1,
    },
    friendBlock2: {
        //alignItems: "center",
        justifyContent: "center",
        padding: 10,
        zIndex: 1,
    },
    friendBlock3: {
        position: "absolute",
        right: 10,
        //alignItems: "center",
        justifyContent: "center",
        padding: 10,
        zIndex: 1,
    },
  });
