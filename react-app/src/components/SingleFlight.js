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
        return(
            <li>{stop}</li>
        )
    })

    return (
        <div className='flight_div' onClick={closeForm}>
            <div className='flight'>
                <h1>{flight.name}</h1>
                <button className='delete_flight_button' onClick={(e) => onDelete(e)}>delete</button>
                <button className='close_flight_button' onClick={closeForm}>X</button>
            <div>
                <ul>
                    {airports.split(' ')[0]}
                </ul>
            </div>
            </div>

        </div>
    )
}



export default SingleFlight;
