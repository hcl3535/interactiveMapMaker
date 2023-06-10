import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./axios/axios";

const Register = (props:any) => {
    const {setToken} = props;

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [email,setEmail] = useState('')
    const [message,setMessage] = useState('')
    const navigate = useNavigate()

    const submitHandler = async (e:any) => {
        e.preventDefault()

        if(!username || !password || !email) {
            alert('please enter username,password and email')
            return
          }

        const response = await registerUser(username,password,email)

        if(response.message !== "new user registered!"){
            setMessage(response.message)
        }else{

        setToken(response.token)
        localStorage.setItem('token',response.token)

        setUserName('')
        setPassword('')
        setEmail('')

        navigate('/')
        }
    }

    return (
        <form className="" onSubmit={submitHandler}>
            <div className="loginForm">
              <h1 className="centered">Register</h1>
                <h2 className="centered">username</h2>
                <input
                type='text'
                value={username}
                onChange={({target: {value}}) => setUserName(value)}
                />
                <h2 className="centered">password</h2>
                <input
                type='text'
                value={password}
                onChange={({target: {value}}) => setPassword(value)}
                />
                <h2 className="centered">E-Mail</h2>
                <input
                type='text'
                value={email}
                onChange={({target: {value}}) => setEmail(value)}
                />
                <h2>{message}</h2>
                <button
                type="submit"
                className="login-button"
                >
                  <h2>Register</h2>    
                </button>
            </div>
        </form>
    )
}


export default Register;