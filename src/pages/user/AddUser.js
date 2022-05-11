import React, { useContext, useEffect, useRef, useState } from 'react'
import { Col, Form, Tab, Tabs } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { saveNewUser } from 'services/RestApi'
import AppContext from 'utils/AppContext'
import { validateMasterForm } from "utils/ConfigFormValidation"
import { showAlertLoader, closeAlert } from "utils/Alert"
import { useNavigate } from 'react-router-dom'

export default function AddUser() {

    const {setPageData, pageData} = useContext( AppContext )
    const [ activeTab, setActiveTab ] = useState('wa')

    const [ departments, setDepartments ] = useState([])
    const [ applicationSource, setApplicationSource ] = useState([])
    const [ categories, setCategories ] = useState([])
    const [ user, setUser ] = useState([])
    const [ formModal, setFormModal ] = useState([])
    const [ formData, setFormData ] = useState([])

    let navigate = useNavigate()

    const inputRef = {
        app_id: useRef(),
        code: useRef(),
        notif_name: useRef(),
    }

    useEffect(()=>{
        setPageData({...pageData, active:'setup-notification', title: 'Add New Sales / Admin' })
        setFormData({...formData, id_company:1})
        async function fetchData(){
            
        } fetchData()

    },[])

    const onSaveClicked = async (e) => {

        e.preventDefault()
        toast.loading('Saving data...')
        
        try {
            await saveNewUser(formData) 
            showAlertLoader({text: 'Please wait. saving new User'})
            closeAlert()
            navigate('/app')
            toast.success('New user has been saved.')
             
        } catch(error) {
            console.log(error)
        }

    }

    return (
        <div className='page-create-config'>
            <form className='form-horizontal'>
                <div className='form-group row align-items-center'>
                        <Col xl="2" md="3">
                            <Form.Label>Role</Form.Label>
                        </Col>
                        <Col xl="3" md="3">
                            <Form.Select onChange={(event)=>setFormData({...formData, role:event.target.value})}>
                                <option value="Admin">Admin</option>
                                <option value="Sales">Sales</option>
                            </Form.Select>
                        </Col>
                    </div>
                <div className='form-group row align-items-center'>
                    <Col xl="2" md="3">
                        <Form.Label>Name</Form.Label>
                    </Col>
                    <Col xl="3" md="3">
                        <div className='d-flex align-items-center'>
                            <Form.Control type="text" placeholder="" onChange={(event)=>setFormData({...formData, name:event.target.value})} />
                            {/* <span className='ms-3'>last code: <strong>OPS-01</strong></span> */}
                        </div>
                    </Col>
                </div>

                <div className='form-group row align-items-center'>
                    <Col xl="2" md="3">
                        <Form.Label>Email</Form.Label>
                    </Col>
                    <Col xl="3" md="3">
                        <div className='d-flex align-items-center'>
                            <Form.Control type="email" placeholder="" onChange={(event)=>setFormData({...formData, email:event.target.value})} />
                            {/* <span className='ms-3'>last code: <strong>OPS-01</strong></span> */}
                        </div>
                    </Col>
                </div>

                <div className='form-group row align-items-center'>
                    <Col xl="2" md="3">
                        <Form.Label>Contact Number<sup>*</sup></Form.Label>
                    </Col>
                    <Col xl="3" md="3">
                        <div className='d-flex align-items-center'>
                            <Form.Control type="text" placeholder="Ex: 08xxx" onChange={(event)=>setFormData({...formData, mobile_phone:event.target.value})} ref={inputRef.code} />
                            {/* <span className='ms-3'>last code: <strong>OPS-01</strong></span> */}
                        </div>
                    </Col>
                </div>

                <div className='form-group row align-items-center'>
                    <Col xl="2" md="3">
                        <Form.Label>Password</Form.Label>
                    </Col>
                    <Col xl="3" md="3">
                        <div className='d-flex align-items-center'>
                            <Form.Control type="password" placeholder="" onChange={(event)=>setFormData({...formData, password:event.target.value})} />
                            {/* <span className='ms-3'>last code: <strong>OPS-01</strong></span> */}
                        </div>
                    </Col>
                </div>

                <div className="button-container">
                    <button className='btn btn-primary btn-lg' onClick={onSaveClicked}>Save Config</button>
                </div>
            </form>
        </div>
    )
}
