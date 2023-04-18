import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MapScreen from "./MapScreen";
import MessasgesScreen from "./MessagesScreen";
import ProfileScreen from "./ProfileScreen";
import FriendsScreen from "./FriendsScreen";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: "#25D366",
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === 'Friends') {
          return (
            <Ionicons name={'people-outline'} size ={25} />
          );
        } else if (route.name === 'Map') {
          return (
            <Ionicons name={'map-outline'} size ={25} />
          );
        }
        else if (route.name === 'Messages') {
          return (
            <Ionicons name={'chatbox-ellipses-outline'} size ={25} />
          );
        }
        else return (
          <Ionicons name={'person-circle-outline'} size ={25} />
        )
      }})}>
      <Tab.Screen name="Messages" component={MessasgesScreen} />
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
