import { INTERVAL_DAYS } from 'config/scheduler'
import React, { useState, useEffect } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import TimePicker from 'react-bootstrap-time-picker';
import { timeFromInt } from 'time-number';

export default function IntervalWeekly({onFormUpdate=()=>{}}) {

    const [ time, setTime ] = useState(0)
    const [ day, setDay ] = useState(1)

    useEffect(()=>{
        onFormUpdate(JSON.stringify({day, time: timeFromInt(time)}))
    },[])

    useEffect(()=>{
        onFormUpdate(JSON.stringify({day, time: timeFromInt(time)}))
    },[day, time])

    const onTimeChange = seconds => {
        setTime(seconds)
    };

    return (
        <>
            <InputGroup style={{width:170}}>
                <InputGroup.Text>Day</InputGroup.Text>
                <Form.Select style={{width:100, marginRight:10}} onChange={(event)=>setDay(parseInt(event.target.value))}>
                    { INTERVAL_DAYS.map((row, index) => <option key={`int_day_week_${index}`} value={row.id}>{row.name}</option> )}
                </Form.Select>
            </InputGroup>
            <InputGroup style={{width:170}}>
                <InputGroup.Text>Time</InputGroup.Text>
                <TimePicker className="form-select" style={{width:50, marginRight:10}} start="00:00" end="23:00" step={30} format={24} value={time} onChange={onTimeChange}  />
            </InputGroup>
        </>
    )
}
