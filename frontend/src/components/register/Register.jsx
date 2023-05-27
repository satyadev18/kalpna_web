import { useState } from 'react'
import './register.css'
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';


const Register= ()=>{
  const [email,setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false)
  const navigate = useNavigate();

  const handleSubmit= async (e)=>{
    e.preventDefault();
    setError(false)
 try{
    const res = await axios.post("/auth/register",{
      username,
      email,
      password,
    });
    res.data && navigate('/login')

  }catch(err){
    setError(true)
  }


  }
  return (

<div className='register'>
        <span className="register-title">Register</span>

        <form className='register-form' onSubmit={handleSubmit}>
        <label >User Name</label>
        <input type="text" className="register-input" placeholder='Enter Username'
        onChange={e=>setUsername(e.target.value)}/>

        <label >Email</label>
        <input type="text"
        className="register-input"
        placeholder='Enter Email'
        onChange={e=>setEmail(e.target.value)}/>

        <label >Password</label>
        <input type="text" className="register-input" placeholder='Password'
        onChange={e=>setPassword(e.target.value)}/>

        <button className="registerbtn" type='submit'>Register</button>

        </form>
        <Link to='/login'><button className='guest-btn'>Login As GUEST </button></Link>
        {error && <span style={{color:'red',margin:'10px'}}>This Email is already registred</span>}
    </div>
  )
}

export default Register