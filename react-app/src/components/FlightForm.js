import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { createFlight } from '../store/flight';
import './flightForm.css'

const FlightForm = ({ user, flight, closeForm }) => {
    const user_id = user.id
    const [errors, setErrors] = useState([])
    const [aircraft_id, setAircraft_id] = useState(7);
    const [name, setName] = useState('');
    const [airports, setAirports] = useState(['KGRR']);
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('')
    const [distance, setDistance] = useState('')
    const [save, setSave] = useState('')
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();
        if(!flight) {
            const data = await dispatch(createFlight({
                user_id, aircraft_id, name, airports, departure, arrival, distance
            }));
            if (data) {
                setErrors(data)
            }
        }else {
            // const data = await dispatch(updateAircraft({
            //     user_id, price, manufacturer,
            //     name, description, cover_img, avionics,
            //     ifr_cert, need_IR, need_CSEL, need_CMEL,
            //     need_ATP, need_CFI, need_CFII, need_MEI,
            //     need_complex, need_performance, airport,
            //     type, gph, fuel_capacity, cruise_speed,
            //     usable_load, seats, poh
            // }, aircraft.id));
            // if (data) {
            //     setErrors(data)
            // }
        }
    };

    useEffect(() => {
        // if(flight) {
        //     setPrice(aircraft.price)
        //     setManufacturer(aircraft.manufacturer)
        //     setName(aircraft.name)
        //     setDescription(aircraft.description)
        //     setCover_img(aircraft.cover_img)
        //     setAvionics(aircraft.avionics)
        //     setAirport(aircraft.airport)
        //     setpoh(aircraft.poh)
        //     setType(aircraft.type)
        //     setgph(aircraft.gph)
        //     setFuel_capacity(aircraft.fuel_capacity)
        //     setCruise_speed(aircraft.cruise_speed)
        //     setSeats(aircraft.usable_load)
        //     setSeats(aircraft.seats)
        //     setIfr_cert(aircraft.ifr_cert)
        //     setNeed_IR(aircraft.need_IR)
        //     setNeed_CMEL(aircraft.need_CSEL)
        //     setNeed_CMEL(aircraft.need_CMEL)
        //     setNeed_ATP(aircraft.need_ATP)
        //     setNeed_CFI(aircraft.need_CFI)
        //     setNeed_CFII(aircraft.need_CFII)
        //     setNeed_MEI(aircraft.need_MEI)
        //     setNeed_complex(aircraft.need_complex)
        //     setNeed_performance(aircraft.need_performance)
        // }
    }, [flight])


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
