const FIELD_TO_VALIDATE = [
    {
        name: "app_id",
        label: "Source Application",
    },
    {
        name: "category_id",
        label: "Category",
    },
    {
        name: "code",
        label: "Code",
    },
    {
        name: "departement_id",
        label: "Department",
    },
    {
        name: "notif_name",
        label: "Notification Name",
    }
]

export function validateMasterForm(form) {

    let result = { status: true, message: '', field: '' }

    for (let row of FIELD_TO_VALIDATE) {
        if( form[row.name] === "" ) {
            result = {
                status: false,
                field: row.name,
                message: `Field "${row.label}" can not leaved empty.`
            }

            return result;
        }
    }

    return result;
    
}
