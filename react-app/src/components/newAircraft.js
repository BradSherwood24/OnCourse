import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { createAircraft, updateAircraft } from '../store/aircraft';
import './newAircraft.css'

const AircraftForm = ({ user, aircraft, closeForm }) => {
    const user_id = user.id
    const aircrafts = useSelector((state) => state.aircraft)
    const [errors, setErrors] = useState([])
    const [price, setPrice] = useState(100);
    const [manufacturer, setManufacturer] = useState('');
    const [name, setName] = useState('');
    const [year, setYear] = useState(2000);
    const [tail_number, setTail_number] = useState('');
    const [description, setDescription] = useState('');
    const [cover_img, setCover_img] = useState('');
    const [avionics, setAvionics] = useState('')
    const [airport, setAirport] = useState('')
    const [poh, setpoh] = useState('')
    const [type, setType] = useState('single-engine land')
    const [gph, setgph] = useState(10)
    const [fuel_capacity, setFuel_capacity] = useState(55)
    const [cruise_speed, setCruise_speed] = useState(105)
    const [usable_load, setUsable_load] = useState(900)
    const [seats, setSeats] = useState(4)
    const [ifr_cert, setIfr_cert] = useState(false)
    const [need_IR, setNeed_IR] = useState(false)
    const [need_CSEL, setNeed_CSEL] = useState(false)
    const [need_CMEL, setNeed_CMEL] = useState(false)
    const [need_ATP, setNeed_ATP] = useState(false)
    const [need_CFI, setNeed_CFI] = useState(false)
    const [need_CFII, setNeed_CFII] = useState(false)
    const [need_MEI, setNeed_MEI] = useState(false)
    const [need_complex, setNeed_complex] = useState(false)
    const [need_performance, setNeed_performance] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {

    }, [errors])

    const onSubmit = async (e) => {
        e.preventDefault();
        const newErrors = []
        if (!name) {
            newErrors.push('Must have a name')
        }
        if (!manufacturer) {
            newErrors.push('Must have a manufacturer')
        }
        if (!price) {
            newErrors.push('Must have a price')
        }
        if (!tail_number) {
            newErrors.push('Must have a tail number')
        }
        if (!description) {
            newErrors.push('Must have a description')
        }
        if (!cover_img) {
            newErrors.push('Must have a cover image')
        }
        if (!airport) {
            newErrors.push('Must have a base airport')
        }
        if (!gph) {
            newErrors.push('Must have a gph')
        }
        if (!fuel_capacity) {
            newErrors.push('Must have a fuel capacity')
        }
        if (!cruise_speed) {
            newErrors.push('Must have a cruise speed')
        }
        if (!usable_load) {
            newErrors.push('Must have a usable load')
        }
        if (!seats) {
            newErrors.push('Must have number of seats')
        }
        if (newErrors.length) {
            console.log('hello')
            setErrors(newErrors)
            return
        }
        if (!aircraft) {
            const data = await dispatch(createAircraft({
                user_id, price, manufacturer,
                name, year, tail_number, description, cover_img, avionics,
                ifr_cert, need_IR, need_CSEL, need_CMEL,
                need_ATP, need_CFI, need_CFII, need_MEI,
                need_complex, need_performance, airport,
                type, gph, fuel_capacity, cruise_speed,
                usable_load, seats, poh
            }));
            if (data) {
                setErrors(data)
            }
        } else {
            const data = await dispatch(updateAircraft({
                user_id, price, manufacturer,
                name, year, tail_number, description, cover_img, avionics,
                ifr_cert, need_IR, need_CSEL, need_CMEL,
                need_ATP, need_CFI, need_CFII, need_MEI,
                need_complex, need_performance, airport,
                type, gph, fuel_capacity, cruise_speed,
                usable_load, seats, poh
            }, aircraft.id));
            if (data) {
                setErrors(data)
            }
        }
    };

    useEffect(() => {
        if (aircraft) {
            setPrice(aircraft.price)
            setManufacturer(aircraft.manufacturer)
            setName(aircraft.name)
            setYear(aircraft.year)
            setTail_number(aircraft.tail_number)
            setDescription(aircraft.description)
            setCover_img(aircraft.cover_img)
            setAvionics(aircraft.avionics)
            setAirport(aircraft.airport)
            setpoh(aircraft.poh)
            setType(aircraft.type)
            setgph(aircraft.gph)
            setFuel_capacity(aircraft.fuel_capacity)
            setCruise_speed(aircraft.cruise_speed)
            setSeats(aircraft.usable_load)
            setSeats(aircraft.seats)
            setIfr_cert(aircraft.ifr_cert)
            setNeed_IR(aircraft.need_IR)
            setNeed_CMEL(aircraft.need_CSEL)
            setNeed_CMEL(aircraft.need_CMEL)
            setNeed_ATP(aircraft.need_ATP)
            setNeed_CFI(aircraft.need_CFI)
            setNeed_CFII(aircraft.need_CFII)
            setNeed_MEI(aircraft.need_MEI)
            setNeed_complex(aircraft.need_complex)
            setNeed_performance(aircraft.need_performance)
        }
    }, [aircraft])



    return (
        <div className='aircraft_form_div'>
            <form onSubmit={e => onSubmit(e)} className='aircraft_form'>
                <h1>New Aircraft</h1>
                <div className='inside_form'>
                    <div>
                        <div>
                            {errors.map((error, ind) => (
                                <div key={ind}>{error}</div>
                            ))}
                        </div>
                        <div>
                            <label>Price per Hour</label>
                            <input
                                type='number'
                                onChange={e => setPrice(e.target.value)}
                                value={price}
                            >
                            </input>
                        </div>
                        <div>
                            <label>Manufacturer</label>
                            <input
                                type='text'
                                onChange={e => setManufacturer(e.target.value)}
                                value={manufacturer}
                            >
                            </input>
                        </div>
                        <div>
                            <label>Model</label>
                            <input
                                type='text'
                                onChange={e => setName(e.target.value)}
                                value={name}
                            >
                            </input>
                        </div>
                        <div>
                            <label>Year</label>
                            <input
                                type='number'
                                onChange={e => setYear(e.target.value)}
                                value={year}
                            >
                            </input>
                        </div>
                        <div>
                            <label>Tail Number</label>
                            <input
                                type='text'
                                onChange={e => setTail_number(e.target.value)}
                                value={tail_number}
                            >
                            </input>
                        </div>
                        <div>
                            <div>
                                <label>Description</label>
                            </div>
                            <textarea
                                type='text'
                                onChange={e => setDescription(e.target.value)}
                                value={description}
                                className="description-textarea"
                            >
                            </textarea>
                        </div>
                        <div>
                            <label>Cover Image</label>
                            <input
                                type='text'
                                onChange={e => setCover_img(e.target.value)}
                                value={cover_img}
                            >
                            </input>
                        </div>
                        <div>
                            <label>Avionics</label>
                            <input
                                type='text'
                                onChange={e => setAvionics(e.target.value)}
                                value={avionics}
                            >
                            </input>
                        </div>
                        <div>
                            <label>Airport</label>
                            <input
                                type='text'
                                onChange={e => setAirport(e.target.value)}
                                value={airport}
                            >
                            </input>
                        </div>
                        <div>
                            <label>Link to POH</label>
                            <input
                                type='text'
                                onChange={e => setpoh(e.target.value)}
                                value={poh}
                            >
                            </input>
                        </div>
                    </div>
                    <div>
                        <h3>Performance</h3>
                        <div>
                            <label>Type</label>
                            <select
                                onChange={e => setType(e.target.value)}
                                value={type}
                            >
                                <option value='single-engine land'>Single-Engine Land</option>
                                <option value='multi-engine land'>Multi-Engine Land</option>
                                <option value='single-engine sea'>Single-Engine Sea</option>
                                <option value='multi-engine sea'>Multi-Engine Sea</option>
                                <option value='rotor'>Rotor Craft</option>
                            </select>
                        </div>
                        <div>
                            <label>Gallons Per Hour</label>
                            <input
                                type='number'
                                onChange={e => setgph(e.target.value)}
                                value={gph}
                            >
                            </input>
                        </div>
                        <div>
                            <label>fuel Capacity</label>
                            <input
                                type='number'
                                onChange={e => setFuel_capacity(e.target.value)}
                                value={fuel_capacity}
                            >
                            </input>
                        </div>
                        <div>
                            <label>Cruise speed</label>
                            <input
                                type='number'
                                onChange={e => setCruise_speed(e.target.value)}
                                value={cruise_speed}
                            >
                            </input>
                        </div>
                        <div>
                            <label>Usable Load</label>
                            <input
                                type='number'
                                onChange={e => setUsable_load(e.target.value)}
                                value={usable_load}
                            >
                            </input>
                        </div>
                        <div>
                            <label>Seats</label>
                            <input
                                type='number'
                                onChange={e => setSeats(e.target.value)}
                                value={seats}
                            >
                            </input>
                        </div>
                        <div>
                            <label>IFR Certified</label>
                            <input
                                type='checkbox'
                                onChange={e => setIfr_cert(e.target.value)}
                                value={ifr_cert}
                            >
                            </input>
                        </div>
                        <button type='submit'>submit</button>
                        <button onClick={closeForm}>close</button>
                    </div>
                </div>
                {/* <div>
                        <h3>Requirements to fly</h3>
                        <div>
                            <label>Need Instrument Rating</label>
                            <input
                                type='checkbox'
                                onChange={e => setNeed_IR(e.target.value)}
                                value={need_IR}
                            >
                            </input>
                        </div>
                        <div>
                            <label>Need CSEL</label>
                            <input
                                type='checkbox'
                                onChange={e => setNeed_CSEL(e.target.value)}
                                value={need_CSEL}
                            >
                            </input>
                        </div>
                        <div>
                            <label>Need CMEL</label>
                            <input
                                type='checkbox'
                                onChange={e => setNeed_CMEL(e.target.value)}
                                value={need_CMEL}
                            >
                            </input>
                        </div>
                        <div>
                            <label>Need ATP</label>
                            <input
                                type='checkbox'
                                onChange={e => setNeed_ATP(e.target.value)}
                                value={need_ATP}
                            >
                            </input>
                        </div>
                        <div>
                            <label>Need CFI</label>
                            <input
                                type='checkbox'
                                onChange={e => setNeed_CFI(e.target.value)}
                                value={need_CFI}
                            >
                            </input>
                        </div>
                        <div>
                            <label>Need CFII</label>
                            <input
                                type='checkbox'
                                onChange={e => setNeed_CFII(e.target.value)}
                                value={need_CFII}
                            >
                            </input>
                        </div>
                        <div>
                            <label>Need MEI</label>
                            <input
                                type='checkbox'
                                onChange={e => setNeed_MEI(e.target.value)}
                                value={need_MEI}
                            >
                            </input>
                        </div>
                        <div>
                            <label>Need Complex</label>
                            <input
                                type='checkbox'
                                onChange={e => setNeed_complex(e.target.value)}
                                value={need_complex}
                            >
                            </input>
                        </div>
                        <div>
                            <label>Need Performance</label>
                            <input
                                type='checkbox'
                                onChange={e => setNeed_performance(e.target.value)}
                                value={need_performance}
                            >
                            </input>
                        </div>
                    <button type='submit'>submit</button>
                    <button onClick={closeForm}>close</button>
                    </div> */}
                {/* </div> */}
            </form>
        </div>
    );
};

export default AircraftForm;
