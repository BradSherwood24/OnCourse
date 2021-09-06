import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Profile.css'

function Profile({ user }) {
    const dispatch = useDispatch()

    useEffect(() => {

    }, [dispatch]);

    if (!user) {
        return null;
    }

    return (
        <div className='profile'>
            <div className='img-container'>
                <img className='profile-img' src={user.img}></img>
            </div>
                    <p><strong>Name</strong> {user.full_name}</p>
                    <strong>Email</strong> {user.email}
        </div>
    );
}
export default Profile;
