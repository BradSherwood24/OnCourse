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
      <div key={aircraft.id} className='aircraft_list_div' onClick={() => window.location = `/aircraft/${aircraft.id}`}>
          <img className="aircraft_list_img" src={aircraft.cover_img}></img>
          <h2 className='aircraft_list_tail_number'>{aircraft.tail_number}</h2>
      </div>
    );
  });

  const closeForm = () => {
    setNewAircraft(false)
  }

  return (
    <div className='aircraft'>
      <h2 className='aircraft_label'>Your Aircraft</h2>
      <button className='aircraft_plus_button' onClick={e => setNewAircraft(!newAircraft)}>+</button>
      {newAircraft &&
        <AircraftForm user={user} closeForm={closeForm} />
      }
      <div className='List'>
        {aircraftList}
      </div>
    </div>
  );
}
export default Aircraft;
