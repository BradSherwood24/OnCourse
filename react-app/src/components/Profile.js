import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Profile(user) {

  useEffect(() => {

  }, [dispatch]);

  if (!user) {
    return null;
  }

  return (
    <div>
        <div className='img-container'>
            <img className='profile-img' src={user.img}></img>
        </div>
      <ul>
        <li>
          <strong>User Id</strong> {userId}
        </li>
        <li>
          <strong>Username</strong> {user.username}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
      </ul>
    </div>
  );
}
export default Profile;
