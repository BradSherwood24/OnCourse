import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getAircrafts} from '../store/aircraft'
import AircraftForm from './newAircraft'


function Aircraft({ user }) {
    const dispatch = useDispatch()
    const [newAircraft, setNewAircraft] = useState(false)

    useEffect(() => {
        dispatch(getAircrafts(user.id))
    }, [dispatch]);

    const aircraft = () => {
        return {

        }
    }

    return (
        <div className='aircraft'>
            <h2>Your Aircraft</h2>
            <button onClick={e => setNewAircraft(!newAircraft)}>+</button>
            {newAircraft &&
            <AircraftForm user={user} />
            }
            <ul>
                {}
                <li>
                    <div>

                    </div>
                </li>
                <li>
                    <strong>Name</strong> {user.full_name}
                </li>
                <li>
                    <strong>Email</strong> {user.email}
                </li>
            </ul>
        </div>
    );
}
export default Aircraft;
