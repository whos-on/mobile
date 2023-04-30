import React, { useState, useContext } from "react";
import FriendBlock from "../components/FriendBlock";
import FriendRequest from "../components/FriendRequest";
import { FlatList, StyleSheet, Text, View, ScrollView, Touchable, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import InputField from "../components/InputField";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { color } from "@rneui/base";
import { AuthContext } from "../context/AuthContext";

export default function FriendsScreen() {
  const[searchValue, setSearchValue] = useState('');
  const {requestInfo, friendInfo, searchInfo, search, userInfo, addFriend} = useContext(AuthContext);
  
  return (
    <ScrollView
    style={{
      flex: 1,
      backgroundColor: "#fff"
      //justifyContent: 'center',
      //alignItems: 'center',
    }}>
    <View style={{paddingTop: 30, backgroundColor: "#fff"}}>
    <View style={{padding: 15}}>
    <InputField
      label={"Search for a friend..."}
      icon={
      <MaterialIcons
        name="search"
        size={35}
        color="#666"
        style={{ marginRight: 5 }}
      />
      }
      fieldButtonLabel={"Add Friend"}
      fieldButtonFunction={() => {addFriend(userInfo.id, searchValue)}}
      onChangeText = {(text) => {
                        setSearchValue(text)
                        search(userInfo.id, text)
                      }}
      value = {searchValue}
    />
    </View>
    {
      (requestInfo == null || requestInfo.length == 0) ?
      <View style={{alignItems: "center", paddingTop: 20}}>
        <Text style = {{fontSize: 14, color: "gray"}}>No incoming requests</Text>
      </View> :

      requestInfo.map((item, i) => <FriendRequest userName={item} key={i}/>)
    }

    <View style={{alignItems: "center", paddingTop: 20}}>
      <Text style = {{fontSize: 18, fontWeight: "bold"}}>Friends</Text>
    </View>


    {
      (friendInfo == null || friendInfo.length == 0) ? 
      <View style={{alignItems: "center", paddingTop: 20}}>
        <Text style = {{fontSize: 14, color: "gray"}}>Use the Search Bar to start adding friends!</Text>
      </View> : 
      (searchValue.length == 0) ? 

      friendInfo.map((item, i) => <FriendBlock 
                              firstName={item.firstName}
                              lastName={item.lastName}
                              status={item.stat.userStatus}
                              key={i}
                              lastUpdated={item.stat.lastUpdated} />)
      : (searchInfo != null && searchInfo.length != 0) ?

      searchInfo.map((item, i) => <FriendBlock 
                              firstName={item.firstName}
                              lastName={item.lastName}
                              status={item.stat.userStatus}
                              key={i}
                              lastUpdated={item.stat.lastUpdated} />)
      : <View style={{alignItems: "center", paddingTop: 20}}>
          <Text style = {{fontSize: 14, color: "gray"}}>No friends with that name! Use the Add Friend Button to add this username.</Text>
        </View>                   
    }

    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});