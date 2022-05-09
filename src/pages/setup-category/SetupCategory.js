import React, { useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { FaSortAmountDownAlt } from "react-icons/fa";
import dayjs from 'dayjs';

import 'assets/css/Datatable.scss';

import AppContext from 'utils/AppContext'
import ButtonAction from 'components/datatable/ButtonAction';
import { Button, Form, Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { createCategory, deleteCategory, getCategories, updateCategory } from 'services/RestApi';


export default function SetupCategory() {

    const { setPageData, pageData } = useContext( AppContext )
    const [ showEditModal, setShowEditModal ]  = useState(false)
    const [ showAddModal, setShowAddModal ]  = useState(false)
    const [ categoryData, setCategoryData ] = useState([])
    const [ formModal, setFormModal ] = useState({id: '', category_name: ''})

    useEffect(()=>{
        setPageData({...pageData, active:'master-data', title: 'Category' })
        fetchData();
    },[])

    async function fetchData() {
        try {
            toast.loading('Fetching data...')
            let _response = await getCategories();
            setCategoryData(_response.data)
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
        setFormModal({...formModal, category_name: event.target.value})
    }

    const onSaveEdit = async () => {
        toast.loading('Saving data...')
        try {
            await updateCategory(formModal) 
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
            await createCategory(formModal.category_name)
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
            await deleteCategory(item.id)
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
            selector: row => row.category_name,
            sortable: true,
        },
        {
            name: 'Created at',
            selector: row => <span>{ dayjs(row.create_date).format('DD/MM/YYYY') }</span>
        },
        {
            name: 'Action',
            width: '20%',
            cell: (row) => <ButtonAction buttons={['edit', 'delete']}  onEdit={onEdit} onDelete={onDelete} data={row} />
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
                    data={categoryData}
                    pagination
                    sortIcon={<FaSortAmountDownAlt size={"5px"} />}
                />
            </div>

            <Modal show={showEditModal} onHide={onHideEditModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='form-group'>
                        <Form.Label>Category Name</Form.Label>
                        <input type="text" className='form-control' onChange={onChangeEditName} defaultValue={formModal.category_name} placeholder='Type category name' />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onHideEditModal}>Close</Button>
                    <Button variant="primary" onClick={onSaveEdit}>Save Change</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAddModal} onHide={onHideAddModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='form-group'>
                        <Form.Label>Category Name</Form.Label>
                        <input type="text" className='form-control' onChange={onChangeEditName} placeholder='Type category name' />
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
