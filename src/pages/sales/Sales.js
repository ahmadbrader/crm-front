import React, { useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { FaSortAmountDownAlt } from "react-icons/fa";
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap';

import 'assets/css/Datatable.scss';

import AppContext from 'utils/AppContext'
import ButtonAction from 'components/datatable/ButtonAction';
import { getAllSales, getResetPassowordByid } from 'services/RestApi';
import { getRole } from 'services/GlobalVariable';


export default function Sales() {

    const {setPageData, pageData} = useContext( AppContext )
    const [ showEditModal, setShowEditModal ]  = useState(false)
    const [ showAddModal, setShowAddModal ]  = useState(false)
    const [ applicationData, setApplicationData ] = useState([])
    const [ prospectingData, setProspectingData ] = useState([])
    const [ formModal, setFormModal ] = useState({id: '', application_name: ''})
    const [ user, setUser ] = useState([])

    useEffect(()=>{
        setPageData({...pageData, active:'sales', title: 'Sales' })
        fetchData();
    },[])

    async function fetchData() {
        try {
            toast.loading('Fetching data...')
            let _response = await getAllSales();
            setUser(_response.data)
            toast.dismiss()
        } catch(error) {
            toast.dismiss()
            toast.error(`Error fetching data. ${error}`)
        }
    }


    const onReset = async (row) => {
        console.log(row)
        try {
            toast.loading('Reset Password...')
            await getResetPassowordByid(row.id)
            fetchData()
            toast.dismiss()
        } catch(error) {
            toast.dismiss()
            toast.error('Error reset password.')
        }
    }


    return (
        <div className='page-application'>
            <div className='enotif-datatable'>
                <div className="datatable-head">
                    {/* <Button variant="primary" onClick={onAdd}>Create New</Button> */}
                    <div></div>
                </div>
                    <Container>
                        <Row>
                        {
                         user.map((row) => (
                            <Col lg="3" key={`${row.id}`} className="mt-4">
                                <Card style={{ width: '15rem' }}>
                                    <Card.Img variant="top" src="/default_image.png" width={1} />
                                    <Card.Body>
                                        <Card.Title>{row.name}</Card.Title>
                                        <Card.Text>
                                            {row.email}
                                        </Card.Text>
                                        { getRole() == 'Admin' &&
                                            <Button variant="warning" onClick={()=>onReset(row)}>Reset Password</Button>
                                        }
                                        
                                    </Card.Body>
                                </Card>
                            </Col>
                         ) ) }
                        </Row>
                    </Container>
            </div>
        </div>
    )
}
