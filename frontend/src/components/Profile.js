import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../store/slices/userSlice';
import placeholder from '../profile.png';

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userInfo);

  useEffect(() => {
    if (user) dispatch(fetchProfile());
  }, [dispatch, user]);

  if (!user) return <p className="mt-5 text-center">Please login to view profile.</p>;

  // use user.image if available (from profile API), otherwise fallback to bundled placeholder
  const imgSrc = user.image || placeholder;

  return (
    <div className="text-center mt-5">
      <img src={imgSrc} alt="User" className="rounded-circle mb-3" style={{width: '120px', height: '120px', objectFit: 'cover'}} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}

export default Profile;
