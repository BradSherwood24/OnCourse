import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { logout } from '../../store/session';
import { useParams } from 'react-router-dom';

function User() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  const deleteUser = async () => {
    await fetch(`/api/auth/delete/${userId}`, {
      method: 'DELETE'
    })
    dispatch(logout())
  }

  return (
    <ul>
      <button className='delete_user_button' onClick={deleteUser}>
        Delete
      </button>
      <li>
        <strong>User Id</strong> {userId}
      </li>
      <li>
        <strong>Username</strong> {user.full_name}
      </li>
      <li>
        <strong>Email</strong> {user.email}
      </li>
    </ul>
  );
}
export default User;
