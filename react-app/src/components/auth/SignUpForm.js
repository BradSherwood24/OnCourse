import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp, login } from '../../store/session';
import './auth.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [homeAirport, setHomeAirport] = useState('')
  const [img, setImg] = useState('')
  const [totalTime, setTotalTime] = useState(0)
  const [IR, setIR] = useState(false)
  const [CSEL, setCSEL] = useState(false)
  const [CMEL, setCMEL] = useState(false)
  const [ATP, setATP] = useState(false)
  const [CFI, setCFI] = useState(false)
  const [CFII, setCFII] = useState(false)
  const [MEI, setMEI] = useState(false)
  const [complex, setComplex] = useState(false)
  const [performance, setPerformance] = useState(false)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(fullName, email, password, homeAirport, img, totalTime, complex, performance, IR, CSEL, CMEL, ATP, CFI, CFII, MEI));
      if (data) {
        setErrors(data)
      }
    }
  };

  const demo = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data);
    }
  }

  if (user) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='backgroundSignUp'>
      <form className='signUp' onSubmit={onSignUp}>
        <h1>Create Account</h1>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label>Full Name</label>
          <input
            type='text'
            name='username'
            onChange={e => setFullName(e.target.value)}
            value={fullName}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            type='text'
            name='email'
            onChange={e => setEmail(e.target.value)}
            value={email}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            name='password'
            onChange={e => setPassword(e.target.value)}
            value={password}
          ></input>
        </div>
        <div>
          <label>Repeat Password</label>
          <input
            type='password'
            name='repeat_password'
            onChange={e => setRepeatPassword(e.target.value)}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div>
          <label>Home Airport</label>
          <input
            type='text'
            name='home_airport'
            onChange={e => setHomeAirport(e.target.value)}
            value={homeAirport}
            required={true}
          ></input>
        </div>
        <div>
          <label>Profile Image</label>
          <input
            type='text'
            name='profile_image'
            onChange={e => setImg(e.target.value)}
            value={img}
          ></input>
        </div>
        <div>
          <label>Total Time Logged</label>
          <input
            type='number'
            name='total_time'
            onChange={e => setTotalTime(e.target.value)}
            value={totalTime}
            required={true}
          ></input>
        </div>
        <div>
          <label>Complex Rated?</label>
          <input
            type='checkbox'
            name='complex'
            onChange={e => setComplex(e.target.value)}
            value={complex}
          ></input>
        </div>
        <div>
          <label>Performance Rated?</label>
          <input
            type='checkbox'
            name='performance'
            onChange={e => setPerformance(e.target.value)}
            value={performance}
          ></input>
        </div>
        <div>
          <label>Instrument Rated?</label>
          <input
            type='checkbox'
            name='IR'
            onChange={e => setIR(e.target.value)}
            value={IR}
          ></input>
        </div>
        <div>
          <label>Commercial Single Engine Land?</label>
          <input
            type='checkbox'
            name='CSEL'
            onChange={e => setCSEL(e.target.value)}
            value={CSEL}
          ></input>
        </div>
        <div>
          <label>Commercial Multi Engine Land?</label>
          <input
            type='checkbox'
            name='CMEL'
            onChange={e => setCMEL(e.target.value)}
            value={CMEL}
          ></input>
        </div>
        <div>
          <label>Airline Transport Pilot?</label>
          <input
            type='checkbox'
            name='ATP'
            onChange={e => setATP(e.target.value)}
            value={ATP}
          ></input>
        </div>
        <div>
          <label>Certified Flight Instructor?</label>
          <input
            type='checkbox'
            name='CFI'
            onChange={e => setCFI(e.target.value)}
            value={CFI}
          ></input>
        </div>
        <div>
          <label>Certified Flight Instrument Instructor?</label>
          <input
            type='checkbox'
            name='CFII'
            onChange={e => setCFII(e.target.value)}
            value={CFII}
          ></input>
        </div>
        <div>
          <label>Multi Engine Instructor?</label>
          <input
            type='checkbox'
            name='MEI'
            onChange={e => setMEI(e.target.value)}
            value={MEI}
          ></input>
        </div>
        <button className='SignupB' type='submit'>Sign Up</button>
        <button className='DemoB' onClick={e => demo(e)}>Demo User</button>
      </form>
    </div>
  );
};

export default SignUpForm;
