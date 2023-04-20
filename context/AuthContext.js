import React, {createContext, useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [user, setUser] = useState(null);

    const login = (data) => {
        setIsLoading(true);
        setUserToken('iosdkjvadks');
        setUser(data);
        AsyncStorage.setItem('userToken', 'iosdkjvadks');
        AsyncStorage.setItem('userID', data.id);
        AsyncStorage.setItem('userFirstName', data.firstName);
        AsyncStorage.setItem('userLastName', data.lastName);
        AsyncStorage.setItem('username', data.username);
        
        setIsLoading(false);
    }
    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        setUser(null)
        AsyncStorage.removeItem('userToken');
        AsyncStorage.removeItem('userID');
        AsyncStorage.removeItem('userFirstName');
        AsyncStorage.removeItem('userLastName');
        AsyncStorage.removeItem('username');
        setIsLoading(false);
    }

    const isLoggedIn = async() => {
        try {
            setIsLoading(true);
            let userToken = AsyncStorage.getItem('userToken');
            let user = {
                "id": AsyncStorage.getItem('userID'),
                "firstName": AsyncStorage.getItem('userFirstName'),
                "lastName": AsyncStorage.getItem('userLastName'),
                "username": AsyncStorage.getItem('username')
            };
            setUser(user);
            setUserToken(userToken);
            setIsLoading(false);
        } catch(e) {
            console.log(e)
        }    
    }

    useEffect(() => {
        isLoggedIn();
    }, [])

    return (
        <AuthContext.Provider value={{login, logout, isLoading, userToken, user}}>
            {children}
        </AuthContext.Provider>
    );
}

