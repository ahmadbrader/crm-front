import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import ButtonPrimary from 'components/buttons/ButtonPrimary';
import { changeDocumentTitle } from 'utils/Helper';
import signIn from 'services/Authentication';

import './styles.scss';
import logo from 'assets/images/logo.svg'
import { getUsername } from 'services/ConfigNotifSession';

export default function Login() {
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  let navigate = useNavigate()

  useEffect(()=>{
    changeDocumentTitle('Login')
  },[])
  
  useEffect(()=>{
    if(username.length > 0 && password.length > 0) {
      setBtnDisabled(false)
    } else {
      setBtnDisabled(true)
    }
  },[username, password])

  const onLoginPressed = async (event) => {
    event.preventDefault()
    setBtnDisabled(true)
    toast.loading('Authenticating...');

    let _signIn = await signIn({username, password})
    toast.dismiss()
    if(_signIn === false) {
      setBtnDisabled(false)
      toast.error('Username or password incorrect.')
    } else {
      navigate('/app')
    }

  }

  return (
    <div className='login-container'>
      {/* <img src={logo} alt="logo" className='logo' /> */}
      <div className="login-form-container">
        <h1>Login CRM</h1>

        <form onSubmit={onLoginPressed}>
          <div className='form-group'>
            <label htmlFor="#">Email</label>
            <input type="text" className='form-control' onChange={(event) => setUsername(event.target.value)} placeholder="Username" />
          </div>

          <div className='form-group'>
            <label htmlFor="#">Password</label>
            <input type="password" className='form-control' onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
          </div>

          <ButtonPrimary onClick={onLoginPressed} disabled={btnDisabled}>Login</ButtonPrimary>
        </form>
      </div>
    </div>
  )
}
