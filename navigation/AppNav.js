import {View, Text, ActivityIndicator} from 'react-native'
import React, { useContext }  from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './AuthStack'
import TabNavigator from './TabNavigator'
import { AuthContext } from '../context/AuthContext'


const AppNav = () => {
    const {splashLoading, userInfo} = useContext(AuthContext);

    if( splashLoading ) {
        return (
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator  size={'large'} />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {userInfo !== null ? <TabNavigator /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default AppNav;