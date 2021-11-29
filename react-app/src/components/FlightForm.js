import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { createFlight } from '../store/flight';
import './flightForm.css'

const FlightForm = ({ user, flight, closeForm }) => {
    const user_id = user.id
    const [errors, setErrors] = useState([])
    const [aircraft_id, setAircraft_id] = useState(0);
    const [aircraftList, setAircraftList] = useState([])
    const [airportLists, setAirportList] = useState([])
    const [name, setName] = useState('');
    const [departingAirport, setDepartingAirport] = useState('')
    const [arrivingAirport, setArrivingAirport] = useState('');
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('')
    const [distance, setDistance] = useState('')
    const dispatch = useDispatch();


    const onSubmit = async (e) => {
        e.preventDefault();
        const newErrors = []
        if (!aircraft_id) {
            newErrors.push('You must select an aircraft')
        }
        if (!name) {
            newErrors.push('Must have a name')
        }
        if (!departingAirport) {
            newErrors.push('Must have a departing airport')
        }
        if (!arrivingAirport) {
            newErrors.push('Must have a arriving airport')
        }
        if (!departure) {
            newErrors.push('Must have a departure time')
        }
        if (!arrival) {
            newErrors.push('Must have a arrival time')
        }
        if (!distance) {
            newErrors.push('Must have a distance')
        }
        if (newErrors.length) {
            setErrors(newErrors)
            return
        }
        console.log('hello')
        if (!flight) {
            const data = await dispatch(createFlight({
                user_id, aircraft_id, name, airports: `${departingAirport} ${arrivingAirport}`, departure, arrival, distance
            }));
            if (data) {
                setErrors(data)
            }
        }
    };

    useEffect(async () => {
        const res = await fetch('/api/aircraft/airports')
        if (res.ok) {
            const airports = await res.json()
            setAirportList(airports.airports)
            setDepartingAirport(airports.airports[0])
        }
    }, [])



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
            <div key={aircraft.id} className={aircraft.id === aircraft_id ? `flight_form_aircraft_div_active` : 'flight_form_aircraft_div'} onClick={() => setAircraft_id(aircraft.id)}>
                <img className={'flight_form_aircraft_img'} src={aircraft.cover_img}></img>
                <div>
                    <h2>{aircraft.tail_number}</h2>
                    <h3>${aircraft.price}/h</h3>
                </div>
            </div>
        )
    })





    return (
        <>
            <div className='flight_form_div'>
                <form onSubmit={e => onSubmit(e)} className='flight_form'>
                    <h1>New Flight</h1>
                    <div>
                        {errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                        ))}
                    </div>
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
                        <label>select departing airport</label>
                        <select
                            type='text'
                            onChange={e => setDepartingAirport(e.target.value)}
                            value={departingAirport}
                        >
                            {airportLists?.map((airport) => {
                                return (
                                    <option value={airport}>{airport}</option>
                                )
                            })}

                        </select>
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
        </>
    );
};

export default FlightForm;
