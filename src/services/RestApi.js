import axios from "axios";
import { API_ENDPOINT, API_HOST } from "config/api";
import { getToken } from "./GlobalVariable";

function _get(url='', parameter='') {
    
    let reqOptions = {
        url: `${API_HOST}/${url}${parameter}`,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer "+ getToken() 
        }
    }
    
    return axios.request(reqOptions);
}

function _post(url='', data={}, parameter='') {
    let reqOptions = {
        url: `${API_HOST}/${url}${parameter ? `/${parameter}` : ''}`,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer "+getToken() 
        },
        data,
    }
    
    return axios.request(reqOptions);
}

function _postNotAuth(url='', data={}, parameter='') {
    let reqOptions = {
        url: `${API_HOST}/${url}${parameter ? `/${parameter}` : ''}`,
        method: "POST",
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json" 
        },
        data,
    }
    
    return axios.request(reqOptions);
}

function _update(url='', data={}, parameter='') {
    let reqOptions = {
        url: `${API_HOST}/${url}${parameter !== '' ? `/${parameter}` : ''}`,
        method: "PUT",
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json", 
            "Authorization" : "Bearer "+getToken() 
        },
        data,
    }
    
    return axios.request(reqOptions);
}

function _delete(url='', parameter='') {
    let reqOptions = {
        url: `${API_HOST}/${url}${parameter ? `/${parameter}` : ''}`,
        method: "DELETE",
        headers: {
            "Accept": "*/*",
            "Authorization" : "Bearer "+getToken() 
        },
    }
    
    return axios.request(reqOptions);
}

export function postSignIn(form) {
    
    let formDataObject = Object.fromEntries(form.entries());
    let formDataJsonString = JSON.stringify(formDataObject);
    return _postNotAuth('user/login', formDataJsonString);
}

export function getProspecting(type) {
    return _get(`process/`, type);
}

export function getNotesByContact(contact_id) {
    return _get(`notes/`, contact_id);
}

export function getResetPassowrd() {
    return _get(`reset`);
}

export function getResetPassowordByid(id) {
    return _get(`user/reset/`, id);
}

export function getProductByIdContact(id) {
    return _get(`product/`, id);
}

export function getStatusByType(type) {
    return _get(`status/`, type);
}

export function getActivityToday() {
    return _get(`status/activity-today`);
}

export function changeStatusContact(id, status, form) {
    let formDataObject = Object.fromEntries(form.entries());
  // Format the plain form data as JSON
  let formDataJsonString = JSON.stringify(formDataObject);
    return _post(`status`, formDataJsonString, `${id}`);
}

export function saveNewProspecting(form) {
    return _post('contact', form);
}

export function saveNewUser(form) {
    return _post('user/register', form);
}

export function addProduct(form) {
    return _post('process/closing/add-product', form);
}

export function updateToClosing(form) {
    return _update('process/update/presentation', form);
}

export function updateToApproaching(form) {
    return _update('process/update/prospecting', form);
}

export function updateToPresenting(form) {
    return _update('process/update/approaching', form);
}

export function getAllSales() {
    return _get('user');
}

export function getAllCompanies() {
    return _get('company');
}

export function getApplications() {
    return _get(API_ENDPOINT.application);
}

export function createApplication(application_name) {
    
}

export function updateApplication({id, application_name}) {
    return _update(API_ENDPOINT.application, {id, application_name});
}

export function deleteApplication(id) {
    return _delete(API_ENDPOINT.application, id);
}

export function getDepartments() {
    return _get(API_ENDPOINT.department);
}

export function createDepartment(deptnotif_name) {
    return _post(API_ENDPOINT.department, {deptnotif_name});
}

export function updateDepartment({id, deptnotif_name}) {
    return _update(API_ENDPOINT.department, {id, deptnotif_name});
}

export function deleteDepartment(id) {
    return _delete(API_ENDPOINT.department, id);
}

export function getCategories() {
    return _get(API_ENDPOINT.category);
}

export function createCategory(category_name) {
    return _post(API_ENDPOINT.category, {category_name});
}

export function updateCategory({id, category_name}) {
    return _update(API_ENDPOINT.category, {id, category_name});
}

export function deleteCategory(id) {
    return _delete(API_ENDPOINT.category, id);
}

export function getNotifConfig(){
    return _get(API_ENDPOINT.config);
}

export function saveNotifConfig(form){
    return _post(API_ENDPOINT.config, form);
}

export function updateStatusNotifConfig({id, status}){
    return _update(API_ENDPOINT.config, {id, status});
}

export function deleteNotifConfig(id){
    return _delete(API_ENDPOINT.config, id);
}
