import React from 'react';
import {TouchableOpacity, Image, View, Text, SafeAreaView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';


const LoginScreen = ({navigation}) => {
  
  const loginFunc = () => {
    // Add logic for API calls + validation
    
    navigation.navigate('HomeScreen')
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image style={{marginBottom: 25}} source={require('../assets/logo.png')} />
          
          <InputField
          label={'Email ID'}
          icon={
            <MaterialIcons
            name="mail-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          }
          keyboardType="email-address"
        />
        <InputField
          label={'Password'}
          icon={
            <MaterialIcons
            name="vpn-key"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          }
          inputType="password"
          fieldButtonLabel={"Forgot?"}
          fieldButtonFunction={() => {}}
        />

        <CustomButton label={"Login"} onPress={() => loginFunc()} />
        
        <TouchableOpacity onPress={() => {navigation.navigate('RegisterScreen')}}>
          <Text style={{color: '#25D366', fontWeight: '700'}}>Create new account</Text>
        </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;