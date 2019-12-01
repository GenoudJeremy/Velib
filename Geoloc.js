import React, {createContext, useState, useEffect} from 'react';
import {AsyncStorage} from "react-native";

export const GeolocContext = createContext('');
export const GeolocProvider = props => {
    const [position, setPosition] = useState(null);
    const [datas, setDatas] = useState(null);
    const [fav, setFav] = useState(null)
    _storeData = async () => {
        await fetch('https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&geofilter.distance=' + position.latitude + '%2C' + position.longitude + '%2C' + 1000)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.errorcode != 10005) {
                    AsyncStorage.setItem('VelibData', JSON.stringify(responseJson.records));
                    setDatas(responseJson.records);
                    this.default_favorite(responseJson.records)
                } else {
                    AsyncStorage.getItem('VelibData').then((value) => {
                        setDatas(JSON.parse(value));
                        this.default_favorite(JSON.parse(value));
                    })
                }
            }).catch(
            AsyncStorage.getItem('VelibData').then((value) => {
                setDatas(JSON.parse(value));
            }),
        );

    };
    default_favorite = async (data) => {
        let favoris = []
        data.map(item => {
            if (AsyncStorage.getItem(item.recordid) === 'false' || AsyncStorage.getItem(item.recordid) === 'true'){

            } else {
                AsyncStorage.setItem(item.recordid, 'false')
            }
            favoris.push([item.recordid, AsyncStorage.getItem(item.recordid)])
        });
        setFav(favoris)
    };
    _getPosition = async () => {
        await navigator.geolocation.getCurrentPosition(info => {
                setPosition(info.coords);
                if (datas == null) {
                    this._storeData();
                }
            },
        );
    };
    useEffect(() => {
        this._getPosition()
    }, [position]);
    return <GeolocContext.Provider
        value={{position, setPosition, datas, setDatas, fav, setFav}}>{props.children}</GeolocContext.Provider>
};

