import { FORM_WA_OBJECT, FORM_SMS_OBJECT, FORM_EMAIL_OBJECT, FORM_PUSH_NOTIF_OBJECT } from "config/notification-data";

const KEY = {
    wa: 'configNotif/wa',
    sms: 'configNotif/sms',
    email: 'configNotif/email',
    pushNotif: 'configNotif/pushNotif'
}

export function setSessionConfigWa(form) {
    sessionStorage.setItem(KEY.wa, JSON.stringify(form))
}

export function getSessionConfigWa() {
    let _data = sessionStorage.getItem(KEY.wa)
    if( _data ) return JSON.parse(_data);
    return FORM_WA_OBJECT
}

export function setSessionConfigSms(form) {
    sessionStorage.setItem(KEY.sms, JSON.stringify(form))
}

export function getSessionConfigSms() {
    let _data = sessionStorage.getItem(KEY.sms)
    if( _data ) return JSON.parse(_data);
    return FORM_SMS_OBJECT
}

export function setSessionConfigEmail(form) {
    sessionStorage.setItem(KEY.email, JSON.stringify(form))
}

export function getSessionConfigEmail() {
    let _data = sessionStorage.getItem(KEY.email)
    if( _data ) return JSON.parse(_data);
    return FORM_EMAIL_OBJECT
}

export function setSessionConfigPushNotif(form) {
    sessionStorage.setItem(KEY.pushNotif, JSON.stringify(form))
}

export function getSessionConfigPushNotif() {
    let _data = sessionStorage.getItem(KEY.pushNotif)
    if( _data ) return JSON.parse(_data);
    return FORM_PUSH_NOTIF_OBJECT
}
