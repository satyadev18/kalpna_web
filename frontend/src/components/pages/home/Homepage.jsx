import { useState,useEffect } from 'react';
import Posts from '../../posts/Posts'
import './homePage.css';
import axios from "axios";
import { useLocation } from 'react-router-dom';

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();



  useEffect(()=>{
    const fetchPosts = async ()=>{
      const res = await axios.get('/posts' + search);
      setPosts(res.data);
    }
   fetchPosts();

  },[search])
  return (
    <div>

  <div className="home">
        <Posts posts={posts}/>
 </div>

    </div>
  )
}

export default Homepage