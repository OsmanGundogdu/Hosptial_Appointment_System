import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from '../pages/Home.jsx'
import HastalarDetails from '../components/HastalarDetails.jsx'

function RouterConfig() {
  return (
    <Routes>
        <Route path= '/' element = {<Home/>} />
        <Route path='/hasta-details/:id' element={<HastalarDetails />}/>
    </Routes>
  )
}

export default RouterConfig