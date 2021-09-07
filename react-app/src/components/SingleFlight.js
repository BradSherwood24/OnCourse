import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';
import { deleteFlight, updateFlight } from '../store/flight';
import FlightForm from './FlightForm';
import './singleFlight.css'

function SingleFlight({ flight, closeForm, user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const flights = useSelector((state) => state.session.user.flights)
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
    const [addStop, setAddStop] = useState(false)
    const [newStop, setNewStop] = useState('')
    const [errors, setErrors] = useState([])
    const [airportLists, setAirportList] = useState([])
    const airports = flight.airports

    useEffect(() => {
        setName(flight.name)
    }, [flight])

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

    useEffect(async () => {
        const res = await fetch('/api/aircraft/airports')
        if (res.ok) {
            const airports = await res.json()
            setAirportList(airports.airports)
            setDepartingAirport(airports.airports[0])
        }
    }, [])


    const onDelete = async (e) => {
        e.preventDefault()
        const res = await dispatch(deleteFlight(flight.id))
        closeForm()
    }

    const stops = airports.split(' ').map((stop) => {
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

    const selectAircraft = aircraftList.map((aircraft) => {
        return (
            <div key={aircraft.id} className={aircraft.id === aircraft_id? `flight_form_aircraft_div_active`: 'flight_form_aircraft_div'} onClick={() => setAircraft_id(aircraft.id)}>
                <img className={'flight_form_aircraft_img'} src={aircraft.cover_img}></img>
                <div>
                <h2>{aircraft.tail_number}</h2>
                <h3>${aircraft.price}/h</h3>
                </div>
            </div>
        )
    })



    return (
        <div className='flight_div'>
            <div className='flight'>
                <div className='flight_header'>
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
                    <div className='flight_header_buttons'>
                        <button className='delete_flight_button' onClick={(e) => onDelete(e)}>delete</button>
                        <button className='delete_flight_button'  onClick={() => setUpdateFlightInfo(true)}>edit</button>
                        <button className='close_flight_button' onClick={closeForm}>X</button>
                    </div>
                </div>
                <div className='flight_stops_and_aircraft'>
                    <div className='flight_stops_div'>
                        <div>
                            <h2>Stops</h2>
                            {addStop &&
                                <>
                                    <input
                                        value={newStop}
                                        onChange={(e) => setNewStop(e.target.value)}></input>
                                </>
                            }
                            {/* <button onClick={() => setAddStop(!addStop)}>+</button> */}
                        </div>
                        <ul>
                            {stops}
                        </ul>
                    </div>
                    <div className='flight_aircraft_div'>
                        <h2 className='flight_aircraft_h2'>Aircraft</h2>
                        <div className='flight_aircraft_info'>
                            <img className='flight_aircraft_img' src={flight.aircraft.cover_img}></img>
                            <div className='flight_aircraft_info_div'>
                                <h2>{flight.aircraft.tail_number}</h2>
                                <h3>{flight.aircraft.year} {flight.aircraft.manufacturer} {flight.aircraft.name}</h3>
                                <h4>Price: ${flight.aircraft.price}/h</h4>
                            </div>
                        </div>
                    </div>
                </div>
                {!updateFlightInfo &&
                    <div className='flight_bottom'>
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
                        <div>
                            <h2>Approximate Cost: ${ Math.round(((flight.distance / flight.aircraft.cruise_speed) + .15) * flight.aircraft.price)}.00</h2>
                        </div>
                    </div>
                }
                {updateFlightInfo &&
                    // <FlightForm flight={flight} user={user} closeForm={close} />
                    <div className='flight_form_div'>
                    <form onSubmit={e => submit_update(e)} className='flight_form'>
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
                }
            </div>
        </div>
    )
}



export default SingleFlight;
