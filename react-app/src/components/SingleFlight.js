import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';
import { deleteFlight, updateFlight } from '../store/flight';
import './singleFlight.css'

function SingleFlight({ flight, closeForm }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user_id = useSelector((state) => state.session.user.id)
    const [aircraft_id, setAircraft_id] = useState(flight.aircraft_id);
    const [aircraftList, setAircraftList] = useState([])
    const [name, setName] = useState(flight.name);
    const [departingAirport, setDepartingAirport] = useState(flight.airports.split(' ')[0])
    const [arrivingAirport, setArrivingAirport] = useState(flight.airports.split(' ')[flight.airports.split(' ').length - 1]);
    const [departure, setDeparture] = useState(flight.departure);
    const [arrival, setArrival] = useState(flight.arrival)
    const [distance, setDistance] = useState(flight.distance)
    const [save, setSave] = useState(flight.save)
    const [updateName, setUpdateName] = useState(false)
    const [updateFlightInfo, setUpdateFlightInfo] = useState(false)
    const airports = flight.airports


    const onDelete = async (e) => {
        e.preventDefault()
        const res = await dispatch(deleteFlight(flight.id))
    }

    const stops = airports.split(' ').map((stop) => {
        console.log(airports)
        return (
            <li key={stop}>{stop}</li>
        )
    })

    const submit_update = async (e) => {
        e.preventDefault();
        const flight_id = flight.id
        const data = await dispatch(updateFlight({
            user_id, aircraft_id, name, airports: `${departingAirport} ${arrivingAirport}`, departure, arrival, distance, flight_id, save
        }));
        setUpdateFlightInfo(false)
        setUpdateName(false)
    }

    return (
        <div className='flight_div'>
            <div className='flight'>
                {!updateName &&
                    <h1 onClick={() => setUpdateName(true)}>{flight.name}</h1>
                }
                {updateName &&
                    <form onSubmit={(e) => submit_update(e)}>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}>
                        </input>
                        <button type='submit'>save</button>
                        <button onClick={() => setUpdateName(false)}>cancel</button>
                    </form>
                }
                <button className='delete_flight_button' onClick={(e) => onDelete(e)}>delete</button>
                <button className='close_flight_button' onClick={closeForm}>X</button>
                <div>
                    <h2>Stops</h2>
                    <ul>
                        {stops}
                    </ul>
                </div>
                <div className='flight_aircraft_div'>
                    <h2>aircraft</h2>
                    <img className='flight_aircraft_img' src={flight.aircraft.cover_img}></img>
                    <h4>{flight.aircraft.manufacturer} {flight.aircraft.name}</h4>
                    <h4>Price: ${flight.aircraft.price}/h</h4>
                </div>
                {!updateFlightInfo &&
                    <div onClick={() => setUpdateFlightInfo(true)}>
                        <h2>Flight Information</h2>
                        <p>
                            <strong>Distance</strong> {flight.distance}NM
                        </p>
                        <p>
                            <strong>Departure</strong> {flight.departure}
                        </p>
                        <p>
                            <strong>Arrival</strong> {flight.arrival}
                        </p>
                    </div>
                }
                {updateFlightInfo &&
                    <div onClick={() => setUpdateFlightInfo(false)}>
                        <h2>Flight Information</h2>
                        <div className='flight_aircraft_div'>
                            <img className='flight_aircraft_img' src={flight.aircraft.cover_img}></img>
                            <h4>{flight.aircraft.manufacturer} {flight.aircraft.name}</h4>
                            <h4>Price: ${flight.aircraft.price}/h</h4>
                        </div>
                        <p>
                            <strong>Distance</strong> {flight.distance}NM
                        </p>
                        <p>
                            <strong>Departure</strong> {flight.departure}
                        </p>
                        <p>
                            <strong>Arrival</strong> {flight.arrival}
                        </p>
                    </div>
                }
            </div>
        </div>
    )
}



export default SingleFlight;
