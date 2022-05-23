import React, { forwardRef, useContext, useEffect, useRef, useState } from 'react'
import { Col, Form, Tab, Tabs } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { getAllSales, getAllCompanies, saveNewProspecting } from 'services/RestApi'
import AppContext from 'utils/AppContext'
import { validateMasterForm } from "utils/ConfigFormValidation"
import { showAlertLoader, closeAlert } from "utils/Alert"
import { useNavigate } from 'react-router-dom'
import { getUserId, getRole, getUser } from 'services/GlobalVariable'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateProspecting() {

    const {setPageData, pageData} = useContext( AppContext )
    const [ activeTab, setActiveTab ] = useState('wa')
    const [startDate, setStartDate] = useState(new Date());
    const [ departments, setDepartments ] = useState([])
    const [ applicationSource, setApplicationSource ] = useState([])
    const [ companies, setCompany ] = useState([])
    const [ user, setUser ] = useState([])
    const [ formModal, setFormModal ] = useState([])
    const [ formData, setFormData ] = useState({id_sales:getUserId(), type_of_prospect:"B2B",id_company:"1"})

    let navigate = useNavigate()

    const inputRef = {
        app_id: useRef(),
        code: useRef(),
        notif_name: useRef(),
    }

    useEffect(()=>{
        setPageData({...pageData, active:'setup-notification', title: 'Create New Prospecting' })
        
        // setFormData({...formData, id_sales:getUserId()})
        // setFormData({...formData, type_of_prospect:"B2B"})
        // setFormData({...formData, id_company:"1"})
        async function fetchData(){
            let _responseC = await getAllCompanies();
            setCompany(_responseC.data)
            if (getRole() === 'Admin') {
                let _response = await getAllSales();
                setUser(_response.data)
            } else {
                let _user = [
                    {
                        'id' : getUserId(),
                        'name' : getUser()
                    }
                ]
                setUser(_user)
            }
                
            
            
        } fetchData()

    },[])

    const onSaveClicked = async (e) => {

        e.preventDefault()
        toast.loading('Saving data...')
        var status = 1
        setFormData({...formData, flag:"Leads"})
        setFormData({...formData, id_status:status})
        try {
            await saveNewProspecting(formData) 
            showAlertLoader({text: 'Please wait. saving notification config'})
            closeAlert()
            navigate('/app/process/prospecting')
            toast.success('New Prospecting has been saved.')
             
        } catch(error) {
            console.log(error)
        }

    }

    const CustomInput = forwardRef(({ value, onClick }, ref) => (
            <Form.Control defaultValue={value} onClick={onClick} ref={ref} />
    ));

    return (
        <div className='page-create-config'>
            <form className='form-horizontal'>
                <div className='form-group row align-items-center'>
                    <Col xl="2" md="3">
                        <Form.Label>Sales<sup>*</sup></Form.Label>
                    </Col>
                    <Col xl="3" md="3">
                        <Form.Select defaultValue = {getUserId()} onChange={(event)=>setFormData({...formData, id_sales:event.target.value})}>
                            { user.map((row) => (<option key={`${row.id}`} value={row.id}>{row.name}</option>) ) }
                        </Form.Select>
                    </Col>
                </div>
                <div className='form-group row align-items-center'>
                    <Col xl="2" md="3">
                        <Form.Label>Type Product<sup>*</sup></Form.Label>
                    </Col>
                    <Col xl="3" md="3">
                        <Form.Select onChange={(event)=>setFormData({...formData, id_company:event.target.value})}>
                            { companies.map((row) => (<option key={`${row.id}`} value={row.id}>{row.name_company}</option>) ) }
                        </Form.Select>
                    </Col>
                </div>
                <div className='form-group row align-items-center'>
                    <Col xl="2" md="3">
                        <Form.Label>Company Name</Form.Label>
                    </Col>
                    <Col xl="3" md="3">
                        <div className='d-flex align-items-center'>
                            <Form.Control type="text" placeholder="Ex: PT abc" onChange={(event)=>setFormData({...formData, company_contact:event.target.value})} ref={inputRef.code} />
                            {/* <span className='ms-3'>last code: <strong>OPS-01</strong></span> */}
                        </div>
                    </Col>
                </div>

                <div className='form-group row align-items-center'>
                    <Col xl="2" md="3">
                        <Form.Label>Type<sup>*</sup></Form.Label>
                    </Col>
                    <Col xl="3" md="3">
                        <Form.Select onChange={(event)=>setFormData({...formData, type_of_prospect:event.target.value})}>
                            <option value="B2B">B2B</option>
                            <option value="B2C">B2C</option>
                        </Form.Select>
                    </Col>
                </div>

                <div className='form-group row align-items-center'>
                    <Col xl="2" md="3">
                        <Form.Label>Contact Number<sup>*</sup></Form.Label>
                    </Col>
                    <Col xl="3" md="3">
                        <div className='d-flex align-items-center'>
                            <Form.Control type="text" placeholder="Ex: 08xxx" onChange={(event)=>setFormData({...formData, mobile_phone_contact:event.target.value})} ref={inputRef.code} />
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
                            <Form.Control type="email" onChange={(event)=>setFormData({...formData, email_contact:event.target.value})} ref={inputRef.code} />
                            {/* <span className='ms-3'>last code: <strong>OPS-01</strong></span> */}
                        </div>
                    </Col>
                </div>

                <div className='form-group row align-items-center'>
                    <Col xl="2" md="3">
                        <Form.Label>Contact Name<sup>*</sup></Form.Label>
                    </Col>
                    <Col xl="3" md="3">
                        <div className='d-flex align-items-center'>
                            <Form.Control type="text" onChange={(event)=>setFormData({...formData, name_contact:event.target.value})} ref={inputRef.code} />
                            {/* <span className='ms-3'>last code: <strong>OPS-01</strong></span> */}
                        </div>
                    </Col>
                </div>
                <div className='form-group row align-items-center'>
                    <Col xl="2" md="3">
                        <Form.Label>Position<sup>*</sup></Form.Label>
                    </Col>
                    <Col xl="3" md="3">
                        <div className='d-flex align-items-center'>
                            <Form.Control type="text" placeholder="Ex: HRD" onChange={(event)=>setFormData({...formData, position:event.target.value})} ref={inputRef.code} />
                            {/* <span className='ms-3'>last code: <strong>OPS-01</strong></span> */}
                        </div>
                    </Col>
                </div>
                <div className='form-group row align-items-center'>
                    <Col xl="2" md="3">
                        <Form.Label>Birthday</Form.Label>
                    </Col>
                    <Col xl="3" md="3">
                        <div className='d-flex align-items-center'>
                            <DatePicker selected={formData.birthday} customInput={<CustomInput />} onChange={(date:Date) => setFormData({...formData, birthday:date})} />
                        </div>
                    </Col>
                </div>
                <div className='form-group row align-items-center'>
                    <Col xl="2" md="3">
                        <Form.Label>Notes</Form.Label>
                    </Col>
                    <Col xl="3" md="3">
                        <div className='d-flex align-items-center'>
                            <Form.Control type="text" onChange={(event)=>setFormData({...formData, notes_contact:event.target.value})} ref={inputRef.code} />
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
