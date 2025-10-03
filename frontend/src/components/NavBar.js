import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/userSlice';

function NavBar() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand text-success" to="/">GreenGoods</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {userInfo ? (
              <>
                <li className="nav-item"><Link className="nav-link" to="/search">Search</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/cart">Cart</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/orders">Orders</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/profile">{userInfo.name}</Link></li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
