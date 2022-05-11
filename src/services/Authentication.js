
import { setUser } from "./GlobalVariable";
import { postSignIn } from "./RestApi";

/**
 * 
 * @param {*} data object {username, password}
 */
export default async function signIn(data={}){
    let formData = new FormData();   

    formData.append('email', data.username);   
    formData.append('password', data.password);
    
    try {
        let _response = await postSignIn(formData)
        if (_response.status === 200) {
            let form = {
                id: _response.data.user.id,
                email: _response.data.user.email,
                name: _response.data.user.name,
                role: _response.data.user.role,
                token : _response.data.token
            }
            setUser(form)
            localStorage.setItem("name", _response.data.user.name)
            localStorage.setItem("id", _response.data.user.id)
            localStorage.setItem("email", _response.data.user.email)
            localStorage.setItem("role", _response.data.user.role)
            localStorage.setItem("token", _response.data.token)
            return {
                id: _response.data.user.id,
                username: _response.data.user.email,
                name: _response.data.user.name
            };
        }
    } catch (error) {
        return false
    }
    
    
    

    
    // if(data.username !== 'admin' && data.password !== 'admin!' ) return false;
}
