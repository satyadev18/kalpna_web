
import React from 'react'
import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Context } from '../context/Context';
import './topbar.css';

const TopBar = () => {
  const { user, dispatch } = useContext(Context);
  const PF = 'http://localhost:5000/images/';

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }
  return (
    <div className='top'>

 <h2 className="logo"> <NavLink className='link' to='/'>KALPNA</NavLink> </h2>
    {user ?
    (<>
        <h2  id='write'><NavLink className='link' to='/write'>Write</NavLink></h2>

        <Link to='/settings'>
            <img className='top-img' src={PF + user.profilePic} alt="profile" />
          </Link>

          <button className="logout-btn" onClick={handleLogout}>{user && "Logout"}</button>
          </>) : (
            <>
              <button className='top-login'><Link className="link" to="/login">
                LOGIN
              </Link></button>

             <button className='top-register'>  <Link className="link" to="/register">
                REGISTER
              </Link></button>
           </>
 ) }


    </div>

  )

}

export default TopBar