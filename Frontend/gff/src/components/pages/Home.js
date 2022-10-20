import React,{ useContext } from 'react'
import ReactPlayer from 'react-player';
import { Link, Navigate } from 'react-router-dom';
import UserContext from '../../UserContext';
import './Pages.css';

function Home() {
  const {user, isAuthenticated, LogIn, LogOut} = useContext(UserContext);
  return (
    <div className='home'>
      {!isAuthenticated && <h1>Hello Guset - Watch This Video For Extra Motivation!</h1>}
      {isAuthenticated && <h1>Hello {user.userName} - Get Some Extra Motivation!</h1>}
      {isAuthenticated && user.type==="Coach" && <Link className='report1' to="/reportToAdmin" >Report A Problem</Link>}
      {isAuthenticated && user.type==="Sportsman" && <Link className='report1' to="/report" >Report A Problem</Link>}
      <div className='home-video'><ReactPlayer playing={true} width='1300px' height='800px' controls url='https://www.youtube.com/watch?v=ZlfKYEG-eXk'/></div>
    </div>
  )
}

export default Home