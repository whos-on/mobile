import React, {createContext, useEffect, useState} from "react";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const baseURL = 'http://localhost:3000/'
    const [userInfo, setUserInfo] = useState(null);
    const [friendInfo, setFriendInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);
    const [registerStatus, setRegisterStatus] = useState('');
    const [registerStatusColor, setRegisterStatusColor] = useState('white');
    const [requestInfo, setRequestInfo] = useState(null);
    const [latitude, setLatitude] = useState(27.5986);
    const [longitude, setLongitude] = useState(-82.1986);
    const [currentStatus, setCurrentStatus] = useState("Online");

    const register = (firstName, lastName, username, email, password) => {
        setIsLoading(true);

        axios.post(baseURL + 'api/user/register/', {
            email,
            password,
            username,
            firstName,
            lastName,
        }).then(res => {
            // let userInfo = res.data;
            // setUserInfo(userInfo);
            // AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setRegisterStatusColor('green')
            setRegisterStatus('Registration Successful')
            setIsLoading(false);
            // console.log(userInfo);
        }).catch(e => {
            //console.log(e)
            setRegisterStatusColor('red')
            setRegisterStatus('Invalid Credentials')
            setIsLoading(false);
        })
    }

    const login = (email, password) => {
        setIsLoading(true);

        axios.post(baseURL + 'api/user/login/', {
            email,
            password,
        }).then(res => {
            let userInfo = res.data;
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            get(userInfo.id)
            refresh(userInfo.id, "Online")
            setIsLoading(false);
            console.log(userInfo);
        }).catch(e => {
            console.log(e);
            setIsLoading(false);
        })
    }

    const logout = () => {
        setIsLoading(true);
        AsyncStorage.removeItem('userInfo');
        setUserInfo(null);
        setIsLoading(false);
    }

    const get = (userId) => {
        const input = {
            "id": userId
        }
        //console.log(input);
        // console.log("Hi");
        // console.log("Id: " + id);
        setIsLoading(true);

        axios.post(baseURL + 'api/friend/get/', input)
        .then(res => {
            let friendInfo = res.data.friends;
            setFriendInfo(friendInfo);
            //AsyncStorage.setItem('friendInfo', JSON.stringify(friendInfo));
            setIsLoading(false);
            //console.log(friendInfo);
        }).catch(e => {
            console.log(e);
            setIsLoading(false);
        })
    }

    const refresh = (id, userStatus) => {
        const input = {
            "id": id,
            "userStatus": userStatus,
            "location": {latitude: latitude, longitude: longitude}
        }
        console.log(input);

            setIsLoading(true);
            setCurrentStatus(userStatus);
            axios.put(baseURL + 'api/user/refresh/', input)
            .then(res => {
            let requestInfo = res.data.requests;
            //console.log("requests" + JSON.stringify(res.data) + "here");
            setRequestInfo(requestInfo);
            //AsyncStorage.setItem('friendInfo', JSON.stringify(friendInfo));
            setIsLoading(false);
            //console.log(requestInfo);
        }).catch(e => {
            console.log(e);
            setIsLoading(false);
        })
    }

    const isLoggedIn = async () => {
        try {
          setSplashLoading(true);
          let userInfo = await AsyncStorage.getItem('userInfo');
          userInfo = JSON.parse(userInfo);
          if (userInfo) {
            //setUserInfo(userInfo);
          }
          setSplashLoading(false);
        } catch (e) {
          setSplashLoading(false);
          console.log(e);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, [])

    // useEffect(() => {
    //     (async () => {
    //       let { status } = await Location.requestForegroundPermissionsAsync();
    //       if (status !== 'granted') {
    //         setErrorMsg('Permission to access location was denied');
    //         return;
    //       }
    
    //       let location = await Location.getCurrentPositionAsync({});
    //       setLatitude(location.coords.latitude);
    //       setLongitude(location.coords.longitude);
    //     })();
    // }, []);
  

    // useEffect(() => {
    //     if(userInfo != null){
    //         const id = setInterval(refresh(currentStatus), 10000);
    //         return () => clearInterval(id);
    //     }
    //  }, []);

    //  useEffect(() => {
    //     if(userInfo != null){
    //         const id = setInterval(get(), 10000);
    //         return () => clearInterval(id);
    //     }
    //  }, []);

    return (
        <AuthContext.Provider value={{login, 
                                    logout, 
                                    isLoading, 
                                    register, 
                                    splashLoading, 
                                    userInfo, 
                                    refresh,
                                    get,
                                    registerStatus,
                                    registerStatusColor,
                                    requestInfo,
                                    friendInfo}}>
            {children}
        </AuthContext.Provider>
    );
}

