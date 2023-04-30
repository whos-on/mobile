import React, { useState, useEffect, useContext } from 'react';
import { Platform, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { Avatar } from '@rneui/themed';
import { userToBgColor } from '../components/utils';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomButton from '../components/CustomButton';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
// Icon (FL)
// Name (First + Last)
// Status (Indicatopr + Text)
// Update Button
export default function ProfileScreen() {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Online");
  const [items, setItems] = useState([
    {label: 'Online', value: 'Online'},
    {label: 'Offline', value: 'Offline'},
    {label: 'Away', value: 'Away'}
  ]);

  const {logout, userInfo, refresh, setCurrentStatus, currentStatus, curLoc} = useContext(AuthContext);


  return (
    <View style={styles.container}>
    {/* <Spinner visible={isLoading} /> */}
    <Avatar
      size={96}
      title={userInfo.firstName.substring(0, 1) + userInfo.lastName.substring(0, 1)}
      containerStyle={{ backgroundColor: userToBgColor(userInfo) }}
      rounded
    />
    <View style = {{paddingTop: 5, paddingBottom: 20}}>
    <Text style={styles.titleText}> {userInfo.firstName + " " + userInfo.lastName}</Text>
     </View> 
     <View style={styles.statusbar}>
    <Text style={styles.subtitleText}> {"Status: "} </Text>
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      containerStyle={{width: 200}}
      placeholder={value}
      onChangeValue = {(value) => {
        refresh(userInfo.id, value, curLoc)
        // setCurrentStatus(value)
        // console.log(currentStatus + " but we need " + value)
      }}
    />
    
     </View> 
     <View style={{width: 280}}>

    <TouchableOpacity
      onPress={() => {}}>
        <Text style={{ color: "#007aff", fontWeight: "400", textAlign: "center", paddingBottom: 15}}>
          Change Password
        </Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => logout()}>
        <Text style={{ color: "#ff0000", fontWeight: "700", textAlign: "center"}}>
          Logout
        </Text>
    </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  statusbar: {

    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
    zIndex: 1,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitleText: {
    fontSize: 18,
  },

});