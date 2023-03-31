import axios from 'axios';
axios.defaults.baseURL = `http://localhost:4000/api`

export async function getAPIHealth() {
    try {
        const {data} = await axios.get(`/api/health`);
        return data
    } catch (error) {
        console.error(error)
        return {healthy: false};
    }
}

export async function getAllUsers() {
    try {
        const {data} = await axios.get(`/users/all`)
        return data  
    } catch (error) {
        console.error(error)
    }
}

export async function logInUser(username,password) {
    try {
        const {data} = await axios.post(`/users/login`,
            {
              username: username,
              password: password
            }
          )

        return data
    } catch (error) {
        console.error(error)
    }
}

export async function getMe(token) {
     try {
        const auth = {
            headers: {
                authorization: `bearer ${token}`
            }
        }

        const {data} = await axios.get(`/users/me`, auth)
        
        return data
     } catch (error) {
        console.error(error)
     }
}

export async function registerUser(username, password, email) {
    try {
        const {data} = await axios.post(`/users/register`,
        {
            username:username,
            password:password,
            email:email
        })
        console.log(data)
        return data
    } catch (error) {
        console.error(error)
    }
}

export async function getIconsByUserId(id) {
    try {
      const {data} = await axios.get(`/icons/user/${id}`) 
      return data
    } catch (error) {
        console.error(error)
    }
}

export async function getIconById(iconId) {
    try {
        const {data} = await axios.get(`/icons/${iconId}`)

        return data
    } catch (error) {
        console.error(error)
    }
}
export async function uploadIcon(formData) {
    try{
        const {data} = await axios.post(`/icons`,formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        console.log(data)
        return data
    } catch (error) {
        console.error(error)
    }
}

export async function deleteIcon(iconId) {
    try {
        console.log(iconId)
        const {data} = await axios.delete(`/icons/${iconId}`)
        return data
    } catch (error) {
        console.error(error)
    }
}

export async function getAllUserWorlds(userId) {
    try {
        const {data} = await axios.get(`/maps/${userId}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function getMapByName(name,userId) {
    try {
        const {data} = await axios.get(`/maps/${userId}/${name}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function createMap(formData, userid) {
    try {
        const {data} = await axios.post(`/maps/${userid}`,formData,{
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        return data
    } catch (error) {
        console.log(error)
    }
}