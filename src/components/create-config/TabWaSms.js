import React, { useState, useEffect } from 'react'
import { Col, Form } from 'react-bootstrap'

import { FREQUENCY_LIST } from 'config/scheduler'
import { FORM_WA_OBJECT } from 'config/notification-data'

import IntervalMinute from './IntervalMinute'
import IntervalDaily from './IntervalDaily'
import IntervalWeekly from './IntervalWeekly'
import IntervalMonthly from './IntervalMonthly'
import IntervalQuarterly from './IntervalQuarterly'
import IntervalAnnually from './IntervalAnnually'
import IntervalSemester from './IntervalSemester'
import InputDatePicker from 'components/forms/Datepicker'
import TableSqlColumn from './TableSqlColumn';
import { setSessionConfigWa } from 'services/ConfigNotifSession'
import { parseDate } from 'utils/Helper'

export default function TabWaSms({initialForm={}}) {
    const [ frequencyType, setFrequencyType ] = useState('minute')
    const [ enableEndDate, setEnableEndDate] = useState(false)
    const [ formData, setFormData ] = useState(initialForm)

    useEffect(()=>{
        setSessionConfigWa(formData)
    }, [formData])

    const updateFrequency = (idFreq) => {
        setFormData({...formData, frequency: idFreq})
        setFrequencyType(idFreq)
    }

    return (
        <>
            <div className='row'>
                <Col lg="2" className="d-none d-xl-block"></Col>
                <div className="col-lg-5">
                    <div className='form-group'>
                        <TableSqlColumn columns={formData.column} onColumnAdded={(column)=> setFormData({...formData, column})} onRowDeleted={(column)=> setFormData({...formData, column})}  />
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

            <div className='form-group row mb-5'>
                <Col xl="2">
                    <Form.Label className='mt-3'>Template<sup>*</sup></Form.Label>
                </Col>
                <Col xl="8">
                    <Form.Control as="textarea" onChange={(event) => setFormData({...formData, template:event.target.value}) } rows={4} placeholder="Put your notification template here" />
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
                            <InputDatePicker onDateSelected={(_date) => setFormData({...formData, start_date:parseDate(_date, 'YYYY-MM-DD')})} />
                        </div>
                        <div className='form-group mb-0'>
                            <Form.Label className='mb-2'>End Date</Form.Label>
                            <div className='d-flex align-items-center'>
                                <Form.Check inline name="end-date" type="checkbox" checked={enableEndDate} onChange={() => setEnableEndDate(!enableEndDate)} />
                                <InputDatePicker disabled={!enableEndDate} onDateSelected={(_date) => setFormData({...formData, end_date:parseDate(_date, 'YYYY-MM-DD')})} />
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
                            <Form.Select onChange={(event)=> updateFrequency(event.target.value)} defaultValue={frequencyType}>
                                { FREQUENCY_LIST.map((row) => (<option key={`freq-${row.id}`} value={row.key}>{row.name}</option>)) }
                            </Form.Select>
                        </div>
                        <div className='form-group mb-0 ms-3 ms-xl-5'>
                            <Form.Label className='mb-2'>Interval</Form.Label>
                            <div className='d-flex'>
                                { frequencyType === 'minute' && (<IntervalMinute onFormUpdate={(value) => setFormData({...formData, interval:value})} />) }
                                { frequencyType === 'daily' && (<IntervalDaily onFormUpdate={(value) => setFormData({...formData, interval:value})} />) }
                                { frequencyType === 'weekly' && (<IntervalWeekly onFormUpdate={(value) => setFormData({...formData, interval:value})} />) }
                                { frequencyType === 'monthly' && (<IntervalMonthly onFormUpdate={(value) => setFormData({...formData, interval:value})} />) }
                                { frequencyType === 'quarterly' && (<IntervalQuarterly onFormUpdate={(value) => setFormData({...formData, interval:value})} />) }
                                { frequencyType === 'semester' && (<IntervalSemester onFormUpdate={(value) => setFormData({...formData, interval:value})} />) }
                                { frequencyType === 'annually' && (<IntervalAnnually onFormUpdate={(value) => setFormData({...formData, interval:value})} />) }
                            </div>
                        </div>
                    </div>
                </Col>
            </div>

            
        </>
    )
}
