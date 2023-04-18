import React, { useRef, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { getColorFromStatus } from '../components/utils';
import * as Location from 'expo-location';
import { Avatar } from '@rneui/themed';

const data = [
    {
        id: 0,
        firstName: 'Person',
        lastName: '1',
        description: 'Last Online 5m ago',
        coords: {
            latitude: 28.5986,
            longitude: -81.1986,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        lastUpdated: new Date(),
        status: "Away",

    },
    {
        id: 1,
        firstName: 'Person',
        lastName: '2',
        description: 'Last Online 26m ago',
        coords: {
            latitude: 26.9250,
            longitude: -81.3550,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        lastUpdated: new Date(),
        status: "Offline",
    },
    {
        id: 3,
        firstName: 'Person',
        lastName: '3',
        description: 'Online',
        coords: {
            latitude: 26.4250,
            longitude: -80.6550,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        lastUpdated: new Date(),
        status: "Offline",
    },
    {
        id: 4,
        firstName: 'Person',
        lastName: '4',
        coords: {
            latitude: 26.0250,
            longitude: -80.8750,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        lastUpdated: new Date(),
        status: "Online",
    },
    {
        id: 5,
        firstName: 'Person',
        lastName: '5',
        description: 'Online',
        coords: {
            latitude: 27.0250,
            longitude: -80.8550,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        lastUpdated: new Date(),
        status: "Online",
    },
]

// create a component
const MapScreen = () => {
    const [curLoc, setCurLoc] = useState({
        latitude: 26.0250,
        longitude: -80.3550,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
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

    const getStatusMessage = (status, time) => {
        if(status === "Offline"){
            return "Last Online " + time.toLocaleTimeString ('en-US', { hour12: true, hour: "numeric", minute: "numeric"})
        }
        if(status === "Online"){
            return "Online"
        }
        if(status === "Away"){
            return "Away"
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <MapView
                ref={mapRef}
                style={StyleSheet.absoluteFill}
                initialRegion={curLoc}
                onRegionChangeComplete={onRegionChange}
            >
                {data.map((val, i) => {
                    return (
                        <Marker
                            title={val.firstName + " " + val.lastName}
                            description={getStatusMessage(val.status, val.lastUpdated)}
                            key={i}
                            coordinate={val.coords}
                             
                        >
                        <Avatar
                            size={32}
                            title={val.firstName.substring(0, 1) + val.lastName.substring(0, 1)}
                            containerStyle={{ backgroundColor: getColorFromStatus(val.status) }}
                            rounded
                        />
                        </Marker>
                    )
                })}
            
            <Marker
                title={"You"}
                coordinate={curLoc}
            >
                <Avatar
                    size={32}
                    title={"You"}
                    containerStyle={{ backgroundColor: '#007aff' }}
                    rounded
                />
            </Marker>
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