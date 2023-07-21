import axios from 'axios';

if(process.env.NODE_ENV === 'production'){
    axios.defaults.baseURL = `https://interactivemapmaker.up.railway.app/api`
} else {
    axios.defaults.baseURL = `http://localhost:4000/api`
}

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

export async function getUserById(userId) {
    try {
        const {data} = await axios.get(`/users/${userId}`)
        return data
    } catch (error) {
        console.error(error)
    }
}

export async function getWorldHistoryByUserId(userId) {
    try {
        
        const {data} = await axios.get(`/users/${userId}/worldhistory`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function updateUserWorldHistory(userId,newWorldHistory) {
    try {
        const {data} = await axios.patch(`users/${userId}/worldhistory`,{newWorldHistory: newWorldHistory})
        return data
    } catch (error) {
        console.log(error)
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
            email:email,
            profileimageurl:'',
            worldhistory:[]
        })
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
        return data
    } catch (error) {
        console.error(error)
    }
}

export async function deleteIcon(iconId) {
    try {
        const {data} = await axios.delete(`/icons/${iconId}`)
        return data
    } catch (error) {
        console.error(error)
    }
}

export async function deleteMapByIconId(iconId) {
    try {
        const {data} = await axios.delete(`maps/mapIconId/${iconId}`)
        return data
    } catch (error) {
        console.error(error)
    }
}


export async function getAllUserWorlds(userId) {
    try {
        const {data} = await axios.get(`/maps/allmaps/${userId}`)
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

export async function getMapByNameTest(name) {
    try {
        const {data} = await axios.get(`/maps/${name}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function getMapById(id) {
    try {
        const {data} = await axios.get(`/maps/mapid/${id}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function updateChildrenOfMapsContainingDeletedMaps(deletedMaps) {
    try {
        const {data} = await axios.patch(`/maps/removeChildrenIfDeleted`, {deletedMaps: deletedMaps})
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function getCommunityMaps(){
    try {
        const {data} = await axios.get(`/maps/communityMaps`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function updateIfMapIsShared(bool, worldId) {
    try {
        const {data} = await axios.patch(`/maps/communityMaps`,{bool:bool, worldId:worldId})
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

export async function updateCityIconLocation(city) {
    try {
        const {id} = city;
        const {data} = await axios.patch(`/maps/${id}`,{city: city})
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function deleteCity(city) {
    try {
        const {id} = city;
        const {data} = await axios.delete(`maps/${id}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function removeChild(parrentMap,childToRemove){

    try {
        const {id} = parrentMap
        const {data} = await axios.patch(`maps/removeChild/${id}`,{parrentMap: parrentMap,childToRemove:childToRemove})
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function changeCitySize(city,width) {
    
    try {

        const {id} = city;
        const {data} = await axios.patch(`maps/changeCitySize/${id}`,{width:width})

        return data
            
    } catch (error) {
        console.log(error)
    }
}