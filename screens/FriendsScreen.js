import React, { useState, useContext } from "react";
import FriendBlock from "../components/FriendBlock";
import FriendRequest from "../components/FriendRequest";
import { FlatList, StyleSheet, Text, View, ScrollView } from "react-native";
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import InputField from "../components/InputField";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { color } from "@rneui/base";
import { AuthContext } from "../context/AuthContext";



const friends = [
  {
      id: 0,
      firstName: 'Person',
      lastName: '1',
      description: 'Last Online 5m ago',
      coords: {
          latitude: 28.5986,
          longitude: -81.1986,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
      },
      lastUpdated: new Date(),
      status: "Away",

  },
  {
      id: 1,
      firstName: 'Person',
      lastName: '2',
      description: 'Last Online 26m ago',
      coords: {
          latitude: 26.9250,
          longitude: -81.3550,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
      },
      lastUpdated: new Date(),
      status: "Offline",
  },
  {
      id: 3,
      firstName: 'Person',
      lastName: '3',
      description: 'Online',
      coords: {
          latitude: 26.4250,
          longitude: -80.6550,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
      },
      lastUpdated: new Date(),
      status: "Offline",
  },
  {
      id: 4,
      firstName: 'Person',
      lastName: '4',
      coords: {
          latitude: 26.0250,
          longitude: -80.8750,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
      },
      lastUpdated: new Date(),
      status: "Online",
  },
  {
      id: 5,
      firstName: 'Person',
      lastName: '5',
      description: 'Online',
      coords: {
          latitude: 27.0250,
          longitude: -80.8550,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
      },
      lastUpdated: new Date(),
      status: "Online",
  },
  {
    id: 6,
    firstName: 'Person',
    lastName: '6',
    description: 'Online',
    coords: {
        latitude: 26.4250,
        longitude: -80.6550,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    },
    lastUpdated: new Date(),
    status: "Offline",
},
{
    id: 7,
    firstName: 'Person',
    lastName: '7',
    coords: {
        latitude: 26.0250,
        longitude: -80.8750,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    },
    lastUpdated: new Date(),
    status: "Online",
},
{
    id: 8,
    firstName: 'Person',
    lastName: '8',
    description: 'Online',
    coords: {
        latitude: 27.0250,
        longitude: -80.8550,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    },
    lastUpdated: new Date(),
    status: "Online",
},
]

const requests = [
  {id: 0, userName: "spie51"},
  {id: 1, userName: "stan173"},
  {id: 2, userName: "StanleyPierre"}
]

export default function FriendsScreen() {
  const[searchValue, setSearchValue] = useState('');
  const {requestInfo, friendInfo} = useContext(AuthContext);
  
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
      fieldButtonFunction={() => {}}
      onChangeText = {text => setSearchValue(text)}
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
      </View>
      :

      friendInfo.map((item, i) => <FriendBlock 
                              firstName={item.firstName}
                              lastName={item.lastName}
                              status={item.stat.userStatus}
                              key={i}
                              lastUpdated={item.stat.lastUpdated} />)
                              
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