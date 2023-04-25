import { Platform, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from '@rneui/themed';
import { getColorFromStatus, getStatusMessage } from './utils';
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function FriendRequest({ userName }) {
  return (
    <View style={styles.friendBlock}>
    <Text style = {{paddingLeft: 5, fontWeight: 'bold'}}>User <Text style={{color:"#25D366"}}>{userName}</Text> would like to be friends!</Text>

    <View style = {{flexDirection: "row", position: "absolute", right: 12, backgroundColor: "#fff"}}>
    <TouchableOpacity onPress={() => {}}>
    <MaterialIcons
        name="check-circle-outline"
        size={25}
        color="#666"
        style={{ marginRight: 5, color: "green"}}
    />
    </TouchableOpacity>

    <TouchableOpacity onPress={() => {}}>
    <MaterialIcons
        name="close"
        size={25}
        color="#666"
        style={{ marginRight: 0, color: "red" }}
    />
    </TouchableOpacity>
    </View>
    
    

    {/* <View style={styles.friendBlock2}>
    <TouchableOpacity
      onPress={() => {}}>
        <Text style={{ color: "#ff0000", fontWeight: "700", paddingLeft: 50}}>
          Remove
        </Text>
    </TouchableOpacity>
    </View> */}
    </View> 
    
  );
}

const styles = StyleSheet.create({
    friendBlock: {
      flexDirection: "row",
      backgroundColor: "#fff",
      //alignItems: "center",
      //justifyContent: "center",
      padding: 10,
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
  });
