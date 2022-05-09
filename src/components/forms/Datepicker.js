import React, { forwardRef, useState } from 'react'
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

export default function InputDatePicker({onDateSelected=()=>{}, disabled}) {
    const [startDate, setStartDate] = useState(new Date());

    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <div className={`enotif-datepicker ${disabled ? 'disabled' : 'enable'}`}>
            <Form.Control defaultValue={value} onClick={onClick} ref={ref} disabled={disabled} />
            <div className='icon' onClick={onClick}>
                <FaCalendarAlt />
            </div>
        </div>
    ));

    const onChange = (date) => {
        setStartDate(date)
        onDateSelected(date)
    }

    return (
        <>
            <DatePicker selected={startDate} onChange={onChange} customInput={<CustomInput />} minDate={new Date()} dateFormat="dd/MM/yyyy" />
        </>
    )
}
