
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './viewTask.css';
import { useNavigate } from "react-router-dom";
import { Cookies } from 'react-cookie';



const AdminTasks = () => {
    const cookies = new Cookies();
    const [tasks , setTasks] = useState([]);
    const [loaded, setLoaded] = useState(false)
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [status,setStatus]= useState('');
    const [cookie, setCookie] = useState('');
    



useEffect(() =>{
    const token = cookies.get('auth');
    setLoggedInUser(token);
    axios.get('http://localhost:8000/api/task/owner/'+token._id)
    .then(res=>{
        setTasks(res.data);
        setLoaded(true);
console.log(res.data);
        })
    .catch(err => console.error(err.response.data));
},[]);

const handleDelete = async(id) => {


   const res= await axios.delete('http://localhost:8000/api/task/tasks/delete/'+id);
    const newTask = [...tasks].filter((task) => {
        window.alert("Deleted Successfully");    
      return  task._id !== id;
     
    });
    setTasks(newTask);
};


    //const history = useHistory();
    const navigate = useNavigate();

    const routeChange = () => {
        navigate('/Addtask');

    }
    const routeUpdate = (id,status) => {
        axios.put('http://localhost:8000/api/task/tasks/update/'+id,{status})
        .then(window.alert("Updated Successfully"))}
            



const logoutChange = () => {
    axios.get('http://localhost:8000/api/user/logout')
       .then(window.alert("Logged Out Successfully"))
       setCookie();
       navigate('/');
          
}


    return (  

<div>
    

    <section>
        <div className="container">

            <h1>Tasks </h1>
            <div className="cards">
                {
                  loaded && tasks?.map((task,idx)=>(
               <div key={idx} className="card">    
               <h3>{task.title}</h3>
               
                <p>{}</p>
                {
                    loggedInUser.isAdmin ?
                <button type="submit"className="deletebtn" onClick={(e)=>handleDelete(task._id)}> Delete</button>
                :""
}
              <p>The Status for {task.title} is {task.status} do it before {task.due_to}</p>
              <select onChange={(e)=>setStatus(e.target.value)} >
             
                <option  value = "Done" >Done</option> 
                <option  value = "Proccesing" >Proccesing</option> 
                <option  value = "Not Started" >Not Started</option> 
            </select>
                <button type="submit" className="Upbtn" onClick={(e)=>routeUpdate(task._id,status)}> Update</button>
               </div>
                  ))}
            </div>
       
            <button className="btn" onClick={routeChange}> Add task</button>
            <button type='submit' className="Logbtn" onClick={logoutChange}>Logout</button>
        </div>
    </section>
        
</div>

 
       
    );
    
    
}
 
export default AdminTasks; 