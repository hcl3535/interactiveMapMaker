
import {deleteIcon, deleteMapByIconId, getIconById, getMapByName, getMapByNameTest, updateChildrenOfMapsContainingDeletedMaps} from './axios/axios';


export async function getChildren(map) {

  if(!map){
    return
  }
      const childrenNames = map.children
      console.log(childrenNames)
      
  
        let temp = []
        await Promise.all(childrenNames?.map( async (value,index) => {
          const map = await getMapByNameTest(value)
          const icon = await getIconById(map.icon)
          map.icon = icon
          temp.push(map)
        }))
        
        return temp
      
  }      

  export async function deleteCity(icon){
    console.log(icon)

    const deletedMaps = await deleteMapByIconId(icon.id)
    console.log(deletedMaps)

    for(const map of deletedMaps){
      const editedmapsContainingDeletedMap = await updateChildrenOfMapsContainingDeletedMaps(map)
      console.log(editedmapsContainingDeletedMap)
    }
    
  
    await deleteIcon(icon.id)
  }