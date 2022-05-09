import React from 'react'
import { FaTrash } from "react-icons/fa";
import { Button } from 'react-bootstrap';
import { showAlert } from 'utils/Alert';

export default function ButtonAction({
    children, buttons=[], onView=()=>{}, onEdit=()=>{}, onDelete=()=>{}, onAction=()=>{}, data,
    deleteAlertParams={}, buttonDeleteOnlyIcon=false, seperateDeleteButton=false

}) {

    const onDeleteClicked = async () => {

        let _options = {
            title: 'Confirm Delete Data',
            text: 'Are you sure want to delete this data?',
            confirmButtonText: 'Yes, Delete Data',
            showCancelButton: true,
        }

        let action = await showAlert({..._options, ...deleteAlertParams }, 'no-icon')

        if(action.isConfirmed && action.value ) onDelete(data)
    }

    const masterButtons = {
        view: <Button variant="primary" size="sm" onClick={()=>onView(data)}>View</Button>,
        edit: <Button variant="outline-dark" size="sm" onClick={()=>onEdit(data)}>Edit</Button>,
        action: <Button variant="outline-dark" size="sm" onClick={()=>onAction(data)}>Action</Button>,
        editStatus : <Button variant="outline-warning" size="sm" onClick={()=>onEdit(data)}>Edit Status</Button>,
        delete: <Button variant="outline-danger" size="sm" onClick={onDeleteClicked}><FaTrash />{buttonDeleteOnlyIcon ? '' : ' Delete'}</Button>
    };

    return (
        <div className={`btn-actions ${seperateDeleteButton ? 'separate-delete-button' : ''}`}>
            <div className='prepend-btn-action'>{children}</div>
            { buttons.map((button, index) => <div className={`btn-${button}`} key={`button-${index}`}>{masterButtons[button]}</div> )}
        </div>
    )
}
