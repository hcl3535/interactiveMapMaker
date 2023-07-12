import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Options = (props:any) => {

  const {setToken, token, setUser, setNewCity} = props;
  const navigate = useNavigate()

  useEffect(() => {
    setNewCity(null)
  },[])

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
        <div className="options">
          <h1 className="centered">Options</h1>
          {token ?
            <h1 className="option-item" onClick={logOutUser}>log out</h1> :
            <div>
              <h1 className="option-item" onClick={logInUser}>log in</h1>
              <h1 className="option-item" onClick={createUser}>create account</h1>
            </div>
            
          }
        </div>
    )
}

export default Options;