import React, { useCallback, useState } from 'react'
import { findIndex, remove } from 'lodash'
import toast from 'react-hot-toast'
import { Form, Modal, Button } from 'react-bootstrap'
import { FaTrash } from "react-icons/fa";
import { showAlert } from 'utils/Alert';

export default function TableSqlColumn({columns=[], onColumnAdded=()=>{}, onRowDeleted=()=>{}}) {
    const [ formColumnModal, setFormColumnModal ] = useState({col_name: '', col_type: 'String'})

    const onSaveColumnModal = useCallback(()=>{
        if(formColumnModal.col_name === '') {
            toast.error('Column name still empty')
            return false
        }
        
        let _findIndex = findIndex(columns, function(o){ return o.col_name === formColumnModal.col_name  })
        if(_findIndex >= 0) {
            toast.error(`Column "${formColumnModal.col_name}" already exist`)
            return false;
        }

        let _column = [...columns]
        _column.push(formColumnModal)

        setFormColumnModal({col_name: '', col_type: 'String'})
        onColumnAdded(_column)
    },[formColumnModal, columns])

    const onDeleteRow = useCallback(async(name) => {
        let _options = {
            title: 'Confirm Remove Column',
            text: `Are you sure want to remove column "${name}"?`,
            confirmButtonText: 'Yes, Remove Column',
            showCancelButton: true,
        }

        let _column = [...columns]
        remove(_column, function(n) {
            return n.col_name  === name;
        });

        let action = await showAlert(_options, 'no-icon')
        if(action.isConfirmed && action.value) {
            onRowDeleted(_column)
        }
    },[columns])

    const onKeyDown = useCallback((event)=>{
        if( event.keyCode === 13 ) {
            onSaveColumnModal()
            event.preventDefault();
        }
    })

    return (
        <>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>Column Name</th>
                        <th>Type</th>
                        <th width="5%">Action</th> 
                    </tr>
                </thead>
                <tbody>
                    { columns.map((row, index) => {
                        return (
                            <tr key={`table-column-${index}`}>
                                <td>{row.col_name}</td>
                                <td>{row.col_type}</td>
                                <td className='text-danger'>
                                    <Button variant="btn-light" size="sm" className='text-danger' onClick={()=>onDeleteRow(row.col_name)}><FaTrash /></Button>
                                </td>
                            </tr>
                        )
                    })}

                    { columns.length <= 0 && (
                        <tr>
                            <td colSpan={4}>Empty column data.</td>
                        </tr>  
                    ) }
                    
                    <tr>
                        <td>
                            <input type="text" className='form-control' placeholder='Type column name' value={formColumnModal.col_name} onKeyDown={onKeyDown} onChange={(event)=> setFormColumnModal({...formColumnModal, col_name:event.target.value}) } />
                        </td>
                        <td>
                            <Form.Select onChange={(event)=> setFormColumnModal({...formColumnModal, col_type:event.target.value}) }>
                                <option>String</option>
                                <option>Date</option>
                                <option>Integer</option>
                            </Form.Select>
                        </td>
                        <td className='text-danger' valign='center'>
                            <Button variant="primary" size="sm" className="mt-1" onClick={onSaveColumnModal}>Save</Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
