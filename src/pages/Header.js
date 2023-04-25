/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

function Header() {
  let navigate = useNavigate();
  let handleLogout = () => {
    window.localStorage.removeItem('Authorization');
    navigate('/login');
  };
  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light bg-light ps-3'>
        <div className='container'>
          <span className='navbar-brand mb-0 fs-2 fw-bold'>Shortly</span>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'nav-link active text-info' : 'nav-link'
                  }
                  aria-current='page'
                  to={'/'}>
                  Home
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'nav-link active text-info' : 'nav-link'
                  }
                  aria-current='page'
                  to={'/dashboard'}>
                  Dashboard
                </NavLink>
              </li>
            </ul>
            <form className='d-flex justify-content-evenly gap-2'>
              <Link
                to={'/login'}
                className='btn btn-outline-info login'
                type='submit'>
                Sign In
              </Link>

              <Link
                to={'/sign-up-activate'}
                className='btn btn-info text-white rounded-pill signup'
                type='submit'>
                Sign Up
              </Link>

              <button
                className='btn btn-outline-info login'
                type='submit'
                onClick={handleLogout}>
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
