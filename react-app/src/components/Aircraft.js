import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAircrafts } from '../store/aircraft'
import { NavLink } from 'react-router-dom';
import AircraftForm from './newAircraft'


function Aircraft({ user }) {
    const dispatch = useDispatch()
    const current_aircraft = useSelector(state => state.aircraft)
    const [newAircraft, setNewAircraft] = useState(false)

    useEffect(() => {
        dispatch(getAircrafts(user.id))
    }, [dispatch]);

    useEffect(() => {

    }, [current_aircraft])

    const aircraft = () => {
        Object.keys(current_aircraft)?.forEach((num) => {
            console.log(current_aircraft[num].id)
            return (
                <li key={current_aircraft[num].id}>
                    <NavLink to={`/aircraft/${current_aircraft[num].id}`}>{current_aircraft[num].name}</NavLink>
                </li>
            );
        })
    }


    return (
        <div className='aircraft'>
            <h2>Your Aircraft</h2>
            <button onClick={e => setNewAircraft(!newAircraft)}>+</button>
            {newAircraft &&
                <AircraftForm user={user} />
            }
            <ul>{aircraft}</ul>
        </div>
    );
}
export default Aircraft;
