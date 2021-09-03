import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WiDayCloudy } from "react-icons/wi";
import { WiFahrenheit } from "react-icons/wi";
import { refresh } from '../store/session';
import './weather.css'
import staticRadar from '../images/staticRadar.png'

function Weather() {
    const dispatch = useDispatch()


    useEffect(async () => {
    }, []);



    return (
        <div className='weather_container'>
            <div className='weather_header'>
                <div className='weather_icon'>
                    <WiDayCloudy size={52}/>
                </div>
                <h2>Grand Rapids</h2>
                <h2 className='weather_temp'>72°</h2>
            </div>
            <div className='weather_radar_div'>
                <img className='weather_radar_img' src={staticRadar}></img>
            </div>

        </div>
    );
}
export default Weather;
