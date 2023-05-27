import React from 'react';
import './post.css';
import {NavLink} from 'react-router-dom';

const Post = ({post}) => {
  const PF = 'http://localhost:5000/images/'

  return (
    <div className='post'>

     <NavLink className='link' to={`post/${post._id}`}>

       <div className="post-info">
    {post.photo && (<img src={PF + post.photo} alt="post" className='post-img' />)}
    <span className="post-title">{post.title}</span>
    </div>
    </NavLink>
      <p className='post-desc'>{post.desc}</p>
         <p className='author'>Author: {post.username}</p>
 </div>


  )
}

export default Post
