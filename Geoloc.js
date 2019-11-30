import React, {createContext, useState, useEffect} from 'react';
import {AsyncStorage} from "react-native";

export const GeolocContext = createContext('');
export const GeolocProvider = props => {
    const [position, setPosition] = useState(null);
    const [datas, setDatas] = useState(null);
    _storeData = async () => {
        await fetch('https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&geofilter.distance=' + position.latitude + '%2C' + position.longitude + '%2C' + 1000)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.errorcode != 10005) {
                    AsyncStorage.setItem('VelibData', JSON.stringify(responseJson.records));
                    setDatas(responseJson.records);
                } else {
                    AsyncStorage.getItem('VelibData').then((value) => {
                        setDatas(JSON.parse(value));
                    })
                }
            }).catch(
            AsyncStorage.getItem('VelibData').then((value) => {
                setDatas(JSON.parse(value));
            }),
        );

    };
    default_favorite = async () => {
        datas.map(item => {
            if (AsyncStorage.getItem(item.recordid) == null){
                AsyncStorage.setItem(item.recordid, 'false')
                console.log(AsyncStorage.getItem(item.recordid))
            }
        })
    };
    _getPosition = async () => {
        await navigator.geolocation.getCurrentPosition(info => {
                setPosition(info.coords);
                if (datas == null) {
                    this._storeData()
                }
            },
        );
    };
    useEffect(() => {
        this._getPosition()
    }, [position]);
    return <GeolocContext.Provider
        value={{position, setPosition, datas, setDatas}}>{props.children}</GeolocContext.Provider>
};

