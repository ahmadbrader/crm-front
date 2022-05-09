import React, { useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { FaSortAmountDownAlt } from "react-icons/fa";
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { Button, Form, Modal } from 'react-bootstrap';

import 'assets/css/Datatable.scss';

import AppContext from 'utils/AppContext'
import ButtonAction from 'components/datatable/ButtonAction';
import { createDepartment, deleteDepartment, getDepartments, updateDepartment } from 'services/RestApi';

export default function SetupDepartment() {

    const {setPageData, pageData} = useContext( AppContext )
    const [ showEditModal, setShowEditModal ]  = useState(false)
    const [ showAddModal, setShowAddModal ]  = useState(false)
    const [ departmentData, setDepartmentData ] = useState([])
    const [ formModal, setFormModal ] = useState({id: '', deptnotif_name: ''})

    useEffect(()=>{
        setPageData({...pageData, active:'master-data', title: 'Department' })
        fetchData();
    },[])

    async function fetchData() {
        try {
            toast.loading('Fetching data...')
            let _response = await getDepartments();
            setDepartmentData(_response.data)
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
        setFormModal({...formModal, deptnotif_name: event.target.value})
    }

    const onSaveEdit = async () => {
        toast.loading('Saving data...')
        try {
            await updateDepartment(formModal) 
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
            await createDepartment(formModal.deptnotif_name)
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
            await deleteDepartment(item.id)
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
            name: 'Name',
            selector: row => row.deptnotif_name,
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
                    <Button variant="primary" onClick={onAdd}>Create New</Button>
                    <div></div>
                </div>

                <DataTable
                    columns={columns}
                    data={departmentData}
                    pagination
                    sortIcon={<FaSortAmountDownAlt size={"5px"} />}
                />
            </div>

            <Modal show={showEditModal} onHide={onHideEditModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Department</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='form-group'>
                        <Form.Label>Department Name</Form.Label>
                        <input type="text" className='form-control' onChange={onChangeEditName} defaultValue={formModal.deptnotif_name} placeholder='Type department name' />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onHideEditModal}>Close</Button>
                    <Button variant="primary" onClick={onSaveEdit}>Save Change</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAddModal} onHide={onHideAddModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Department</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='form-group'>
                        <Form.Label>Department Name</Form.Label>
                        <input type="text" className='form-control' onChange={onChangeEditName} defaultValue={formModal.deptnotif_name} placeholder='Type department name' />
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
