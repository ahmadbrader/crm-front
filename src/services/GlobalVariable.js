let User = {
    name : "",
    email : "",
    id : 0,
    token : "",
}

export function setUser(form) {
    User = form;
}

export function getUser() {
    return User.name;
}

export function getUsername() {
    return User.username;
}

export function getToken() {
    return User.token;
}