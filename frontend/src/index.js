import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './store';
import { Provider } from 'react-redux'
import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';






const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />



    </Route>

  )
)















const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>

    <RouterProvider router={router} />
  </Provider>



);


