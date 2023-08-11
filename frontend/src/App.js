import React from 'react'
import { ToastContainer } from 'react-toastify'
import Header from './components/Header.jsx'
import { Outlet } from 'react-router-dom'
const App = () => {
  return (
    <>
      <ToastContainer />

      <Header />
      <div className='py-24'>
        <div className='container' >

          <Outlet />
        </div>
      </div>



    </>
  )
}

export default App