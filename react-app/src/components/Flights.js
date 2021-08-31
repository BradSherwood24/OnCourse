import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useParams, useHistory } from 'react-router-dom';
import FlightForm from './FlightForm'
import SingleFlight from './SingleFlight'

function Flights({ user }) {
    const dispatch = useDispatch()
    const [newFlight, setNewFlight] = useState(false)
    const [flight, setFlight] = useState({})
    const { Id } = useParams();
    const current_flights = useSelector(state => state.session.user.flights)

    useEffect(() => {

    }, [dispatch]);

    const flightList = current_flights.map((flight) => {
        flight = JSON.parse(flight)
        return (
            <li key={flight.id} className='flight_list' onClick={() => setFlight(flight)}>
                {flight.name}
            </li>
        );
    });

    const closeForm = () => {
        setNewFlight(false)
        setFlight({})
    }

    return (
        <div className='aircraft'>
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
