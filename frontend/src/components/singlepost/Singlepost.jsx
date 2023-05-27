import axios from 'axios'
import './singlepost.css'
import { useLocation } from 'react-router';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';

import { Link } from 'react-router-dom'
import { useContext } from 'react';

// component
const Singlepost = () => {

  // variable declarations
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const { user } = useContext(Context)
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const navigate = useNavigate();

  // edit post variables.
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  const [updateMode, setUpdateMode] = useState(false);


  // fetching single post from database
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get('/posts/' + path);
      setPost(res.data);
      setTitle(res.data.title)
      setDesc(res.data.desc)
    };
    getPost();

  }, [path])


  //post delete logic
  const handleDelete = async () => {
    try {

      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      navigate('/');


    } catch (error) {

    }

  }

  // post edit logic

  const handleUpdate = async ()=>{
    try {
      await axios.put(`/posts/${post._id}`,{
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false)

    } catch (error) {

    }
  }


 return (
    <div className='sp'>
      <div className="sp-wrapper">
        {post.photo && (

          <img src={PF + post.photo} alt=""
            className='sp-img' />
        )} {
          updateMode ? <input type='text' value= {title} className='sp-title-input' onChange={(e)=>setTitle(e.target.value)}/> :(


        <h1 className='sp-title'>
          {title}
          {post.username === user?.username &&
          <div className="sp-edit">
            <button className='sp-icon' onClick={() => setUpdateMode(true)}>Edit</button>
            <button className='sp-icon' onClick={handleDelete}>Delete</button>
          </div>
}

        </h1>
 ) }
        <div className="sp-info">
          <span className='sp-author'>Author: <Link to={`/?user=${post.username}`} className='link'><b>{post.username}</b></Link></span>
          <span className='sp-date'> <b>{new Date(post.createdAt).toDateString()}</b></span>
        </div>

        {updateMode ? <textarea className='sp-desc-input' value={desc} onChange={(e)=>setDesc(e.target.value)}/> :(
        <p className="sp-desc" >{desc}</p>
        )}

        { updateMode  && (
        <button className="sp-post-btn" onClick={handleUpdate}>Update</button> ) }
      </div>

    </div>
  )
}

export default Singlepost