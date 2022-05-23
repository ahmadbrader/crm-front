import React, { useContext, useEffect, useState } from 'react'
import AppContext from 'utils/AppContext'
import { FaSortAmountDownAlt } from "react-icons/fa";
import  phoneIllustration from 'assets/images/phone-illustration.png'
import './styles.scss'
import { Link } from 'react-router-dom'
import { changeDocumentTitle } from 'utils/Helper'
import { Card, Col, Container, Row, Table } from 'react-bootstrap'
import { Button, Form, Modal } from 'react-bootstrap';
import toast from 'react-hot-toast'
import { getProspecting, getStatusByType, getActivityToday, getActivityMonth} from 'services/RestApi';
import dayjs from 'dayjs'
import DataTable from 'react-data-table-component'

export default function Dashboard() {

  const context = useContext( AppContext )
  const [ statusType, setStatusType ] = useState([])
  const [ noteContact, setNoteContact ] = useState("")
  const [ prospectingData, setProspectingData ] = useState([])
  const [ approachingData, setApproachingData ] = useState([])
  const [ presentationData, setPresentationData ] = useState([])
  const [ countActivity, setCountActivity ] = useState([])
  const [ countActivityMonth, setCountActivityMonth ] = useState([])
  const [ closingData, setClosingData ] = useState([])
  const [ showNoteModal, setShowNoteModal ]  = useState(false)


  useEffect(()=>{
    changeDocumentTitle('Dashboard')
    context.setPageData({...context.pageData, active:'dashboard', title: 'Dashboard' })
    fetchData()
},[])
async function fetchData() {
  try {
      toast.loading('Fetching data...')
      let _response = await getProspecting(1);
      let _responseApp = await getProspecting(2);
      let _responsePre = await getProspecting(4);
      let _responseClo = await getProspecting(5);
      let _status = await getStatusByType(1);
      let _rCount = await getActivityToday();
      let _rCount2 = await getActivityMonth();
      setStatusType(_status.data)
      setProspectingData(_response.data)
      setApproachingData(_responseApp.data)
      setPresentationData(_responsePre.data)
      setClosingData(_responseClo.data)
      setCountActivity(_rCount.data)
      setCountActivityMonth(_rCount2.data)
      toast.dismiss()
  } catch(error) {
      toast.dismiss()
      toast.error(`Error fetching data. ${error}`)
  }
}
const onShowModalNotes = (item) => {
  setNoteContact(item.notes_contact)
  setShowNoteModal(true)
}
const dateDiffRange = (date) => {

  var now = dayjs()
  return now.diff(date, 'day') + ' Days'
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
      name: 'Status',
      selector: row => row.name_status,
      sortable: true,
  },
  {
      name: 'Range',
      selector: row => <span>{ dateDiffRange(row.date_status) }</span>
  },
  {
      name: 'Last Contact',
      selector: row => <span>{ dayjs(row.date_status).format('DD/MM/YYYY') }</span>
  }
];
  return (
    <div className='page-application'>
    <div className='enotif-datatable'>
        <div className="datatable-head">
            {/* <Button variant="primary" onClick={onAdd}>Create New</Button> */}
            <div></div>
        </div>
            <Container>
                <Row>
                  <Col lg="3" className="mt-4">
                  <Card
                        bg='primary'
                        text='light'
                        style={{ width: '18rem' }}
                        className="mb-2"
                      >
                        <Card.Body>
                          <Card.Title>{prospectingData.length}</Card.Title>
                          <Card.Text>Prospecting
                          </Card.Text>
                        </Card.Body>
                    </Card>
                  </Col>
                  <Col lg="3" className="mt-4">
                    <Card
                        bg='info'
                        text='light'
                        style={{ width: '18rem' }}
                        className="mb-2"
                      >
                        <Card.Body>
                          <Card.Title>{approachingData.length}</Card.Title>
                          <Card.Text>Approaching
                          </Card.Text>
                        </Card.Body>
                    </Card>
                  </Col>
                  <Col lg="3" className="mt-4">
                    <Card
                        bg='warning'
                        text='light'
                        style={{ width: '18rem' }}
                        className="mb-2"
                      >
                        <Card.Body>
                          <Card.Title>{presentationData.length}</Card.Title>
                          <Card.Text>Presentation
                          </Card.Text>
                        </Card.Body>
                    </Card>
                  </Col>
                  <Col lg="3" className="mt-4">
                    <Card
                        bg='success'
                        text='light'
                        style={{ width: '18rem' }}
                        className="mb-2"
                      >
                        <Card.Body>
                          <Card.Title>{closingData.length}</Card.Title>
                          <Card.Text>Closing
                          </Card.Text>
                        </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row className='mt-4'>
                  <h4>Today's Activity</h4>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Type</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Prospecting</td>
                        <td>{countActivity.prospecting}</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Approaching</td>
                        <td>{countActivity.approaching}</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Presentaion</td>
                        <td>{countActivity.presentation}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Row>
                <Row className='mt-4'>
                  <h4>Month's Activity</h4>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Type</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Prospecting</td>
                        <td>{countActivityMonth.prospecting}</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Approaching</td>
                        <td>{countActivityMonth.approaching}</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Presentaion</td>
                        <td>{countActivityMonth.presentation}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Row>
                <Row className='mt-4'>
                  <h4>Prospecting Data</h4>
                  <DataTable
                      columns={columns}
                      data={prospectingData}
                      pagination
                      sortIcon={<FaSortAmountDownAlt size={"10px"} />}
                  />
                </Row>
            </Container>
    </div>
</div>
  )
}
