
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
                username: _response.data.user.email,
                name: _response.data.user.name,
                token : _response.data.token
            }
            setUser(form)
            localStorage.setItem("user", JSON.stringify(_response.data.user))
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
