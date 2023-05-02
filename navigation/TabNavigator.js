import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapScreen from "../screens/MapScreen";
import MessagesScreen from "../screens/MessagesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import FriendsScreen from "../screens/FriendsScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { color } from "@rneui/base";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const {
    userInfo,
    refresh,
    get,
    curLoc,
    setIsLoading,
    autoRefresh,
    getMessages,
    getChatInfo,
  } = useContext(AuthContext);

  useEffect(() => {
    const interval = setInterval(() => {
      autoRefresh(userInfo.id);
      get(userInfo.id);
      getMessages(userInfo.id);
      //getChatInfo("64509922b5c01b11db82eeef");
    }, 4000);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     updateStatus(userInfo.id)
  //   }, 2000);

  //   return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  // }, [])

  return (
    <Tab.Navigator
      initialRouteName="Friends"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#25D366",
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Friends") {
            return <Ionicons name={"people-outline"} size={25} />;
          } else if (route.name === "Map") {
            return <Ionicons name={"map-outline"} size={25} />;
          } else if (route.name === "Messages") {
            return <Ionicons name={"chatbox-ellipses-outline"} size={25} />;
          } else return <Ionicons name={"person-circle-outline"} size={25} />;
        },
      })}
    >
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Friends" component={FriendsScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
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
