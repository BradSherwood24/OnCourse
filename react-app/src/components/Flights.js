import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function Flights({ user }) {
    const dispatch = useDispatch()

    useEffect(() => {

    }, [dispatch]);

    return (
        <div className='flights'>
            <h2>flights</h2>
            <ul>
                {}
                <li>
                    <div>

                    </div>
                </li>
                <li>
                    <strong>Name</strong> {user.full_name}
                </li>
                <li>
                    <strong>Email</strong> {user.email}
                </li>
            </ul>
        </div>
    );
}
export default Flights;
