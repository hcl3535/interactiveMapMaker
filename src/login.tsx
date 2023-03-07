import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logInUser } from "./axios/axios";

const Login = (props:any) => {

    const {setToken} = props;

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const submitHandler = async (e:any) => {
        e.preventDefault()

        if(!username || !password) {
          alert('please enter username and password')
          return
        }

        const response = await logInUser(username, password)
        setToken(response.token)

        localStorage.setItem('token',response.token)

        setUserName("");
        setPassword("");
        navigate('/')
    }

    return (
        <form className="centered" onSubmit={submitHandler}>
            <div className="loginForm centered vertical-centered border">
              <h1 className="centered">log in</h1>
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
                <button
                type="submit"
                >login</button>
            </div>
        </form>
    )
}

export default Login;