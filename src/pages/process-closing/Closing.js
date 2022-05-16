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


export default function Closing() {

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
    let navigate = useNavigate()
    useEffect(()=>{
        setPageData({...pageData, active:'process', title: 'Closing' })
        fetchData();
    },[])

    async function fetchData() {
        try {
            toast.loading('Fetching data...')
            let _response = await getProspecting(5);
            let _status = await getStatusByType(4);
            setStatusType(_status.data)
            setProspectingData(_response.data)
            toast.dismiss()
        } catch(error) {
            toast.dismiss()
            toast.error(`Error fetching data. ${error}`)
        }
    }

    const onView = (item) => {
        navigate(`/app/setup-notification/view/${item.id}`)
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
        } catch (error) {
            toast.dismiss()
            toast.error('Error updating data.')
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
            name: 'Product From',
            selector: row => row.name_company,
            sortable: true,
            width: '10%'
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
            name: 'Sales',
            selector: row => row.name_user,
            sortable: true,
        },
        {
            name: 'Action',
            selector: row => <Button variant="outline-success" onClick={()=>navigate(`/app/process/closing/${row.id}`)}>Show Product</Button>,
            sortable: true,
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
        </div>
    )
}
