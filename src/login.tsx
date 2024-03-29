import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logInUser } from "./axios/axios";
import scroll from "./Photos/scroll-paper-clip-art-png-favpng-BXdFwnWdSVKHYrXpvU1bPLpN3-removebg-preview.png"

const Login = (props:any) => {

    const {setToken} = props;

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [message,setMessage] = useState('')
    const navigate = useNavigate()

    const submitHandler = async (e:any) => {
        e.preventDefault()

        if(!username || !password) {
          setMessage('please enter username and password')
          return
        }

        const response = await logInUser(username, password)

        if(response.message !== 'your logged in'){
          setMessage(response.message)
        } else {
          setToken(response.token)

          localStorage.setItem('token',response.token)

          setUserName("");
          setPassword("");
          navigate('/')
        }
    }

    const goToRegister = () => {
        navigate('/register')
    }

    return (
        <form className="login" onSubmit={submitHandler}>
            <div className="loginForm">
              <h1 className="centered loginLabel">Log in</h1>
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
                <h2>{message}</h2>
                <button
                className="login-button"
                type="submit"
                >
                <h2>Log In</h2>    
                </button>
                <h2 className="centered">dont have an account?</h2>
                <h2 className="centered registerButton" onClick={goToRegister}>Register</h2>
                <img className="loginPic" src={scroll}/>
            </div>
        </form>
    )
}

export default Login;