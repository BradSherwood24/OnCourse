import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useParams, useHistory } from 'react-router-dom';
import FlightForm from './FlightForm'

function Flights({ user }) {
    const dispatch = useDispatch()
    const [newFlight, setNewFlight] = useState(false)
    const { Id } = useParams();
    const current_flights = useSelector(state => state.session.user.flights)

    useEffect(() => {

    }, [dispatch]);

    const flightList = current_flights.map((flight) => {
        flight = JSON.parse(flight)
        return (
            <li key={flight.id} className='aircraft_list'>
                <NavLink to={`/aircraft/${flight.id}`}>{flight.name}</NavLink>
            </li>
        );
    });

    const closeForm = () => {
        setNewFlight(false)
    }

    return (
        <div className='aircraft'>
            <h2>Your flights</h2>
            <button onClick={e => setNewFlight(!newFlight)}>+</button>
            {newFlight &&
            <FlightForm user={user} closeForm={closeForm} />
            }
            <div className='List'>
                <ul>{flightList}</ul>
            </div>
        </div>
    );
}
export default Flights;
