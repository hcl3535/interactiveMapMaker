import { getAllUsers, getAllUserWorlds, getIconById, getMapByName, getMe } from './axios/axios';

export async function getChildren(map, userInfo) {

if(!map){
  return
}
    const childrenNames = map.children

      let temp = []
      await Promise.all(childrenNames?.map( async (value,index) => {
        const map = await getMapByName(value,userInfo.id)
        const icon = await getIconById(map.icon)
        map.icon = icon
        temp.push(map)
      }))
      
      return temp
    
}      