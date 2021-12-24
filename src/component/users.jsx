import React, {useState} from "react"
import TableHeader from "./tableHeader"
import { Message } from "./message"
import User from "./user"
import api from "../api"


const Users = ()=>{
  const [users, setUsers] = useState(api.users.fetchAll())

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
  <User item = {users} value={setUsers}/>
    </table>
    </>

    return table
    
    

}

export default Users