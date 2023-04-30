import React, { useRef, useState, useContext } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { getColorFromStatus, getStatusMessage } from '../components/utils';
import * as Location from 'expo-location';
import { Avatar } from '@rneui/themed';
import { AuthContext } from '../context/AuthContext';


// create a component
const MapScreen = () => {
    // const [curLoc, setCurLoc] = useState({
    //     // latitude: parseFloat(latitude),
    //     // longitude: parseFloat(longitude),
    //     latitude: latitude,
    //     longitude: longitude,
    //     latitudeDelta: 0.0922,
    //     longitudeDelta: 0.0421,
    // })
    const [address, setAddress] = useState('')

    const mapRef = useRef(null)

    const onCenter = () => {
        console.log(mapRef)
        mapRef.current.animateToRegion(curLoc)
    }

    const onRegionChange = async(props) =>{
        // console.log("props==>>>",props)
        const {latitude, longitude} = props
        //const res = await getAddressFromLatLong(`${latitude}, ${longitude}`)
        //console.log("res==>>>>>",res)
        //setAddress(res.address)

    }

    const { latitude, longitude, friendInfo, curLoc } = useContext(AuthContext);

    return (
        <View style={{ flex: 1 }}>
            <MapView
                ref={mapRef}
                style={StyleSheet.absoluteFill}
                initialRegion={curLoc}
                onRegionChangeComplete={onRegionChange}
                showsUserLocation={true}
                showsMyLocationButton={true}
            >
                {friendInfo.map((val, i) => {
                    const message = getStatusMessage(val.stat.userStatus, val.stat.lastUpdated)
                    return (
                        <Marker
                            title={val.firstName + " " + val.lastName}
                            description={message}
                            key={i}
                            coordinate={val.location}
                             
                        >
                        <Avatar
                            size={32}
                            title={val.firstName.substring(0, 1) + val.lastName.substring(0, 1)}
                            containerStyle={{ backgroundColor: getColorFromStatus(val.stat.userStatus) }}
                            rounded
                        />
                        </Marker>
                    )
                })}
            
            {/* <Marker
                title={"You"}
                coordinate={curLoc}
            >
                <Avatar
                    size={48}
                    title={"You"}
                    containerStyle={{ backgroundColor: '#007aff' }}
                    rounded
                />
            </Marker> */}
            </MapView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    bottomView: {
        position: 'absolute',
        bottom: 24,
        left: 24,
        right: 24,
    },
    headerView: {
        position: 'absolute',
        top: 36,
        left: 24,
        right: 24,
    },
    navigationView: {
        width: 35,
        height: 35,
        borderRadius: 37,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

//make this component available to the app
export default MapScreen;