import React, { useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { FaSortAmountDownAlt } from "react-icons/fa";
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { Button, Form, Modal } from 'react-bootstrap';

import 'assets/css/Datatable.scss';

import AppContext from 'utils/AppContext'
import ButtonAction from 'components/datatable/ButtonAction';
import { createApplication, deleteApplication, getProspecting, updateApplication, changeStatusContact, getStatusByType, updateToClosing, addProduct } from 'services/RestApi';
import { useNavigate } from 'react-router-dom';


export default function Presentation() {
    let navigate = useNavigate()
    const {setPageData, pageData} = useContext( AppContext )
    const [ showEditModal, setShowEditModal ]  = useState(false)
    const [ showAddModal, setShowAddModal ]  = useState(false)
    const [ showProductModal, setShowProductModal ]  = useState(false)
    const [ applicationData, setApplicationData ] = useState([])
    const [ prospectingData, setProspectingData ] = useState([])
    const [ formModal, setFormModal ] = useState({id: '', application_name: ''})
    const [ showEditStatus, setEditStatus ]  = useState(false)
    const [ showNoteModal, setShowNoteModal ]  = useState(false)
    const [ rowFromStatus, setRowFromStatus ] = useState([])
    const [ idContact, setIdContact ] = useState("")
    const [ noteContact, setNoteContact ] = useState("")
    const [ idStatus, setStatusId ] = useState("")
    const [ statusType, setStatusType ] = useState([])
    const [ formAddProduct, setFormAddProduct ] = useState({contact_id: 0, name_product: 'String', qty : '', price : ''})

    useEffect(()=>{
        setPageData({...pageData, active:'process', title: 'Presentation' })
        fetchData();
    },[])

    async function fetchData() {
        try {
            toast.loading('Fetching data...')
            let _response = await getProspecting(4);
            let _status = await getStatusByType(4);
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

    const onEdit = (item) => {
        setIdContact(item.id)
        setStatusId(item.id_status)
        setRowFromStatus(item)
        setNoteContact(item.notes_contact)
        setEditStatus(true)
    }

    const onAction = (item) => {
        setIdContact(item.id)
        setFormModal({...formModal, ...item})
        setShowEditModal(true)
    }

    const onSaveAddProduct = async () => {
        toast.loading('Saving data...')
        try {
            await addProduct(formAddProduct)
            setShowProductModal(false)
            toast.dismiss()
            navigate(`/app/process/closing/${idContact}`)
        } catch (error) {
            toast.dismiss()
            toast.error('Error updating data.')
        }
    }

    const onChangeEditName = (event) => {
        setFormModal({...formModal, application_name: event.target.value})
    }

    const onSaveEdit = async () => {
        toast.loading('Saving data...')
        setFormAddProduct({...formAddProduct, contact_id:idContact})
        try {
            await updateToClosing(formModal) 
            toast.dismiss()
            fetchData()
            setShowEditModal(false)
            setShowProductModal(true)

        } catch(error) {
            toast.dismiss()
            toast.error('Error updating data.')
        }
    }

    const onSaveAdd = async () => {
        toast.loading('Saving new data...')
        try {
            await createApplication(formModal.application_name)
            toast.dismiss()
            fetchData()
            setShowAddModal(false)
            toast.success('Data has been created')
        } catch(error) {
            toast.dismiss()
            toast.error('Error saving data.')
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
        return now.diff(date, 'day') + ' Days'
    }

    const onShowModalNotes = (item) => {
        setNoteContact(item.notes_contact)
        setShowNoteModal(true)
    }

    const onChangeDateExe = (event) => {
        var dateExe = new Date(event.target.value);
        setFormModal({...formModal, date_approaching: dateExe.toISOString().split('T')[0]})
    }

    const onupdateStatus = async () => {
        toast.loading('Saving data...')
        let formData = new FormData();   

        formData.append('id_status', idStatus);   
        formData.append('notes', noteContact);
        try {
            await changeStatusContact(idContact, idStatus, formData) 
            toast.dismiss()
            if (idStatus == 7) {
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
            name: 'type',
            selector: row => row.type_of_prospect,
            sortable: true,
            width: '5%'
        },
        {
            name: 'Email',
            selector: row => row.email_contact,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name_contact,
            sortable: true,
        },
        {
            name: 'Phone Contact',
            selector: row => row.mobile_phone_contact,
            sortable: true,
        },
        {
            name: 'Product',
            selector: row => row.product_temp,
            sortable: true,
        },
        {
            name: 'Sales',
            selector: row => row.name_user,
            sortable: true,
        },
        {
            name: 'Range',
            selector: row => <span>{ dateDiffRange(row.date_status) }</span>,
            sortable: true,
        },
        {
            name: 'Last Contact',
            selector: row => <span>{ dayjs(row.date_status).format('DD/MM/YYYY') }</span>
        },
        {
            name: 'Status',
            selector: row => row.name_status
        },
        {
            name: 'Note',
            selector: row => <Button variant="outline-success" onClick={()=>onShowModalNotes(row)}>Show</Button>,
            sortable: true,
        },
        {
            name: 'Action',
            width: '20%',
            cell: (row) => <ButtonAction buttons={['action', 'editStatus']} onAction={onAction} onEdit={onEdit} data={row} />
        },
    ];

    return (
        <div className='page-application'>
            <div className='enotif-datatable'>
                <div className="datatable-head">
                    {/* <Button variant="primary" onClick={onAdd}>Create New</Button> */}
                    <div></div>
                </div>

                <DataTable
                    columns={columns}
                    data={prospectingData}
                    pagination
                    sortIcon={<FaSortAmountDownAlt size={"5px"} />}
                />
            </div>

            <Modal show={showEditModal} onHide={onHideEditModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Application Source</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='form-group'>
                        <Form.Label>Application Name</Form.Label>
                        <input type="text" className='form-control' onChange={onChangeEditName} defaultValue={formModal.application_name} placeholder='Type the application name' />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onHideEditModal}>Close</Button>
                    <Button variant="primary" onClick={onSaveEdit}>Save Change</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showProductModal} onHide={()=>setShowProductModal(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='form-group'>
                        <Form.Label>Product Name</Form.Label>
                        <input type="text" className='form-control' onChange={(event)=>setFormAddProduct({...formAddProduct, name_product:event.target.value})} placeholder='Type the application name' />
                    </div>
                    <div className='form-group'>
                        <Form.Label>Price</Form.Label>
                        <input type="text" className='form-control' onChange={(event)=>setFormAddProduct({...formAddProduct, price:event.target.value})} defaultValue={formModal.application_name} placeholder='Type the application name' />
                    </div>
                    <div className='form-group'>
                        <Form.Label>Qty</Form.Label>
                        <input type="text" className='form-control' onChange={(event)=>setFormAddProduct({...formAddProduct, qty:event.target.value})} defaultValue={formModal.application_name} placeholder='Type the application name' />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setShowProductModal(false)}>Close</Button>
                    <Button variant="primary" onClick={onSaveAddProduct}>Save Change</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditModal} onHide={onHideEditModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Move to Closing</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='form-group'>
                        <Form.Label>Company Name</Form.Label>
                        <input type="text" className='form-control' defaultValue={formModal.company_contact} readOnly/>
                    </div>
                    <div className='form-group'>
                        <Form.Label>Product</Form.Label>
                        <input type="text" className='form-control' defaultValue={formModal.product_temp} readOnly />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onHideEditModal}>Close</Button>
                    <Button variant="primary" onClick={onSaveEdit}>Save Change</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showNoteModal} onHide={()=>setShowNoteModal(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Notes</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='form-group'>
                        <Form.Label>Notes</Form.Label>
                        <Form.Control as="textarea" rows={3} defaultValue={noteContact} readOnly />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={()=>setShowNoteModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditStatus} onHide={()=>setEditStatus(false)} backdrop="static" keyboard={false}>
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
                    <Button variant="outline-secondary" onClick={()=>setEditStatus(false)}>Close</Button>
                    <Button variant="primary" onClick={onupdateStatus}>Save Data</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
