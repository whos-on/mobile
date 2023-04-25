import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import { AuthProvider } from './context/AuthContext';
import AuthStack from './navigation/AuthStack';
import TabNavigator from './navigation/TabNavigator';
import AppNav from './navigation/AppNav';

const Stack = createStackNavigator()

export default function App() {
  return (
    <AuthProvider>
        <AppNav />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
