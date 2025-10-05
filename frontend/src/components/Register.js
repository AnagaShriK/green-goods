import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';


function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const dispatch = useDispatch();
  const { userInfo, error: reduxError } = useSelector(state => state.user); // corrected

  useEffect(() => {
  if (userInfo) {
    navigate('/search'); \
  }
}, [userInfo, navigate]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    dispatch(register({ name, email, password })); 
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center text-success mb-4">Register</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label>Name</label>
          <input type="text" className="form-control" placeholder="Enter name"
                 value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Email ID</label>
          <input type="email" className="form-control" placeholder="Enter email"
                 value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Enter password"
                 value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
}

export default Register;
