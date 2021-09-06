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
    }, [current_flights])

    const flight_click = (flightToSet) => {
        setFlight(flightToSet)
        setFlight_id(flightToSet.id)
        console.log(flight)
    }

    const flightList = current_flights.map((flight) => {
        flight = JSON.parse(flight)
        return (
            <div key={flight.id} className='flight_list' onClick={() => flight_click(flight)}>
                {flight.name}
            </div>
        );
    });

    const closeForm = () => {
        setNewFlight(false)
        setFlight({})
    }

    return (
        <div className='flights'>
            {/* <div className='flights_header'> */}
                <h2>Your flights</h2>
                <button className='flights_plus_button' onClick={e => setNewFlight(!newFlight)}>+</button>
            {/* </div> */}
            {newFlight &&
                <FlightForm user={user} closeForm={closeForm} />
            }
            {flight.id &&
                <SingleFlight flight={flight} closeForm={closeForm} />
            }
            <div className='List'>
                {flightList}
            </div>
        </div>
    );
}
export default Flights;
