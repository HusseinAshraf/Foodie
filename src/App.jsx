import React from "react";
import { Outlet } from 'react-router-dom';
import NavBar from './Component/NavBar/NavBar';
import SideBar from './Component/SideBar/SideBar.jsx';
import UserContextProvider from './Context/UserContext.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <UserContextProvider>

      <NavBar />


      <SideBar />


      <Outlet />


      <ToastContainer
        position="bottom-left" />
    </UserContextProvider>
  );
}

export default App;
