import { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'


const Login = () => {
    const navigate = useNavigate()
    

    useEffect(() => {
        const jwtToken = Cookies.get("jwt_token")
        if(jwtToken !== undefined){
            navigate("/")
        }
    },[navigate])
    
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [errMsg,setErrorMsg] = useState(false)

    const onChangeUsername = (event) => {
        setUsername(event.target.value)
    } 

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }


    const fetchLoginDetails = async () => {
        const apiUrl = "https://apis.ccbp.in/login"
        const options = {
            method : "POST",
            body : JSON.stringify({
                username,
                password
            })
        }
        try{
            const response = await fetch(apiUrl,options)
            const jsonData = await response.json()
            console.log(jsonData.status)
            if(jsonData.jwt_token === undefined){
                setErrorMsg(true)
            }
            else{
                Cookies.set("jwt_token", jsonData.jwt_token,{expires : 30})
                navigate("/")
            }
            
        }catch(e){
            console.log(e.message)
        }
    }

    const onSubmitLogin = (event) => {
        event.preventDefault()
        if(username.trim() !== "" && password.trim() !== ""){
        fetchLoginDetails()}
        else{
            setErrorMsg(true)
        }
    }

    
        

    return(
        <div className='login-bg d-flex flex-row justify-content-center align-items-center'>
        <form className='login-form-bg d-flex flex-column justify-content-between' onSubmit={onSubmitLogin}>
                <img src="https://assets.ccbp.in/frontend/react-js/logo-img.png" alt="jobby-logo" className='login-form-logo'/>
                <div>
                <label htmlFor="username">USERNAME</label><br/>
                <input type="text" onChange={onChangeUsername} value={username} placeholder='Enter Username' id="username" /><br/>
                </div>
                <div>
                <label htmlFor="password">PASSWORD</label><br/>
                <input id="password" onChange={onChangePassword} type="text" value={password} placeholder='Enter Password'/><br/>
                </div>
                <button type="submit" className='login-button'>LOGIN</button>
                {errMsg && <p>*Enter Valid Name and Password</p>}
        </form>
    </div>
    )
}
export default Login