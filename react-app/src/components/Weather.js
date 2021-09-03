import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refresh } from '../store/session';

function Weather() {
    const dispatch = useDispatch()


    useEffect(async () => {
    }, []);



    return (
        <div className='weather_container'>
            <div className='weather_header'>
                
            </div>

        </div>
    );
}
export default Weather;
