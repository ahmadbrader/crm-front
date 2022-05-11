import React, { useContext, useEffect, useState } from 'react'
import userAvatar from 'assets/images/user-avatar.svg'
import AppContext from 'utils/AppContext'
import { changeDocumentTitle } from 'utils/Helper'
import { showAlert } from 'utils/Alert'
import { useNavigate } from 'react-router-dom'
import { FaThLarge } from "react-icons/fa";
import { getUsername } from 'services/GlobalVariable'

export default function Topbar() {

  const { pageData, setShowMobileMenu, showMobileMenu } = useContext( AppContext )
  let navigate = useNavigate()
  useEffect(()=>{
    changeDocumentTitle(pageData.title);
    
  }, [pageData])

  const onLogout = async () => {
      let action = await showAlert({
          icon: 'question',
          title: 'Logout',
          text: 'Are you sure want to logout from application?',
          showCancelButton: true,
          confirmButtonText: "Yes, Logout Now"
      })

      if(action.isConfirmed && action.value) {
        localStorage.clear();
          navigate('/')
      }
  }

  return (
    <section className="enotif-top-bar">
        <button className='btn-trigger-mobile-menu' onClick={() => setShowMobileMenu(!showMobileMenu)}>
          <FaThLarge /> Menu
        </button>
        <div className='page-title'>
          {pageData.title.length > 0 ?  <h2>{pageData.title}</h2> : '' }
        </div>

        <div className="user-profile-wrapper">
            <img src={userAvatar} alt="avatar" />
            <span>{getUsername()}</span>
            <button className='logout-btn' onClick={onLogout}>Logout</button>
        </div>
    </section>
  )
}
