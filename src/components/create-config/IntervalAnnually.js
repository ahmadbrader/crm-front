import { INTERVAL_DAY_IN_MONTH, INTERVAL_MONTHS, INTERVAL_QUARTERLY } from 'config/scheduler'
import React, { useState, useEffect } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import TimePicker from 'react-bootstrap-time-picker';
import { timeFromInt } from 'time-number';

export default function IntervalAnnually({onFormUpdate=()=>{}}) {

    const [ time, setTime ] = useState(0)
    const [ date, setDate ] = useState(1)
    const [ month, setMonth ] = useState(1)

    useEffect(()=>{
        onFormUpdate(JSON.stringify({date, month, time: timeFromInt(time)}))
    },[])
    
    useEffect(()=>{
        onFormUpdate(JSON.stringify({date, month, time: timeFromInt(time)}))
    },[date, month, time])

    const onTimeChange = seconds => {
        setTime(seconds)
    };

    return (
        <>
            <InputGroup style={{width:135}}>
                <InputGroup.Text>Date</InputGroup.Text>
                <Form.Select style={{width:60, marginRight:10}} onChange={(event)=>setDate(parseInt(event.target.value))}>
                    { INTERVAL_DAY_IN_MONTH().map((row, index) => <option key={`int_day_month_${index}`} value={row}>{row}</option> )}
                </Form.Select>
            </InputGroup>
            <InputGroup style={{width:150}}>
                <InputGroup.Text>Month</InputGroup.Text>
                <Form.Select style={{width:60, marginRight:10}} onChange={(event)=>setMonth(parseInt(event.target.value))}>
                    { INTERVAL_MONTHS().map((row, index) => <option key={`int_day_month_${index}`} value={row}>{row}</option> )}
                </Form.Select>
            </InputGroup>
            <InputGroup style={{width:170}}>
                <InputGroup.Text>Time</InputGroup.Text>
                <TimePicker className="form-select" style={{width:50, marginRight:10}} start="00:00" end="23:00" step={30} format={24} value={time} onChange={onTimeChange}  />
            </InputGroup>
        </>
    )
}
