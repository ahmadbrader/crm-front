import React, { useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { FaSortAmountDownAlt } from "react-icons/fa";
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'assets/css/Datatable.scss';

import AppContext from 'utils/AppContext'
import ButtonAction from 'components/datatable/ButtonAction';
import { createApplication, deleteApplication, getProspecting, updateToApproaching, getStatusByType, changeStatusContact, getNotesByContact, getAllCompanies, getAllSales, filterProcess } from 'services/RestApi';


export default function Prospecting() {

    const {setPageData, pageData} = useContext( AppContext )
    const [ showEditModal, setShowEditModal ]  = useState(false)
    const [ showAddModal, setShowAddModal ]  = useState(false)
    const [ showEditStatus, setEditStatus ]  = useState(false)
    const [ showDetail, setShowDetail ]  = useState(false)
    const [ showNoteModal, setShowNoteModal ]  = useState(false)
    const [ prospectingData, setProspectingData ] = useState([])
    const [ listNote, setListNote ] = useState([])
    const [ formModal, setFormModal ] = useState([])
    const [ statusType, setStatusType ] = useState([])
    const [ rowFromStatus, setRowFromStatus ] = useState([])
    const [ idContact, setIdContact ] = useState("")
    const [ noteContact, setNoteContact ] = useState("")
    const [ idStatus, setStatusId ] = useState("")
    const [ companies, setCompany ] = useState([])
    const [ user, setUser ] = useState([])
    const [ formData, setFormData ] = useState({id_company:"all", id_sales:"all"})

    let navigate = useNavigate()
    useEffect(()=>{
        setPageData({...pageData, active:'process', title: 'Prospecting' })
        fetchData();
    },[])

    async function fetchData() {
        try {
            toast.loading('Fetching data...')
            let _responseC = await getAllCompanies();
            setCompany(_responseC.data)
            let _responseU = await getAllSales();
            setUser(_responseU.data)
            let _response = await getProspecting(1);
            let _status = await getStatusByType(1);
            setStatusType(_status.data)
            setProspectingData(_response.data)
            toast.dismiss()
        } catch(error) {
            toast.dismiss()
            toast.error(`Error fetching data. ${error}`)
        }
    }

    const onHideEditModal = () => {
        setShowEditModal(false)
    }
    const onHideEditStatusModal = () => {
        setNoteContact("")
        setEditStatus(false)
    }

    const onEdit = (item) => {
        setIdContact(item.id)
        setStatusId(item.id_status)
        setRowFromStatus(item)
        setNoteContact(item.notes_contact)
        setEditStatus(true)
    }

    const onHideAddModal = () => {
        setShowAddModal(false)
    }

    const onAdd = () => {
        setShowAddModal(true)
    }

    const onAction = (item) => {
        setFormModal({...formModal, ...item})
        setShowEditModal(true)
    }

    const onShowModalNotes = async (item) => {
        let _response = await getNotesByContact(item.id)
        setListNote(_response.data);
        setNoteContact(item.notes_contact)
        setShowNoteModal(true)
    }

    const onShowDetail = (item) => {
        setFormModal({...formModal, ...item})
        setShowDetail(true)
    }

    const onSaveEdit = async () => {
        toast.loading('Saving data...')
        try {
            await updateToApproaching(formModal) 
            toast.dismiss()
            fetchData()
            setShowEditModal(false)

        } catch(error) {
            toast.dismiss()
            toast.error('Error updating data.')
        }
    }

    const onFilter = async () => {
        toast.loading('Search data...')
        try {
            let _response = await filterProcess(1,formData) 
            toast.dismiss()
            setProspectingData(_response.data)
            setShowEditModal(false)

        } catch(error) {
            toast.dismiss()
            toast.error('Error updating data.')
        }
    }

    const onupdateStatus = async () => {
        toast.loading('Saving data...')
        let formData = new FormData();   

        formData.append('id_status', idStatus);   
        formData.append('notes', noteContact);
        try {
            await changeStatusContact(idContact, idStatus, formData) 
            toast.dismiss()
            if (idStatus == 3) {
                setEditStatus(false)
                fetchData()
                return onAction(rowFromStatus)
            }
            fetchData()
            setEditStatus(false)

        } catch(error) {
            toast.dismiss()
            toast.error('Error updating data.')
        }
    }

    const onDelete = async (item) => {
        try {
            toast.loading('Deleting data...')
            await deleteApplication(item.id)
            fetchData()
            toast.dismiss()
        } catch(error) {
            toast.dismiss()
            toast.error('Error deleting data.')
        }
    }

    const dateDiffRange = (date) => {

        var now = dayjs()
        var result = now.diff(date, 'day') + ' days'
        return result;
    }

    const onChangePhone = (event) => {
        setFormModal({...formModal, mobile_phone_contact: event.target.value})
    }
    const caseInsensitiveSort = (rowA, rowB) => {
        // const a = rowA.title.toLowerCase();
        // const b = rowB.title.toLowerCase();
    
        // if (a > b) {
        //     return 1;
        // }
    
        // if (b > a) {
        //     return -1;
        // }
    
        // return 0;
    };

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
            width: '5%'
        },
        {
            name: 'Company',
            selector: row => row.company_contact,
            sortable: true,
        },
        {
            name: 'Product From',
            selector: row => row.name_company,
            sortable: true,
            width: '10%'
        },
        {
            name: 'Name',
            selector: row => row.name_contact,
            sortable: true,
        },
        {
            name: 'Position',
            selector: row => row.position,
            sortable: true,
        },
        {
            name: 'Phone Contact',
            selector: row => row.mobile_phone_contact,
            sortable: true,
        },
        {
            name: 'Sales',
            selector: row => row.name_user,
            sortable: true,
        },
        {
            name: 'Note',
            selector: row => <Button variant="outline-success" onClick={()=>onShowModalNotes(row)}>Show</Button>,
            sortable: true,
        },
        {
            name: 'Detail',
            selector: row => <Button variant="outline-success" onClick={()=>onShowDetail(row)}>Show</Button>,
        },
        {
            name: 'Status',
            selector: row => row.name_status,
            sortable: true,
        },
        {
            name: 'Range',
            selector: row =>  dateDiffRange(row.date_status),
            sortable: true,
        },
        {
            name: 'Last Contact',
            selector: row => dayjs(row.date_status).format('DD/MM/YYYY'),
            sortable: true,
        },
        {
            name: 'Action',
            width: '16%',
            cell: (row) => <ButtonAction buttons={['action', 'editStatus']} onAction={onAction} onEdit={onEdit} data={row} />
        },
    ];

    return (
        <div className='page-application'>
            <Card body style={{marginBottom:'30px', paddingTop: 5, paddingBottom: 10}}>
                <div className='form-search'>
                    <Row>
                        <Col>
                            <div className="form-group">
                                <Form.Label>Product From</Form.Label>
                                <Form.Select  onChange={(event)=>setFormData({...formData, id_company:event.target.value})}>
                                    <option value="all">All</option>
                                    { companies.map((row) => (<option key={`${row.id}`} value={row.id}>{row.name_company}</option>) ) }
                                   
                                </Form.Select>
                            </div>
                        </Col>
                        <Col>
                            <div className="form-group">
                                <Form.Label>Sales</Form.Label>
                                <Form.Select onChange={(event)=>setFormData({...formData, id_sales:event.target.value})}>
                                    <option value="all">All</option>
                                    { user.map((row) => (<option key={`${row.id}`} value={row.id}>{row.name}</option>) ) }
                                </Form.Select>
                            </div>
                        </Col>
                        <Col lg="2" className='button-wrapper'>
                            <Button variant='primary' onClick={onFilter}>Search</Button>
                        </Col>
                    </Row>
                </div>
            </Card>
            <div className='enotif-datatable'>
                <div className="datatable-head">
                <Button variant="primary" onClick={()=>navigate('/app/process/prospecting/create')}>Create New</Button>
                    {/* <Button variant="primary" onClick={onAdd}>Create New</Button> */}
                    <div></div>
                </div>

                <DataTable
                    columns={columns}
                    data={prospectingData}
                    pagination
                    sortIcon={<FaSortAmountDownAlt size={"10px"} />}
                />
            </div>

            <Modal show={showEditModal} onHide={onHideEditModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Move to Approaching</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='form-group'>
                        <Form.Label>Company Name</Form.Label>
                        <input type="text" className='form-control' defaultValue={formModal.company_contact} readOnly/>
                    </div>
                    <div className='form-group'>
                        <Form.Label>Contact Number</Form.Label>
                        <input type="text" className='form-control' defaultValue={formModal.mobile_phone_contact} onChange={onChangePhone} required/>
                    </div>
                    <div className='form-group'>
                        <Form.Label>Email</Form.Label>
                        <input type="text" className='form-control' defaultValue={formModal.email_contact} onChange={(event)=>setFormModal({...formModal, email_contact: event.target.value})} />
                    </div>
                    <div className='form-group'>
                        <Form.Label>Notes</Form.Label>
                        <Form.Control as="textarea" rows={3} defaultValue={formModal.notes_contact} onChange={(event)=>setFormModal({...formModal, notes_contact: event.target.value})}/>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onHideEditModal}>Close</Button>
                    <Button variant="primary" onClick={onSaveEdit}>Update</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDetail} onHide={()=>setShowDetail(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Detail</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='form-group'>
                        <Form.Label>Company Name</Form.Label>
                        <input type="text" className='form-control' defaultValue={formModal.company_contact} readOnly/>
                    </div>
                    <div className='form-group mt-2'>
                        <Form.Label>Contact Name</Form.Label>
                        <input type="text" className='form-control' defaultValue={formModal.name_contact} readOnly/>
                    </div>
                    <div className='form-group mt-2'>
                        <Form.Label>Contact Number</Form.Label>
                        <input type="text" className='form-control' defaultValue={formModal.mobile_phone_contact} readOnly/>
                    </div>
                    <div className='form-group mt-2'>
                        <Form.Label>Email</Form.Label>
                        <input type="text" className='form-control' defaultValue={formModal.email_contact} readOnly />
                    </div>
                    <div className='form-group mt-2'>
                        <Form.Label>Product From</Form.Label>
                        <input type="text" className='form-control' defaultValue={formModal.name_company} readOnly />
                    </div>
                    <div className='form-group mt-2'>
                        <Form.Label>Sales</Form.Label>
                        <input type="text" className='form-control' defaultValue={formModal.name_user} readOnly />
                    </div>
                    <div className='form-group mt-2'>
                        <Form.Label>Status</Form.Label>
                        <input type="text" className='form-control' defaultValue={formModal.name_status} readOnly />
                    </div>
                    <div className='form-group mt-2'>
                        <Form.Label>Last Contact</Form.Label>
                        <input type="text" className='form-control' defaultValue={dayjs(formModal.date_status).format('DD/MM/YYYY')} readOnly />
                    </div>
                    <div className='form-group mt-2'>
                        <Form.Label>Last Notes</Form.Label>
                        <Form.Control as="textarea" rows={3} defaultValue={formModal.notes_contact} readOnly/>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setShowDetail(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditStatus} onHide={onHideEditStatusModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Status</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='form-group'>
                        <Form.Label>Status</Form.Label>
                        <Form.Select onChange={(event)=>setStatusId(event.target.value)} defaultValue={idStatus}>
                                { statusType.map((row) => (<option key={`${row.id}`} value={row.id}>{row.name_status}</option>) ) }
                        </Form.Select>
                    </div>
                    <div className='form-group mt-2'>
                        <Form.Label>Notes</Form.Label>
                        <Form.Control as="textarea" rows={3} defaultValue={noteContact} onChange={(event)=>setNoteContact(event.target.value)}/>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={onHideEditStatusModal}>Close</Button>
                    <Button variant="primary" onClick={onupdateStatus}>Save Data</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showNoteModal} onHide={()=>setShowNoteModal(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Notes</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {
                        listNote.map((row) => (
                        <div className='form-group mt-2' key={`${row.id}`}>
                            <Form.Label>{dayjs(row.created_at).format('DD/MM/YYYY')}</Form.Label>
                            <Form.Control as="textarea" rows={3} defaultValue={row.notes} readOnly />
                        </div>
                        ))
                    }
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={()=>setShowNoteModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
