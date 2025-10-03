import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../store/slices/userSlice';

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userInfo);

  useEffect(() => {
    if (user) dispatch(fetchProfile());
  }, [dispatch, user]);

  if (!user) return <p className="mt-5 text-center">Please login to view profile.</p>;

  return (
    <div className="text-center mt-5">
      <img src={'/profile.png'} alt="User" className="rounded-circle mb-3" style={{width: '120px'}} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}

export default Profile;
