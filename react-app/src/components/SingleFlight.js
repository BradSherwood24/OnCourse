import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';
import { deleteFlight } from '../store/flight';
import './singleFlight.css'

function SingleFlight({ flight, closeForm }) {
    const dispatch = useDispatch();
    const history = useHistory();
    // flight = JSON.parse(flight)
    const airports = flight.airports
    const [aircraft, setAircraft] = useState({});
    const [update, setUpdate] = useState(false)
    const [img, setImg] = useState(0)
    const [newImg, setNewImg] = useState('')
    const [add, setAdd] = useState(false)
    const user = useSelector(state => state.session.user)
    const [images, setImages] = useState([])

    const onDelete = async (e) => {
        e.preventDefault()
        const res = await dispatch(deleteFlight(flight.id))
    }

    const stops = airports.split(' ').map((stop) => {
        return (
            <li>{stop}</li>
        )
    })

    return (
        <div className='flight_div'>
            <div className='flight'>
                <h1>{flight.name}</h1>
                <button className='delete_flight_button' onClick={(e) => onDelete(e)}>delete</button>
                <button className='close_flight_button' onClick={closeForm}>X</button>
                <div>
                    <h2>Stops</h2>
                    <ul>
                        {stops}
                    </ul>
                </div>
                <div>
                    <h2>Flight Information</h2>
                    <div className='flight_aircraft_div'>
                        <img className='flight_aircraft_img' src={flight.aircraft.cover_img}></img>
                        <h4>{flight.aircraft.manufacturer} {flight.aircraft.name}</h4>
                        <h4>Price: ${flight.aircraft.price}/h</h4>
                    </div>
                    <p>
                        <strong>Distance</strong> {flight.distance}NM
                    </p>
                    <p>
                        <strong>Departure</strong> {flight.departure}
                    </p>
                    <p>
                        <strong>Arrival</strong> {flight.arrival}
                    </p>


                </div>
            </div>
        </div>
    )
}



export default SingleFlight;
