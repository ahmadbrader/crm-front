import React, { useState } from 'react'
import { Col, Form, FormControl, InputGroup, Button, Modal } from 'react-bootstrap'
import TableSqlColumn from './TableSqlColumn'

import IntervalMinute from './IntervalMinute'
import IntervalDaily from './IntervalDaily'
import IntervalWeekly from './IntervalWeekly'
import IntervalMonthly from './IntervalMonthly'
import IntervalQuarterly from './IntervalQuarterly'
import IntervalAnnually from './IntervalAnnually'
import IntervalSemester from './IntervalSemester'
import InputDatePicker from 'components/forms/Datepicker'

import { FORM_SETTING_PDF_OBJECT } from 'config/notification-data'
import { FREQUENCY_LIST } from 'config/scheduler'

export default function TabSettingPdf() {

    const [ formData, setFormData ] = useState(FORM_SETTING_PDF_OBJECT);
    const [ addFieldModal, setAddFieldModal ] = useState(false)
    const [ frequencyType, setFrequencyType ] = useState(1)
    const [ enableEndDate, setEnableEndDate] = useState(false)
    const [ columnData, setColumnData ] = useState([])
    const [ focusFieldData, setFocusFieldData ] = useState(''); // storage | filename
    
    const onInsertField = (item) => {
        if( focusFieldData === 'storage' ) setFormData({...formData, storage_location: `${formData.storage_location}[${item.col_name}]`});
        if( focusFieldData === 'filename' ) setFormData({...formData, filename: `${formData.filename}[${item.col_name}]`});
        setAddFieldModal(false)
    }

    const openAddFieldModal = (selectedField) => {
        setFocusFieldData(selectedField)
        setAddFieldModal(true)
    }

    return (
        <>
            <div className='row'>
                <Col lg="2" className="d-none d-xl-block"></Col>
                <div className="col-lg-5">
                    <div className='form-group'>
                        <TableSqlColumn columns={columnData} onColumnAdded={(column)=>setColumnData(column)} onRowDeleted={(column)=>setColumnData(column)}  />
                    </div>
                </div>
            </div>

            <div className='form-group row'>
                <Col xl="2" >
                    <Form.Label className='mt-3'>SQL Query<sup>*</sup></Form.Label>
                </Col>
                <Col xl="8">
                    <Form.Control as="textarea" onChange={(event) => setFormData({...formData, sql_query:event.target.value}) } rows={4} placeholder="Type your SQL query here" />
                </Col>
            </div>

            <div className='form-group row align-items-center'>
                <Col xl="2" md="3">
                    <Form.Label>URL Link<sup>*</sup></Form.Label>
                </Col>
                <Col xl="5" md="9">
                    <Form.Control type="text" placeholder="Contoh: Kekurangan Dokumen" onChange={(event)=>setFormData({...formData, notif_name:event.target.value})} />
                </Col>
            </div>

            <div className='form-group row align-items-center'>
                <Col xl="2" md="3">
                    <Form.Label>Upload Template</Form.Label>
                </Col>
                <Col xl="3" md="4">
                    <Form.Control type="file" />
                </Col>
            </div>

            <div className='form-group row align-items-center'>
                <Col xl="2" md="3">
                    <Form.Label>Storage Location</Form.Label>
                </Col>
                <Col xl="8" md="8">
                    <div className='d-flex'>
                        <FormControl placeholder="//Storage/Documents/" value={formData.storage_location} onChange={(event)=> setFormData({...formData, storage_location: event.target.value})} />
                        <Button variant="primary" style={{width:130, marginLeft:10}} onClick={()=>openAddFieldModal('storage')}>Insert Field</Button>
                    </div>
                </Col>
            </div>

            <div className='form-group row align-items-center'>
                <Col xl="2" md="3">
                    <Form.Label>Filename</Form.Label>
                </Col>
                <Col xl="8" md="8">
                    <div className='d-flex'>
                        <InputGroup>
                            <FormControl placeholder="Kekurangan dokumen" value={formData.filename} onChange={(event)=> setFormData({...formData, filename: event.target.value})} />
                            <InputGroup.Text>.pdf</InputGroup.Text>
                        </InputGroup>
                        <Button variant="primary" style={{width:130, marginLeft:10}} onClick={()=>openAddFieldModal('filename')}>Insert Field</Button>
                    </div>
                </Col>
            </div>

            <div className='form-group row align-items-center mb-4'>
                <Col xl="2" md="3">
                    <Form.Label>Config Scheduler<sup>*</sup></Form.Label>
                </Col>
                <Col xl="8" md="9">
                    <div className='d-flex'>
                        <div className='form-group mb-0'>
                            <Form.Label className='mb-2'>Start Date</Form.Label>
                            <InputDatePicker />
                        </div>
                        <div className='form-group mb-0'>
                            <Form.Label className='mb-2'>End Date</Form.Label>
                            <div className='d-flex align-items-center'>
                                <Form.Check inline name="end-date" type="checkbox" checked={enableEndDate} onChange={() => setEnableEndDate(!enableEndDate)} />
                                <InputDatePicker disabled={!enableEndDate} />
                            </div>
                        </div>
                    </div>
                </Col>
            </div>

            <div className='form-group row align-items-center'>
                <Col xl="2" md="3">
                    <Form.Label>Delivery Method<sup>*</sup></Form.Label>
                </Col>
                <Col xl="10" md="9">
                    <div className='d-flex'>
                        <div className='form-group mb-0' style={{width:150}}>
                            <Form.Label className='mb-2'>Frequency</Form.Label>
                            <Form.Select onChange={(event)=>setFrequencyType(parseInt(event.target.value))} defaultValue={frequencyType}>
                                { FREQUENCY_LIST.map((row) => (<option key={`freq-${row.id}`} value={row.id}>{row.name}</option>)) }
                            </Form.Select>
                        </div>
                        <div className='form-group mb-0 ms-3 ms-xl-5'>
                            <Form.Label className='mb-2'>Interval</Form.Label>
                            <div className='d-flex'>
                                { frequencyType === 1 && (<IntervalMinute />) }
                                { frequencyType === 2 && (<IntervalDaily />) }
                                { frequencyType === 3 && (<IntervalWeekly />) }
                                { frequencyType === 4 && (<IntervalMonthly />) }
                                { frequencyType === 5 && (<IntervalQuarterly />) }
                                { frequencyType === 6 && (<IntervalSemester />) }
                                { frequencyType === 7 && (<IntervalAnnually />) }
                            </div>
                        </div>
                    </div>
                </Col>
            </div>

            <Modal show={addFieldModal} onHide={()=>setAddFieldModal(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Field</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <table className='table table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th>Column Name</th>
                                <th>Type</th>
                                <th width="5%">Action</th> 
                            </tr>
                        </thead>
                        <tbody>
                            { columnData.map((row, index) => {
                                return (
                                    <tr key={`table-column-${index}`}>
                                        <td>{row.col_name}</td>
                                        <td>{row.col_type}</td>
                                        <td className='text-danger'>
                                            <Button variant="primary" size="sm" onClick={()=>onInsertField(row)}>Insert</Button>
                                        </td>
                                    </tr>
                                )
                            })}

                            { columnData.length <= 0 && (
                                <tr>
                                    <td colSpan={4}>Empty column data.</td>
                                </tr>  
                            ) }
                        </tbody>
                    </table>
                </Modal.Body>
            </Modal>
        </>
    )
}

