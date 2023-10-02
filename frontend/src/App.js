import React from 'react'
import { ToastContainer } from 'react-toastify'
import Header from './components/Header.jsx'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'react-bootstrap'
const App = () => {
  return (
    <>
      <ToastContainer />

      <Header />

      <Container>
        <Outlet />
      </Container>


      <Footer />


    </>
  )
}

export default App