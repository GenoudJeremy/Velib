import React from 'react'
import { GeolocConsumer } from './Geoloc'

export default class Home extends React.Component{
    render() {
        return (
            <GeolocConsumer>
                {props => {
                    return <div>{props.coords.longitude}</div>
                }}
            </GeolocConsumer>
        )
    }
};
