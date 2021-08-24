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
            <h2>profile</h2>
            <div className='img-container'>
                <img className='profile-img' src={user.img}></img>
            </div>
            <ul>
                <li>
                    <strong>User Id</strong> {user.id}
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
export default Profile;
