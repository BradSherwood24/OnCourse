import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/session';
import { useParams, useHistory } from 'react-router-dom';
import { deleteAircraft } from '../../store/aircraft';
import AircraftForm from '../newAircraft'

function SingleAircraft() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [aircraft, setAircraft] = useState({});
  const [update, setUpdate] = useState(false)
  const user = useSelector(state => state.session.user)
  const { Id } = useParams();

  useEffect(() => {
    if (!Id) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/aircraft/aircraft/${Id}`);
      const json = await response.json();
      setAircraft(json);
    })();
  }, [Id]);

  if (!aircraft) {
    return null;
  }

  const handleDeleteSubmit = async e => {
    e.preventDefault()
    await dispatch(deleteAircraft(Id))
    history.push('/dashboard')
  }


  return (
    <div>
      <button onClick={handleDeleteSubmit}>
        Delete
      </button>
      <button onClick={e => setUpdate(!update)}>
        Edit
      </button>
      {update &&
      <AircraftForm aircraft={aircraft} user={user}/>
      }
      <ul>
        <li>
          <strong>User Id</strong> {Id}
        </li>
        <li>
          <strong>Username</strong> {aircraft.name}
        </li>
        <li>
          <strong>Email</strong> {aircraft.email}
        </li>
      </ul>
    </div>
  );
}
export default SingleAircraft;
