import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useParams, useHistory } from 'react-router-dom';
import FlightForm from './FlightForm'
import SingleFlight from './SingleFlight'
import { refresh } from '../store/session';

import './flights.css'

function Flights({ user }) {
    const dispatch = useDispatch()
    const [newFlight, setNewFlight] = useState(false)
    const [flight, setFlight] = useState({})
    const [flight_id, setFlight_id] = useState(1)
    const { Id } = useParams();
    const current_flights = useSelector(state => state.session.user.flights)
    const flightState = useSelector(state => state.flight)

    useEffect(async () => {
        setNewFlight(false)
        await dispatch(refresh(user.id))
    }, [flightState]);

    useEffect(() => {
        current_flights.forEach((flight) => {
            flight = JSON.parse(flight)
            if (flight.id === flight_id) {
                setFlight(flight)
            }
        })
    },[current_flights])

    const flight_click = (flight) => {
        setFlight(flight)
        setFlight_id(flight.id)
    }

    const flightList = current_flights.map((flight) => {
        flight = JSON.parse(flight)
        return (
            <li key={flight.id} className='flight_list' onClick={() => flight_click(flight)}>
                {flight.name}
            </li>
        );
    });

    const closeForm = () => {
        setNewFlight(false)
        setFlight({})
    }

    return (
        <div className='flights'>
            <h2>Your flights</h2>
            <button onClick={e => setNewFlight(!newFlight)}>+</button>
            {newFlight &&
            <FlightForm user={user} closeForm={closeForm} />
            }
            {flight.name &&
                <SingleFlight flight={flight} closeForm={closeForm} />
            }
            <div className='List'>
                <ul>{flightList}</ul>
            </div>
        </div>
    );
}
export default Flights;
