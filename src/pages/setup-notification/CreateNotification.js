import React, { useContext, useEffect, useRef, useState } from 'react'
import { Col, Form, Tab, Tabs } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { getApplications, getCategories, getDepartments, saveNotifConfig } from 'services/RestApi'
import AppContext from 'utils/AppContext'
import TabWaSms from 'components/create-config/TabWaSms'
import TabSettingPdf from 'components/create-config/TabSettingPdf'
import TabEmail from 'components/create-config/TabEmail'
import TabPushNotification from 'components/create-config/TabPushNotification'
import TabReport from 'components/create-config/TabReport'
import { FORM_MASTER_OBJECT, FORM_WA_OBJECT, FORM_SMS_OBJECT } from 'config/notification-data'
import { showAlert } from 'utils/Alert'
import { getSessionConfigEmail, getSessionConfigPushNotif, getSessionConfigSms, getSessionConfigWa } from 'services/ConfigNotifSession'
import { validateMasterForm } from "utils/ConfigFormValidation"
import { showAlertLoader, closeAlert } from "utils/Alert"
import { useNavigate } from 'react-router-dom'

export default function CreateNotification() {

    const {setPageData, pageData} = useContext( AppContext )
    const [ activeTab, setActiveTab ] = useState('wa')

    const [ departments, setDepartments ] = useState([])
    const [ applicationSource, setApplicationSource ] = useState([])
    const [ categories, setCategories ] = useState([])

    const [ formData, setFormData ] = useState(FORM_MASTER_OBJECT)

    let navigate = useNavigate()

    const inputRef = {
        app_id: useRef(),
        code: useRef(),
        notif_name: useRef(),
    }

    useEffect(()=>{
        setPageData({...pageData, active:'setup-notification', title: 'Create Notification Config' })

        async function fetchData(){
            Promise.all([ getDepartments(), getApplications(), getCategories()]).then(([_departments, _applications, _categories]) => {
                setDepartments(_departments.data)
                setApplicationSource(_applications.data)
                setCategories(_categories.data)
            }).catch((error) => {
                console.log(error)
                toast.error(`Error getting data department, application, and category. ${error}`)
            })
        } fetchData()

    },[])

    const onSaveClicked = async (e) => {

        e.preventDefault()

        let _form = {...formData}
        
        _form.type = [] //reset type notification

        let _configWa = getSessionConfigWa()
        let _configSms = getSessionConfigSms()
        let _configEmail = getSessionConfigEmail()
        let _configPushNotif = getSessionConfigPushNotif()

        if( _configWa.sql_query !== '' && _configWa.template !== '' ) _form.type.push(_configWa)
        if( _configSms.sql_query !== '' && _configSms.template !== '' ) _form.type.push(_configSms)
        if( _configEmail.sql_query !== '' && _configEmail.email_body !== '' && _configEmail.email_subject !== '' ) _form.type.push(_configEmail)
        if( _configPushNotif.sql_query !== '' && _configPushNotif.template  !== '' ) _form.type.push(_configPushNotif)

        // console.log(_form);
        // return false;

        let validate = validateMasterForm(_form)
        if( !validate.status ) {
            toast.error(validate.message)
            inputRef[validate.field]?.current?.focus()
            return false;
        }

        let action = await showAlert({
            title: 'Setting PDF Confirmation',
            text: 'Apakah anda ingin menambahkan setting PDF?',
            showCancelButton: true,
            cancelButtonText: 'No',
            confirmButtonText: 'Yes, Setting PDF'
        }, 'no-icon')
        
        try {
            if(action.isConfirmed && action.value) {
                setActiveTab('pdf')
            } else {

                showAlertLoader({text: 'Please wait. saving notification config'})
                await saveNotifConfig(_form)
                closeAlert()
                navigate('/app/setup-notification')
                toast.success('Notification config has been saved.')
            }
        } catch(error) {
            console.log(error)
        }

    }

    return (
        <div className='page-create-config'>
            <form className='form-horizontal'>
                <div className='form-group row align-items-center'>
                    <Col xl="2" md="3">
                        <Form.Label>Department<sup>*</sup></Form.Label>
                    </Col>
                    <Col xl="3" md="3">
                        <Form.Select onChange={(event)=>setFormData({...formData, departement_id:event.target.value})}>
                            <option value="">Select Department</option>
                            { departments.map((row) => (<option key={`dep-${row.id}`} value={row.id}>{row.deptnotif_name}</option>) ) }
                        </Form.Select>
                    </Col>
                </div>

                <div className='form-group row align-items-center'>
                    <Col xl="2" md="3">
                        <Form.Label>Source Application<sup>*</sup></Form.Label>
                    </Col>
                    <Col xl="3" md="4">
                        <Form.Select onChange={(event)=>setFormData({...formData, app_id:event.target.value})}>
                            <option value="">Select Application</option>
                            { applicationSource.map((row) => (<option key={`app-${row.id}`} value={row.id} ref={inputRef.app_id}>{row.application_name}</option>) ) }
                        </Form.Select>
                    </Col>
                </div>

                <div className='form-group row align-items-center'>
                    <Col xl="2" md="3">
                        <Form.Label>Category<sup>*</sup></Form.Label>
                    </Col>
                    <Col xl="3" md="4">
                        <Form.Select onChange={(event)=>setFormData({...formData, category_id:event.target.value})}>
                            <option value="">Select Category</option>
                            { categories.map((row) => (<option key={`cat-${row.id}`} value={row.id}>{row.category_name}</option>) ) }
                        </Form.Select>
                    </Col>
                </div>

                <div className='form-group row align-items-center'>
                    <Col xl="2" md="3">
                        <Form.Label>Code<sup>*</sup></Form.Label>
                    </Col>
                    <Col xl="4" md="4">
                        <div className='d-flex align-items-center'>
                            <Form.Control type="text" style={{width:160}} placeholder="Contoh: OPS-01" onChange={(event)=>setFormData({...formData, code:event.target.value})} ref={inputRef.code} />
                            {/* <span className='ms-3'>last code: <strong>OPS-01</strong></span> */}
                        </div>
                    </Col>
                </div>

                <div className='form-group row align-items-center'>
                    <Col xl="2" md="3">
                        <Form.Label>Notification Name<sup>*</sup></Form.Label>
                    </Col>
                    <Col xl="5" md="9">
                        <Form.Control type="text" placeholder="Contoh: Kekurangan Dokumen" onChange={(event)=>setFormData({...formData, notif_name:event.target.value})} ref={inputRef.notif_name} />
                    </Col>
                </div>

                <div className='form-group row align-items-center'>
                    <Col xl="2" md="3">
                        <Form.Label>Description</Form.Label>
                    </Col>
                    <Col xl="5" md="9">
                        <Form.Control as="textarea" rows={3} onChange={(event)=>setFormData({...formData, notif_desc:event.target.value})} />
                    </Col>
                </div>

                <Tabs
                    id="tab-config"
                    activeKey={activeTab}
                    onSelect={(k) => setActiveTab(k)}
                    className="mb-3 mt-5"
                >
                    <Tab eventKey="wa" title="Whatsapp Config">
                        <TabWaSms initialForm={FORM_WA_OBJECT} />
                    </Tab>
                    <Tab eventKey="sms" title="SMS Config">
                        <TabWaSms initialForm={FORM_SMS_OBJECT} />
                    </Tab>
                    <Tab eventKey="email" title="Email Config">
                        <TabEmail />
                    </Tab>
                    <Tab eventKey="push" title="Push Notification Config">
                        <TabPushNotification />
                    </Tab>
                    <Tab eventKey="report" title="Transaction Report">
                        <TabReport />
                    </Tab>
                    <Tab eventKey="pdf" title="Setting PDF">
                        <TabSettingPdf />
                    </Tab>
                </Tabs>
                <div className="button-container">
                    <button className='btn btn-primary btn-lg' onClick={onSaveClicked}>Save Config</button>
                </div>
            </form>
        </div>
    )
}
