import dayjs from "dayjs";

export function changeDocumentTitle(title){
    if( title.length <= 0 ) return `E-Notification`;
    document.title = `${title} - CRM Natieva`
}

export function parseDate(date, format='DD/MM/YYYY') {
    return dayjs(date).format(format)
}
