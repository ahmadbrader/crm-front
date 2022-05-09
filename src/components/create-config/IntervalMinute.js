import React, {useEffect} from 'react'
import { Form } from 'react-bootstrap'

export default function IntervalMinute({onFormUpdate=()=>{}}) {
  return (
    <Form.Control type="number" placeholder='30' min={1} onChange={(event)=> onFormUpdate(event.target.value)} style={{width:80}} />
  )
}
