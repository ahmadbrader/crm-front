import React, { useCallback, useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { FaSortAmountDownAlt } from "react-icons/fa";

import 'assets/css/Datatable.scss';

import AppContext from 'utils/AppContext'
import ButtonAction from 'components/datatable/ButtonAction';
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'
import { closeAlert, showAlert, showAlertLoader } from 'utils/Alert';
import { parseDate } from 'utils/Helper';
import toast from 'react-hot-toast';
import { deleteNotifConfig, getDepartments, getNotifConfig, updateStatusNotifConfig } from 'services/RestApi';

const data = [
    {
        id: 1,
        department: 'Operations',
        category: 'Kategori 1',
        notification_name: 'Kekurangan dokumen',
        created_at: '01/04/2022',
        user: 'User 1',
        status: 1,
    },
    {
        id: 2,
        department: 'New Business',
        category: 'Kategori 2',
        notification_name: 'Gagal Transfer',
        created_at: '02/04/2022',
        user: 'User 1',
        status: 0,
    },
]

export default function ListNotification() {

    const {setPageData, pageData} = useContext( AppContext )
    const [ departments, setDepartments ] = useState([])
    const [ listConfig, setListConfig ] = useState([])

    let navigate = useNavigate()

    useEffect(()=>{
        setPageData({...pageData, active:'setup-notification', title: 'List Notification Config' })
        fetchData()
    },[])

    const fetchData = useCallback(async() => {
        try {

            let _list = await getNotifConfig()
            setListConfig(_list.data)
            
            let _departments = await getDepartments()
            setDepartments(_departments.data)

        } catch(error) {
            console.log(error)
            toast.error(`Error getting data department, application, and category. ${error}`)
        }

    },[])

    const onEdit = () => {

    }

    const onDelete = async (item) => {
        try {
            toast.loading('Deleting data...')
            await deleteNotifConfig(item.id)
            fetchData()
            toast.dismiss()
        } catch(error) {
            toast.dismiss()
            toast.error('Error deleting data.')
        }
    }

    const pauseToggle = async (item) => {
        let action = item.status_pause ? 'Start' : 'Pause'
        let { isConfirmed, value } = await showAlert({
            title: `${action} Config Scheduler`,
            text: `Are you sure want to ${action.toLowerCase()} this config scheduler?`,
            showCancelButton:true,
            confirmButtonText: `Yes, ${action} Config`
        }, 'no-icon')

        try {
            if( isConfirmed && value ) {
                // console.log(item.status_pause, item.status_pause ? 0 : 1)
                showAlertLoader({
                    title: item.status_pause ? 'Stopping Config' : 'Starting Config',
                    text: 'Please wait while system updating config data'
                })
                await updateStatusNotifConfig({id: item.id, status: item.status_pause ? 0 : 1})
                closeAlert();
                toast.success(`Config data has been updated`)
                fetchData()
            }
        } catch (error) {
            showAlert({
                icon: 'error',
                title: 'Update config Error!',
                text: `Updating data error. ${error}`,
                showConfirmButton: true
            })
        }

    }

    const columns = [
        {
            name: 'ID',
            selector: row => row.application_id,
            sortable: true,
            width: '40px'
        },
        {
            name: 'Status',
            cell: (row) => !row.status_pause ? <span className="text-success"><strong>Active</strong></span> : <span className="text-muted"><strong>Paused</strong></span>,
            width: '80px'
        },
        {
            name: 'Created by',
            selector: row => row.created_by ? row.created_by : '-',
            width: '120px'
        },
        {
            name: 'Department',
            selector: row => row.deptnotif_name,
            sortable: true,
            width: '180px'
        },
        {
            name: 'Notification Name',
            selector: row => row.notif_name,
            sortable: true,
        },
        {
            name: 'Created at',
            selector: row => parseDate(row.created_date),
            width: '120px'
        },
        {
            name: 'Action',
            width: '280px',
            cell: (row) => {
                let _deleteOptions = {
                    title: 'Confirm Delete Config',
                    text: 'Are you sure want to delete this config?',
                    confirmButtonText: 'Yes, Delete Config',
                }
                return (
                    <ButtonAction buttons={['view', 'delete']} onEdit={onEdit} onDelete={onDelete} buttonDeleteOnlyIcon={true} deleteAlertParams={_deleteOptions} data={row} seperateDeleteButton={true} >
                        {!row.status_pause ? (<Button onClick={()=>pauseToggle(row)} size="sm" variant="outline-dark"><FaPauseCircle/> Pause</Button>) : (<Button onClick={()=>pauseToggle(row)} size="sm" variant="outline-dark"><FaPlayCircle/> Start</Button>) }
                    </ButtonAction>
                )
            }
        },
    ];

    return (
        <div className='page-application'>
            <Card body style={{marginBottom:'30px', paddingTop: 5, paddingBottom: 10}}>
                <div className='form-search'>
                    <Row>
                        <Col>
                            <div className="form-group">
                                <Form.Label>Department</Form.Label>
                                <Form.Select>
                                    <option value="all">All Department</option>
                                    { departments.map((row) => (<option key={`dep-${row.id}`} value={row.id}>{row.deptnotif_name}</option>) ) }
                                </Form.Select>
                            </div>
                        </Col>
                        <Col>
                            <div className="form-group">
                                <Form.Label>Code</Form.Label>
                                <Form.Control type='text' placeholder='Contoh: OPS-01' />
                            </div>
                        </Col>
                        <Col lg="4">
                            <div className="form-group">
                                <Form.Label>Notification Name</Form.Label>
                                <Form.Control type='text' placeholder='Contoh: Kekurangan dokumen' />
                            </div>
                        </Col>
                        <Col lg="2" className='button-wrapper'>
                            <Button variant='primary'>Search</Button>
                        </Col>
                    </Row>
                </div>
            </Card>

            <div className='enotif-datatable size-sm'>
                <div className="datatable-head">
                    <h2 className='datatable-title'>Notification Data</h2>
                    <Button variant="primary" onClick={()=>navigate('/app/setup-notification/create')}>Create New</Button>
                </div>

                <DataTable
                    columns={columns}
                    data={listConfig}
                    pagination
                    sortIcon={<FaSortAmountDownAlt size={"5px"} />}
                />
            </div>
        </div>
    )
}
