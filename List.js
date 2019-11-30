import React, {useContext, useEffect} from 'react';
import {  View, Image, Button } from 'react-native'
import {GeolocContext} from "./Geoloc";
import { Dimensions} from "react-native-web";
import { useNavigation } from 'react-navigation-hooks';
import { getDistance } from "geolib";

export default () => {
    const position = useContext(GeolocContext);
    const pos = position.position;
    const datas = position.datas;
    let content = '';
    const {navigate} = useNavigation();
    if (pos != null && datas != null){
        return (
            <View style={{ flex: 1 }}>
                {datas.map((station) => (
                    <Button title={station.fields.station_name+' ('+getDistance(pos,{latitude: station.fields.geo[0],longitude: station.fields.geo[1],})+' m)'}
                            key={station.recordid}
                            onPress={() => {
                                navigate('Detailvelib', { info: station.fields })
                            }}

                    />))}
            </View>
        )
    } else {
        return(<View><Image source={require('./assets/loader.gif')} style={{width: Dimensions.get('window').width}}/></View>)
    }
}
