import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Context } from '../context/Context';
import axios from 'axios';
import './setting.css'
import { useNavigate } from 'react-router-dom';
const Setting = () => {
    const [file, setFile] = useState(null)
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [success, setSuccess] = useState(false)
    const { user, dispatch } = useContext(Context);
    const PF = 'http://localhost:5000/images/';
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" })
        const updatedUser = {
            userId: user._id,
            username, email, password,

        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append('name', filename)
            data.append('file', file)
            updatedUser.profilePic = filename;

            try {
                await axios.post('/upload', data)
            } catch (error) { }
        }

        try {
            const res = await axios.put('/users/' + user._id, updatedUser);

            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
            navigate('/')


        } catch (error) {
            dispatch({ type: "UPDATE_FAILURE" })


        }
    }


    return (
        <div className='setting'>
            <div className="setting-wrapper">
                <div className="setting-title">
                   <h2>Update Your Accout</h2>

                </div>

                <form className='setting-form' onSubmit={handleSubmit}>
                    <label >Profile Picture</label>
                    <div className="setting-pp">
                        <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" />

                        <label htmlFor="fileInput">

                        </label>
                        <input type="file" id="file-input" onChange={(e) => setFile(e.target.files[0])} />
                        <div>
                        <label>Username</label>
                        <input type="text" placeholder={user.username} onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div>
                        <label >Email</label>
                        <input type="text" placeholder={user.email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div>
                        <label >Password</label>
                        <input type="password" onChange={e => setPassword(e.target.value)} />
                        </div>

                        <button className="setting-submit" type='submit'>Update</button>

                        {success && <h1>done</h1>}

                      </div>
                </form>
            </div>



        </div>
    )
}

export default Setting