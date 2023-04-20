import React, { useState, useEffect, useContext } from 'react';
import { Platform, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { Avatar } from '@rneui/themed';
import { getColorFromStatus } from '../components/utils';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomButton from '../components/CustomButton';
import { AuthContext } from '../context/AuthContext';
// Icon (FL)
// Name (First + Last)
// Status (Indicatopr + Text)
// Update Button
export default function ProfileScreen() {
  
  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Online');
  const [items, setItems] = useState([
    {label: 'Online', value: 'online'},
    {label: 'Offline', value: 'offline'},
    {label: 'Away', value: 'away'}
  ]);
  const [data, setData] = useState({});
  const [statusNum, setStatusNum] = useState(0);
  const {logout, user} = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const fetchUpdate = async () => {
    try {
      console.log(user.id)
      console.log(value)
      console.log(location.coords.longitude)
      console.log(location.coords.latitude)
      const response = await fetch("https://api.whos-on.app/api/user/refresh", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          userStatus: value,
          location: {latitude: location.coords.latitude, longitude: location.coords.longitude},
        }),
      });
      console.log(response.status);
      setStatusNum(response.status);
      const jsonData = await response.json();
      //console.log(jsonData);
      setData(jsonData);
      console.log(statusNum);
      console.log(jsonData);
    } catch (error) {
      setData({});
      //console.log(statusNum);
      //console.log(jsonData);
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>

    <Avatar
      size={96}
      title={user.firstName.substring(0, 1) + user.lastName.substring(0, 1)}
      containerStyle={{ backgroundColor: '#25D366'}}
      rounded
    />
    <View style = {{paddingTop: 5, paddingBottom: 20}}>
    <Text style={styles.titleText}> {user.firstName + " " + user.lastName}</Text>
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
      onChangeValue = {() => 
        fetchUpdate()
      }
    />
    
     </View>
     <View style={{width: 280}}>
     <CustomButton
      label={"Update Location"}
      onPress={() => {}}
    />

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