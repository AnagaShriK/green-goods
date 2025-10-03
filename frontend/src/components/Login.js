import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { userInfo, error } = useSelector(state => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  // redirect when logged in
  useEffect(() => {
  if (userInfo) {
    navigate('/search');   // ✅ send user to search page
  }
}, [userInfo, navigate]);

  return (
    <div className="d-flex justify-content-center mt-5">
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center text-success mb-4">Login</h3>

        {error && <p className="text-danger">{error}</p>}

        <div className="mb-3">
          <label>Email ID</label>
          <input type="email" className="form-control"
                 value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control"
                 value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <button type="submit" className="btn btn-success w-100">Login</button>
      </form>
    </div>
  );
}

export default Login;
