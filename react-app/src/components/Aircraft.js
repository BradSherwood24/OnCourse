import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { refresh } from '../store/session';
import AircraftForm from './newAircraft'
import './Aircraft.css'


function Aircraft({ user }) {
  const dispatch = useDispatch()
  const current_aircraft = useSelector(state => state.session.user.aircraft)
  const [newAircraft, setNewAircraft] = useState(false)
  const aircrafts = useSelector((state) => state.aircraft)

  useEffect(() => {
      closeForm()
      dispatch(refresh(user.id))
  }, [aircrafts])

  const aircraftList = current_aircraft.map((aircraft) => {
    aircraft = JSON.parse(aircraft)
    return (
      <li key={aircraft.id} className='aircraft_list'>
        <NavLink to={`/aircraft/${aircraft.id}`}>{aircraft.name}</NavLink>
      </li>
    );
  });

  const closeForm = () => {
    setNewAircraft(false)
  }

  return (
    <div className='aircraft'>
      <h2>Your Aircraft</h2>
      <button onClick={e => setNewAircraft(!newAircraft)}>+</button>
      {newAircraft &&
        <AircraftForm user={user} closeForm={closeForm} />
      }
      <div className='List'>
        <ul>{aircraftList}</ul>
      </div>
    </div>
  );
}
export default Aircraft;
