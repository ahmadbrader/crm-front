import React, { useState, useEffect } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import TimePicker from 'react-bootstrap-time-picker';
import { timeFromInt } from 'time-number';

export default function IntervalDaily({onFormUpdate=()=>{}}) {

    const [ time, setTime ] = useState(0)

    useEffect(()=>{
        onFormUpdate(JSON.stringify({'time':timeFromInt(time)}))
    },[])

    const onTimeChange = seconds => {
        setTime(seconds)
        onFormUpdate(JSON.stringify({'time':timeFromInt(seconds)}))
    };

    return (
        <>
            <InputGroup style={{width:170}}>
                <InputGroup.Text id="basic-addon1">Time</InputGroup.Text>
                <TimePicker className="form-select" style={{width:50, marginRight:10}} start="00:00" end="23:00" step={30} format={24} value={time} onChange={onTimeChange}  />
            </InputGroup>
        </>
    )
}
