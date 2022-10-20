import React, { useState, useEffect, useContext } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import UserContext from '../UserContext';

function Navbar() {
  const {user, isAuthenticated, LogIn, LogOut} = useContext(UserContext);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          <i class="fa-solid fa-person-running"/> GoForFit
          {isAuthenticated?" - Hello " + user['userName']:null}
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            {!isAuthenticated &&
            <li className='nav-item'>
              <Link to='/publicCoaches' className='nav-links' onClick={closeMobileMenu}>
                Our Coaches
              </Link>
            </li>}
            {isAuthenticated && user['type']==="Coach" &&
            <li className='nav-item'>
              <Link to='/MySportsmans' className='nav-links' onClick={closeMobileMenu}>
                My Sportsmans
              </Link>
            </li>}
            {isAuthenticated && user['type']==="Admin" &&
            <li className='nav-item'>
              <Link to='/users' className='nav-links' onClick={closeMobileMenu}>
                Users
              </Link>
            </li>}
            {isAuthenticated && user['type']==="Admin" &&
            <li className='nav-item'>
              <Link to='/editSports' className='nav-links' onClick={closeMobileMenu}>
                Edit Sports
              </Link>
            </li>}
            {!isAuthenticated && <li className='nav-item'>
              <Link
                to='/about'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                About Us
              </Link>
            </li>}
            {isAuthenticated && user['type']==="Sportsman" &&  <li className='nav-item'>
              <Link
                to='/sportsman/myWorkouts'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                My Workouts
              </Link>
            </li>}
            {isAuthenticated && user['type']==="Sportsman" &&  <li className='nav-item'>
              <Link
                to='/sportsman/MyProfile'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                My Profile
              </Link>
            </li>}
            {isAuthenticated && user['type']==="Coach" &&  <li className='nav-item'>
              <Link
                to={'/coach/profile'}
                className='nav-links'
                onClick={closeMobileMenu}
              >
                My Profile
              </Link>
            </li>}
            {isAuthenticated && user['type']==="Sportsman" &&  <li className='nav-item'>
              <Link
                to={'/coach/profile'}
                className='nav-links'
                onClick={closeMobileMenu}
              >
                My Coach
              </Link>
            </li>}
            {isAuthenticated && <li className='nav-item'>
            <Link
                to={'/messages'}
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Messages
              </Link>
              </li>}
            {isAuthenticated && <li className='nav-item'>
            <Link
                to={'/generalForum'}
                className='nav-links'
                onClick={closeMobileMenu}
              >
                General Forum
              </Link>
              </li>}
              {isAuthenticated &&  <li className='nav-item'>
              <Link
                to='/outstandings'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Outstandings
              </Link>
            </li>}
            {isAuthenticated && user['type']!="Admin" &&  <li className='nav-item'>
              <Link
                to='/commonInjuries'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Common Injuries
              </Link>
            </li>}
            <li className='nav-item'>
              {isAuthenticated?
              <Link
                to='/'
                className='nav-links'
                onClick={closeMobileMenu && LogOut}
              >
                Logout
              </Link>:
              <Link
              to='/login'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Login
            </Link>}
            </li>
          
            <li>
              <Link
                to='/sportsman/sign_up'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign Up 
              </Link>
            </li>
          </ul>
          {button && !isAuthenticated && <Button type="submit" formaction="/sportsman/sign_up" buttonStyle='btn--outline'>SIGN UP</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;