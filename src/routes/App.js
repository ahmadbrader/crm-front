import { Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useState } from "react";

import AppContext from 'utils/AppContext';

import Login from '../pages/login/Login';
import UserAppTemplate from "./UserAppTemplate";


function App() {

  const [user, setUser] = useState({});
  const [pageData, setPageData] = useState({active:'', title:''});
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const appStateObject = {
    user,
    setUser,
    pageData,
    setPageData,
    showMobileMenu,
    setShowMobileMenu
  }
  
  return (
    <AppContext.Provider value={appStateObject}>
      <div className={`enotif-app ${showMobileMenu ? 'mobile-menu-in' : 'mobile-menu-out'}`}>
        <Toaster />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="app/*" element={<UserAppTemplate />} />
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App;
