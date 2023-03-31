import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./axios/axios";

const Register = (props:any) => {
    const {setToken} = props;

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [email,setEmail] = useState('')
    const navigate = useNavigate()

    const submitHandler = async (e:any) => {
        e.preventDefault()

        if(!username || !password || !email) {
            alert('please enter username,password and email')
            return
          }

        const response = await registerUser(username,password,email)

        setToken(response.token)
        localStorage.setItem('token',response.token)

        setUserName('')
        setPassword('')
        setEmail('')

        navigate('/')
    }

    return (
        <form className="centered" onSubmit={submitHandler}>
            <div className="loginForm centered vertical-centered border">
              <h1 className="centered">register</h1>
                <label className="centered">username</label>
                <input
                type='text'
                value={username}
                onChange={({target: {value}}) => setUserName(value)}
                />
                <label className="centered">password</label>
                <input
                type='text'
                value={password}
                onChange={({target: {value}}) => setPassword(value)}
                />
                <label className="centered">E-Mail</label>
                <input
                type='text'
                value={email}
                onChange={({target: {value}}) => setEmail(value)}
                />
                <button
                type="submit"
                >login</button>
            </div>
        </form>
    )
}


export default Register;