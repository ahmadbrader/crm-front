let User = {
    name : localStorage.getItem('name'),
    email : localStorage.getItem('email'),
    id : localStorage.getItem('id'),
    role : localStorage.getItem('role'),
    token : localStorage.getItem('token'),
}

export function setUser(form) {
    User = form;
}

export function getUser() {
    return User.name;
}

export function getUsername() {
    return User.email;
}

export function getToken() {
    return User.token;
}

export function getRole() {
    return User.role;
}

export function getUserId() {
    return User.id;
}