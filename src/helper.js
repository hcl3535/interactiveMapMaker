
import {deleteIcon, deleteMap, deleteMapByIconId, deleteMapById, getIconById, getMapById, getMapByName, getMapByNameTest, updateChildrenOfMapsContainingDeletedMaps} from './axios/axios';


// export async function getChildren(map) {

//   if(!map){
//     return
//   }
//       const childrenNames = map.children
      
//         let temp = []
//         await Promise.all(childrenNames?.map( async (value,index) => {
//           const map = await getMapByNameTest(value)
//           const icon = await getIconById(map.icon)
//           map.icon = icon
//           temp.push(map)
//         }))
        
//         return temp
      
//   }   
  
  export async function getChildren(map) {

    if(!map){
      return
    }
        const childrenIds = map.children
        
          let temp = []
          await Promise.all(childrenIds?.map( async (value,index) => {
            // const map = await getMapByNameTest(value)
            const map = await getMapById(value)
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

    return
  }

  export async function deleteWorld(world) {
  
    recusivelyFindAndDeleteMaps(world)
    return
  }

  async function recusivelyFindAndDeleteMaps(map){

    if(map.children[0]){
      for(const child of map.children){
        const childMap = await getMapByNameTest(child)
        await recusivelyFindAndDeleteMaps(childMap)
      }
    }
    
    await deleteMapById(map.id)
    return
  }