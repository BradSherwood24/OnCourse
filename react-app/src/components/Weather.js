import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WiDaySunny } from "react-icons/wi";
import { WiDayCloudy } from "react-icons/wi";
import { WiDayRain } from "react-icons/wi";
import { WiDayStormShowers } from "react-icons/wi";
import { WiDaySnow } from "react-icons/wi";
import { WiNightAltCloudy } from "react-icons/wi";
import { WiNightAltHail } from "react-icons/wi";
import { WiThermometer } from "react-icons/wi";
import { WiThermometerExterior } from "react-icons/wi";
import { refresh } from '../store/session';
import './weather.css'
import staticRadar from '../images/radar2.png'

function Weather({ user }) {
    const dispatch = useDispatch()
    const [temp, setTemp] = useState('')
    const [weatherIcon, setWeatherIcon] = useState(0)
    const [reactIcon, setReactIcon] = useState('WiDaySunny')

    useEffect(async () => {
            // navigator.geolocation.getCurrentPosition(async function (position) {
            //     const geoLocate = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=BkLN6NrIOv12CwE61N5G5m6dFaZWlUtK&q=${position.coords.latitude},${position.coords.longitude}`)
            //     const apiKey = await geoLocate.json()
            //     const weather = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${apiKey.Key}?apikey=BkLN6NrIOv12CwE61N5G5m6dFaZWlUtK`)
            //     const current_weather = await weather.json()
            //     setTemp(current_weather[0].Temperature.Imperial.Value)
            //     setWeatherIcon(current_weather[0].WeatherIcon)
            // });
            if(temp === '') {
                 const geoLocate = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=BkLN6NrIOv12CwE61N5G5m6dFaZWlUtK&q=42.978387,-86.2200089`)
                 const apiKey = await geoLocate.json()
                 const weather = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${apiKey.Key}?apikey=BkLN6NrIOv12CwE61N5G5m6dFaZWlUtK`)
                 const current_weather = await weather.json()
                 setTemp(current_weather[0].Temperature.Imperial.Value)
                 setWeatherIcon(current_weather[0].WeatherIcon)
            }
    }, []);



    return (
        <div className='weather_container'>
            <div className='weather_header'>
                <div className='weather_icon'>
                    {weatherIcon > 0 && weatherIcon < 5 &&
                        <WiDaySunny size={52} />
                    }
                    {weatherIcon >= 5 && weatherIcon <= 11 &&
                        <WiDayCloudy size={52} />
                    }
                    {weatherIcon >= 12 && weatherIcon <= 14 &&
                        <WiDayRain size={52} />
                    }
                    {weatherIcon >= 15 && weatherIcon <= 17 &&
                        <WiDayStormShowers size={52} />
                    }
                    {weatherIcon === 18 &&
                        <WiDayRain size={52} />
                    }
                    {weatherIcon === 30 &&
                        <WiThermometer size={52} />
                    }
                    {weatherIcon === 31 &&
                        <WiThermometerExterior size={52} />
                    }
                    {weatherIcon >= 19 && weatherIcon <= 29 &&
                        <WiDaySnow size={52} />
                    }
                    {weatherIcon >= 32 && weatherIcon <= 38 &&
                        <WiNightAltCloudy size={52} />
                    }
                    {weatherIcon >= 39 && weatherIcon <= 44 &&
                        <WiNightAltHail size={52} />
                    }
                </div>
                <h2>{user.home_airport}</h2>
                <h2 className='weather_temp'>{temp}°</h2>
            </div>
            <div className='weather_radar_div'>
                {/* <img className='weather_radar_img' src={staticRadar}></img> */}
            </div>

        </div>
    );
}
export default Weather;
