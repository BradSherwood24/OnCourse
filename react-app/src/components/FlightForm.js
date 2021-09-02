import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { createFlight } from '../store/flight';
import './flightForm.css'

const FlightForm = ({ user, flight, closeForm }) => {
    const user_id = user.id
    const [errors, setErrors] = useState([])
    const [aircraft_id, setAircraft_id] = useState(0);
    const [aircraftList, setAircraftList] = useState([])
    const [name, setName] = useState('');
    const [departingAirport, setDepartingAirport] = useState('')
    const [arrivingAirport, setArrivingAirport] = useState('');
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('')
    const [distance, setDistance] = useState('')
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!flight) {
            const data = await dispatch(createFlight({
                user_id, aircraft_id, name, airports:`${departingAirport} ${arrivingAirport}`, departure, arrival, distance
            }));
            if (data) {
                setErrors(data)
            }
        }
    };



    useEffect(async () => {
        if (departingAirport.length === 4) {
            const res = await fetch('/api/aircraft/search', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    airport: departingAirport
                })
            })
            if (res.ok) {
                const aircraft = await res.json()
                setAircraftList(aircraft.aircraft)
            }
        } else {
            setAircraftList([])
        }
    }, [departingAirport])

    const selectAircraft = aircraftList.map((aircraft) => {
        return (
            <div key={aircraft.id} onClick={() => setAircraft_id(aircraft.id)}>
                <img className='flight_form_aircraft_img' src={aircraft.cover_img}></img>
            </div>
        )
    })




    return (
        <div className='flight_form_div'>
            <form onSubmit={e => onSubmit(e)} className='flight_form'>
                <h1>New Flight</h1>
                <div>
                    <label>Name of Flight</label>
                    <input
                        type='text'
                        onChange={e => setName(e.target.value)}
                        value={name}
                    >
                    </input>
                </div>
                <div>
                    <label>4 letter id of departing airport</label>
                    <input
                        type='text'
                        onChange={e => setDepartingAirport(e.target.value)}
                        value={departingAirport}
                    >
                    </input>
                </div>
                {aircraftList.length > 0 &&
                    <div>
                        <h3>Select Aircraft</h3>
                        {selectAircraft}
                    </div>
                }
                <div>
                    <label>4 letter id of arriving airport</label>
                    <input
                        type='text'
                        onChange={e => setArrivingAirport(e.target.value)}
                        value={arrivingAirport}
                    >
                    </input>
                </div>
                <div>
                    <label>Departure Time</label>
                    <input
                        type='text'
                        onChange={e => setDeparture(e.target.value)}
                        value={departure}
                    >
                    </input>
                </div>
                <div>
                    <label>Arrival Time</label>
                    <input
                        type='text'
                        onChange={e => setArrival(e.target.value)}
                        value={arrival}
                    >
                    </input>
                </div>
                <div>
                    <label>distance </label>
                    <input
                        type='number'
                        onChange={e => setDistance(e.target.value)}
                        value={distance}
                    >
                    </input>
                </div>
                <button type='submit'>submit</button>
                <button onClick={closeForm}>close</button>
            </form>
        </div>
    );
};

export default FlightForm;
