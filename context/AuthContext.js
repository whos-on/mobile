import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const baseURL = "https://api.whos-on.app/";
  //const baseURL = "http://localhost:3000/";
  const [userInfo, setUserInfo] = useState(null);
  const [friendInfo, setFriendInfo] = useState(null);
  const [searchInfo, setSearchInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [registerStatus, setRegisterStatus] = useState("");
  const [registerStatusColor, setRegisterStatusColor] = useState("white");
  const [addFriendStatus, setAddFriendStatus] = useState("");
  const [addFriendStatusColor, setAddFriendStatusColor] = useState("white");
  const [requestInfo, setRequestInfo] = useState(null);
  const [currentStatus, setCurrentStatus] = useState("Online");
  const [messagesInfo, setMessagesInfo] = useState([]);
  const [chatInfo, setChatInfo] = useState(null);
  const [curLoc, setCurLoc] = useState({
    latitude: 27.5989,
    longitude: -82.1989,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const register = (firstName, lastName, username, email, password) => {
    setIsLoading(true);

    axios
      .post(baseURL + "api/user/register/", {
        email,
        password,
        username,
        firstName,
        lastName,
      })
      .then((res) => {
        // let userInfo = res.data;
        // setUserInfo(userInfo);
        // AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setRegisterStatusColor("green");
        setRegisterStatus("Registration Successful");
        setIsLoading(false);
        // console.log(userInfo);
      })
      .catch((e) => {
        console.log(e.response.data);
        setRegisterStatusColor("red");
        setRegisterStatus("Invalid Credentials");
        setIsLoading(false);
      });
  };

  const login = (email, password) => {
    setIsLoading(true);

    axios
      .post(baseURL + "api/user/login/", {
        email,
        password,
      })
      .then((res) => {
        let userInfo = res.data;
        setUserInfo(userInfo);

        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        get(userInfo.id);
        refresh(userInfo.id, "Online", curLoc);
        getMessages(userInfo.id);
        setIsLoading(false);
        console.log(userInfo);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);
    AsyncStorage.removeItem("userInfo");
    setUserInfo(null);
    setIsLoading(false);
  };

  const get = (userId) => {
    const input = {
      id: userId,
    };
    setIsLoading(true);

    axios
      .post(baseURL + "api/friend/get/", input)
      .then((res) => {
        let friendInfo = res.data.friends;
        setFriendInfo(friendInfo);
        //AsyncStorage.setItem('friendInfo', JSON.stringify(friendInfo));
        setIsLoading(false);
        //console.log(friendInfo);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  const search = (userId, search) => {
    const input = {
      id: userId,
      search: search,
    };
    setIsLoading(true);

    axios
      .post(baseURL + "api/friend/search/", input)
      .then((res) => {
        let searchInfo = res.data.friends;
        setSearchInfo(searchInfo);
        //AsyncStorage.setItem('friendInfo', JSON.stringify(friendInfo));
        setIsLoading(false);
        //console.log(friendInfo);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  const refresh = (id, userStatus, location) => {
    console.log(currentStatus);

    const input = {
      id: id,
      userStatus: userStatus,
      location: { latitude: location.latitude, longitude: location.longitude },
    };

    console.log(input);
    //setCurrentStatus(userStatus);
    axios
      .put(baseURL + "api/user/refresh/", input)
      .then((res) => {
        let requestInfo = res.data.requests;
        setRequestInfo(requestInfo);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  const autoRefresh = (userId) => {
    const input = {
      id: userId,
    };
    setIsLoading(true);

    const promise = axios
      .post(baseURL + "api/user/info/", input)
      .then((res) => {
        // setCurrentStatus(status)
        // console.log(currentStatus)
        setIsLoading(false);
        refresh(userInfo.id, res.data.status, curLoc);
        console.log("Status is " + res.data.status);
        //return res.data.status;
        //console.log(status);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });

    return promise;
  };

  const processRequest = (userId, userName, accept) => {
    const input = {
      id: userId,
      requester: userName,
      accept: accept,
    };
    setIsLoading(true);

    axios
      .put(baseURL + "api/friend/processRequest/", input)
      .then((res) => {
        //let searchInfo = res.data.friends;
        get(userInfo.id);
        autoRefresh(userInfo.id);
        //AsyncStorage.setItem('friendInfo', JSON.stringify(friendInfo));
        setIsLoading(false);
        //console.log(friendInfo);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  const addFriend = (userId, search) => {
    const input = {
      id: userId,
      search: search,
    };
    setIsLoading(true);

    axios
      .put(baseURL + "api/friend/addFriend/", input)
      .then((res) => {
        // setRegisterStatusColor('green')
        // setRegisterStatus('Registration Successful')
        setIsLoading(false);
      })
      .catch((e) => {
        // setRegisterStatusColor('red')
        // setRegisterStatus('Invalid Credentials')
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);
      let userInfo = await AsyncStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfo);
      if (userInfo) {
        setUserInfo(userInfo);
      }
      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  const updateLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log(status);
    if (status !== "granted") {
      //setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    //console.log(location);

    return location;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateLocation().then((res) => {
        //console.log(res);
        // updateLatitude(res.coords.latitude);
        // updateLongitude(res.coords.latitude);
        setCurLoc((previousState) => ({
          ...previousState,
          latitude: res.coords.latitude,
          longitude: res.coords.longitude,
        }));
        // setLongitude(res.coords.longitude)
      });
    }, 2000);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  const getMessages = (userId) => {
    const input = {
      id: userId,
    };
    setIsLoading(true);

    axios
      .post(baseURL + "api/chat/get/", input)
      .then((res) => {
        let messagesInfo = res.data;

        setMessagesInfo(messagesInfo);

        //let arr = [];
        // for (let i = 0; i < messagesInfo.length; i++) {
        //   getChatInfo(messagesInfo[i], i);
        // }

        //console.log(messagesInfo);

        setIsLoading(false);
        //console.log("This is the weird " + messagesInfo[1]);
        //console.log(arr);
        return arr;
      })
      .catch((e) => {
        //console.log(e.response.data);
        setIsLoading(false);
      });
  };

  // const getChatInfo = (chatID) => {
  //   const input = {
  //     chatID: chatID,
  //   };
  //   setIsLoading(true);

  //   axios
  //     .post(baseURL + "api/chat/info/", input)
  //     .then((res) => {
  //       let chatInfo = res.data;
  //       setChatInfo(chatInfo);
  //       setIsLoading(false);
  //       console.log("getChatInfo " + chatInfo.people[1].firstName);
  //     })
  //     .catch((e) => {
  //       console.log(e.response.data);
  //       setIsLoading(false);
  //     });
  // };

  const getChatInfo = (chatID) => {
    const input = {
      chatID: chatID,
    };
    setIsLoading(true);
    axios
      .post(baseURL + "api/chat/info/", input)
      .then((res) => {
        let info = res.data;
        //let array = [...messagesInfo];
        //array[index] = info;
        setChatInfo(info);
        //setMessagesInfo(array);
        setIsLoading(false);
        //console.log("we are getchatinfo");
        //console.log("chat info " + info);
        //return info;
      })
      .catch((e) => {
        console.log(e.response.data);
        setIsLoading(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoading,
        register,
        splashLoading,
        userInfo,
        refresh,
        get,
        search,
        searchInfo,
        registerStatus,
        registerStatusColor,
        requestInfo,
        friendInfo,
        currentStatus,
        setCurrentStatus,
        curLoc,
        autoRefresh,
        addFriend,
        processRequest,
        getMessages,
        messagesInfo,
        getChatInfo,
        chatInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
