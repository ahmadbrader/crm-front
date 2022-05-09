import React, { useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { FaSortAmountDownAlt } from "react-icons/fa";
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { Button, Form, Modal } from 'react-bootstrap';

import 'assets/css/Datatable.scss';

import AppContext from 'utils/AppContext'
import ButtonAction from 'components/datatable/ButtonAction';
import { createApplication, deleteApplication, getProspecting, updateApplication } from 'services/RestApi';


export default function Probing() {

    const {setPageData, pageData} = useContext( AppContext )
    const [ showEditModal, setShowEditModal ]  = useState(false)
    const [ showAddModal, setShowAddModal ]  = useState(false)
    const [ applicationData, setApplicationData ] = useState([])
    const [ prospectingData, setProspectingData ] = useState([])
    const [ formModal, setFormModal ] = useState({id: '', application_name: ''})

    useEffect(()=>{
        setPageData({...pageData, active:'process', title: 'Probing' })
        fetchData();
    },[])

    async function fetchData() {
        try {
            toast.loading('Fetching data...')
            let _response = await getProspecting(3);
            console.log(_response)
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
        setFormModal({...formModal, ...item})
        setShowEditModal(true)
    }

    const onHideAddModal = () => {
        setShowAddModal(false)
    }

    const onAdd = () => {
        setShowAddModal(true)
    }

    const onChangeEditName = (event) => {
        setFormModal({...formModal, application_name: event.target.value})
    }

    const onChangeTask = (event) => {
        setFormModal({...formModal, task: event.target.value})
    }

    const onSaveEdit = async () => {
        toast.loading('Saving data...')
        try {
            await updateApplication(formModal) 
            toast.dismiss()
            fetchData()
            setShowEditModal(false)

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

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
            width: '8%'
        },
        {
            name: 'Company',
            selector: row => row.company_contact,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email_contact,
            sortable: true,
        },
        {
            name: 'Job',
            selector: row => row.job_contact,
            sortable: true,
        },
        {
            name: 'Phone Contact',
            selector: row => row.office_phone_contact,
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
            name: 'Created at',
            selector: row => <span>{ dayjs(row.create_date).format('DD/MM/YYYY') }</span>
        },
        {
            name: 'Action',
            width: '20%',
            cell: (row) => <ButtonAction buttons={['edit', 'delete']} onEdit={onEdit} onDelete={onDelete} data={row} />
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

            <Modal show={showAddModal} onHide={onHideAddModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Application Source</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='form-group'>
                        <Form.Label>Application Name</Form.Label>
                        <input type="text" className='form-control' onChange={onChangeEditName} placeholder='Type the application name' />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={onHideAddModal}>Close</Button>
                    <Button variant="primary" onClick={onSaveAdd}>Save Data</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
