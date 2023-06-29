import {getIconById, getMapByName, getMapByNameTest} from './axios/axios';


export async function getChildren(map) {

  if(!map){
    return
  }
      const childrenNames = map.children
      
  
        let temp = []
        await Promise.all(childrenNames?.map( async (value,index) => {
          const map = await getMapByNameTest(value)
          const icon = await getIconById(map.icon)
          map.icon = icon
          temp.push(map)
        }))
        
        return temp
      
  }      