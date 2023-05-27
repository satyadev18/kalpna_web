import React from 'react'
import Login from './components/login/Login'
import Homepage from './components/pages/home/Homepage'
import Register from './components/register/Register'
import Setting from './components/settings/Setting'
import Single from './components/single/Single'
import TopBar from './components/topBar/TopBar'
import Write from './components/write/Write'
import {BrowserRouter as Router,

Routes,
Route,
Link} from 'react-router-dom';
import { useContext } from 'react'
import { Context } from './components/context/Context'
const App = () => {

  const {user} = useContext(Context)

  return (
    <div>

      <Router>
      <TopBar/>
      <Routes>

  <Route exact path ='/' element={<Homepage/>}></Route>
  <Route exact path ='/register' element={user ? <Homepage/> : <Register/>}></Route>
  <Route exact path ='/login' element={user?<Homepage/>:<Login/>}></Route>
  <Route exact path ='/write' element={user?<Write/>:<Register/>}></Route>
  <Route exact path ='/settings' element={user?<Setting/>:<Register/>}></Route>
  <Route exact path ='/post/:id' element={user?<Single/>:<Register/>}></Route>


      </Routes>
      </Router>

    </div>
  )
}

export default App