import React from 'react'
import { ToastContainer } from 'react-toastify'
import Header from './components/Header.jsx'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <>
      <ToastContainer />

      <Header />
      <div className='pt-12'>
        <Outlet />
      </div>

      <Footer />


    </>
  )
}

export default App