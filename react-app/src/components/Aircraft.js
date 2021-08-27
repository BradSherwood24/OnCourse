import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AircraftForm from './newAircraft'


function Aircraft({ user }) {
    const dispatch = useDispatch()
    const current_aircraft = useSelector(state => state.session.user.aircraft)
    const [newAircraft, setNewAircraft] = useState(false)

    useEffect(() => {
    }, [dispatch]);

    const aircraftList = current_aircraft.map((aircraft) => {
        aircraft = JSON.parse(aircraft)
        return (
          <li key={aircraft.id}>
            <NavLink to={`/aircraft/${aircraft.id}`}>{aircraft.name}</NavLink>
          </li>
        );
      });

    return (
        <div className='aircraft'>
            <h2>Your Aircraft</h2>
            <button onClick={e => setNewAircraft(!newAircraft)}>+</button>
            {newAircraft &&
                <AircraftForm user={user} />
            }
            <ul>{aircraftList}</ul>
        </div>
    );
}
export default Aircraft;
