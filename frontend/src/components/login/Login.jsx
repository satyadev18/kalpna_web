import { useRef,useContext,useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import axios from 'axios';

import './login.css'
const Login = () => {

  //database interaction logic using context api
  const [guestUser, setGuestUser] = useState(false)
  const userRef = useRef()
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' })

    try {
      const res = await axios.post('/auth/login', (guestUser ? {

        username: 'ram',
        password: '1234'

      } : {
        username: userRef.current.value,
        password: passwordRef.current.value
      }
      )
      )
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });

    } catch (error) {

      dispatch({ type: 'LOGIN_FAILURE' })

    }

  }

  return (
    <div className='login'>
      <span className="login-title">Login</span>
      <form className='login-form' onSubmit={handleSubmit}>
        <label >Username</label>
        <input type="text" className="login-input" placeholder='Enter username...'
          ref={userRef} />
        <label >Password</label>
        <input type="password" className="login-input" placeholder='Password' ref={passwordRef} />

        <button className="loginbtn" type='submit' disabled={isFetching}>Login</button>
        <button className="guest-btn" type='submit' disabled={isFetching} onClick={() => setGuestUser(true)} >Guest User</button>
      </form>

 </div>
  )
}

export default Login