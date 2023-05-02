import {View, Text, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import React, { useContext, useState }  from 'react'
import AuthStack from './AuthStack'
import TabNavigator from './TabNavigator'
import { AuthContext } from '../context/AuthContext'
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from '../components/CustomButton'


const EmailVerifier = () => {
    const {userInfo, verify, logout, emailAuthMessage, emailAuthMessageColor} = useContext(AuthContext);
    const [code, setCode] = useState('');

    return (
        <View style={styles.container}>
          <Ionicons name={'mail-unread-outline'} size ={100} color={'#25D366'} />
            <Text style={styles.titleText}>Please verify your email.</Text>
            <Text style={styles.subtitleText}>A 6-digit code has been sent to your email. Please enter it below.</Text>
            <TextInput 
              style={styles.input} 
              textAlign={'center'} 
              placeholder="Code" 
              onChangeText={text => setCode(text)}
              value={code}/>
            <Text style={{ color: {emailAuthMessageColor}, fontWeight: "700", textAlign: "center", paddingBottom: 20}}>
              {emailAuthMessage}
            </Text>
              
            <TouchableOpacity
              onPress={() => verify(userInfo.id, code)}>
              <Text style={{ color: "#25D366", fontWeight: "700", textAlign: "center", fontSize: 18, paddingBottom: 20}}>
                Verify
              </Text>
            </TouchableOpacity>
            
            

            <TouchableOpacity
              onPress={() => logout()}>
              <Text style={{ color: "#ff0000", fontWeight: "700", textAlign: "center", paddingBottom: 60}}>
                Logout
              </Text>
            </TouchableOpacity>
            
        </View>
    )
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
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#25D366'
    },
    input: {
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingBottom:5,
    },
    subtitleText: {
      fontSize: 18,
      textAlign: 'center',
      paddingTop: 10,
      paddingBottom: 20,
    },
});

export default EmailVerifier;