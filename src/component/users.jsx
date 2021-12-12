import React, {useState} from "react"
import api from "../api"
import "bootstrap/dist/css/bootstrap.css"
const Users = ()=>{
    
    const [users, setUsers] = useState(api.users.fetchAll())
    
    // console.log()
    function deleteBtn (id){
      setUsers(prev=>prev.filter(user => user._id !== id))
      // console.log(id)
    }
     
    function wordFormat (){
      if(users.length === 4|| users.length ===3|| users.length===2){
       return users.length +' человека тусанет с тобой сегодня  '
      }else if(users.length===0){
        const htmlElements = document.querySelector('.table')
        htmlElements.innerHTML=''
    //   return <>
    //     <div className = "badge bg-danger" >
    //      <h1>Никто с тобой сегодня не тусанет</h1>
    // </div> 
    const nobody=document.querySelector('#word')
    nobody.className='badge bg-danger'
    return  <>
        <div  >
          <h1>Никто с тобой сегодня не тусанет</h1>
     </div> 
        </>
    
      }
      else {
       return users.length +' человек тусанет с тобой сегодня  '
      }

    }
    const table = 
    <>
    <div id = "word" className = "badge bg-primary" >
      <h3>{wordFormat()}</h3> 
    </div> 
    <table className="table">
  <thead>
    <tr>
      <th scope="col">Имя</th>
      <th scope="col">Качества</th>
      <th scope="col">Профессия</th>
      <th scope="col">Встретился, раз</th>
      <th scope="col">Оценка</th>
      <th scope="col"></th>

    </tr>
  </thead>
  <tbody>
    
  {users.map((item)=>{
   return <>
   <tr key = {item._id}>
     <td>{item.name}</td>
     <td>{item.qualities.map(item=><span className={'badge bg-'+ item.color + ' m-1'}>{item.name}</span>)}</td>
     <td>{item.profession.name}</td>
     <td>{item.completedMeetings}</td>
     <td>{item.rate}</td>
     <td><button className = "badge bg-danger " onClick={()=> deleteBtn(item._id)}>Delete</button></td>

   </tr>
  </>
  })}
    
    </tbody>
    </table>
    </>

    return table
    
    

}

export default Users