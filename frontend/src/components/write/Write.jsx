import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import './write.css'
import { useContext } from 'react';
import { Context } from '../context/Context';
import {useNavigate} from 'react-router-dom';

const Write = () => {

    const [title,setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [file, setFile] = useState(null)
    const {user} = useContext(Context);
    const navigate = useNavigate();


    const handleSubmit = async (e) =>{
        e.preventDefault();
        const newPost = {
            username:user.username,
            title,
            desc,

        };
        if(file){
            const data = new FormData();
            const filename = Date.now()+file.name;
            data.append('name',filename)
            data.append('file',file)
            newPost.photo = filename;

            try {
                await axios.post('/upload',data)
            } catch (error) {}
        }

        try {
           const res = await axios.post('/posts',newPost)
           navigate('/post/' + res.data._id)

        } catch (error) {

        }



    }

    return (
        <div className='write'>

   <h2>Write Your Story At Here</h2>
            {file &&
            <img src={URL.createObjectURL(file)} alt="" className="write-img" />}

            <form className="write-form" onSubmit={handleSubmit}>
                <div className="write-form-group">
                    <label htmlFor="file-input">

                        <i className='form-icon'>+</i>
                    </label>
                    <input type="file" id="file-input" style={{ display: "none" }} onChange= {(e)=>setFile(e.target.files[0])} />

                    <input type="text" placeholder='title' className='write-input' autoFocus={true} onChange= {e=>setTitle(e.target.value)} />
                </div>

                <div className="write-form-group">
                    <textarea placeholder='tell your story..'
                    type='text'
                    className='write-input write-text'  onChange={e=>setDesc(e.target.value)}></textarea>
                </div>
                <button type='submit' className='write-submit'>Publish</button>
            </form>
        </div>
    )
}

export default Write