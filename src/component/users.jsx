import React, {useState} from "react"
import api from "../api"
import "bootstrap/dist/css/bootstrap.css"
import changeIconFavorites from "./changeIconFavorites"
import TableHeader from "./tableHeader"
import { Message } from "./message"

const Users = ()=>{
    
const [users, setUsers] = useState(api.users.fetchAll())


function bookmark (itemBookmark){
  if(itemBookmark.bookmark){
    return changeIconFavorites.on
  }else{
    return  changeIconFavorites.off
  }
}




const handleDelete = (id)=>  {
  setUsers(users.filter(user=>user._id!==id))
  }
     
function wordFormat (){
  if(users.length === 4|| users.length ===3|| users.length===2){
    return users.length +' человека тусанет с тобой сегодня  '
  }else if(users.length===0){
    const htmlElements = document.querySelector('.table')
    htmlElements.innerHTML=''
    const cancelOfParty=document.querySelector('#word')
    cancelOfParty.className='badge bg-danger'
    return  <>
      <Message/>
      </>
    }else {
      return users.length +' человек тусанет с тобой сегодня  '
    }
    }

    const table = 
    <>
   <div id = "word" className = {"badge bg-primary"}>
      <h3>{wordFormat()}</h3> 
    </div> 
    <table className="table">
  <thead>
    <TableHeader/>
  </thead>
  <tbody>
    
  {users.map((item)=>{
   return <>
   <tr key = {item._id}>
     <td>{item.name}</td>
     <td>{item.qualities.map(item=><span className={'badge bg-'+ item.color + ' m-1'}>{item.name}</span>)}</td>
     <td>{item.profession.name}</td>
     <td>{item.completedMeetings}</td>
     <td><button key = {item._id}>{bookmark(item)}</button></td>
     <td>{item.rate}</td>
     <td><button className = "badge bg-danger " onClick={()=> handleDelete(item._id)}>Delete</button></td>

   </tr>
  </>
  })}
    
    </tbody>
    </table>
    </>

    return table
    
    

}

export default Users