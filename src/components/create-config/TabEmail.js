import React, { useCallback, useState } from 'react'
import { Button, Col, Form, Modal } from 'react-bootstrap'
import { FaTrash } from "react-icons/fa";
import toast from 'react-hot-toast';
import { findIndex } from "lodash"

import { FREQUENCY_LIST } from 'config/scheduler'
import IntervalMinute from './IntervalMinute'
import IntervalDaily from './IntervalDaily'
import IntervalWeekly from './IntervalWeekly'
import IntervalMonthly from './IntervalMonthly'
import IntervalQuarterly from './IntervalQuarterly'
import IntervalAnnually from './IntervalAnnually'
import IntervalSemester from './IntervalSemester'
import InputDatePicker from 'components/forms/Datepicker'
import TableSqlColumn from './TableSqlColumn';

export default function TabEmail() {
    const [ frequencyType, setFrequencyType ] = useState(1)
    const [ enableEndDate, setEnableEndDate] = useState(false)
    const [ columnData, setColumnData ] = useState([])

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
                    <Form.Control as="textarea" rows={4} placeholder="Type your SQL query here" />
                </Col>
            </div>

            <div className='form-group row mb-5'>
                <Col xl="2">
                    <Form.Label className='mt-3'>Email Subject<sup>*</sup></Form.Label>
                </Col>
                <Col xl="8">
                    <Form.Control />
                </Col>
            </div>

            <div className='form-group row mb-5'>
                <Col xl="2">
                    <Form.Label className='mt-3'>Body Email<sup>*</sup></Form.Label>
                </Col>
                <Col xl="8">
                    <Form.Control as="textarea" rows={4} placeholder="Put your notification template here" />
                </Col>
            </div>

            <div className='form-group row mb-5'>
                <Col xl="2">
                    <Form.Label className='mt-3'>Attachment</Form.Label>
                </Col>
                <Col md="4">
                    <Form.Control type="file" />
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

            
        </>
    )
}
