import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Options = (props:any) => {

  const {setToken, token, setUser} = props;
  const navigate = useNavigate()

  useEffect(() => {

  },[token])

    const logOutUser = () => {
      setToken(null)
      localStorage.removeItem('token');
      setUser(null)
      navigate('/')
    }

    const logInUser = () => {
        navigate('/login')
    }

    const createUser = () => {
        navigate('/register')
    }

    return(
        <div>
          <h1>Options</h1>
          {token ?
            <h1 onClick={logOutUser}>log out</h1> :
            <div>
              <h1 onClick={logInUser}>log in</h1>
              <h1 onClick={createUser}>create account</h1>
            </div>
            
          }
        </div>
    )
}

export default Options;