import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Cookies } from 'react-cookie';

const Addtask = () => {
  
    const cookies = new Cookies();
    const navigate = useNavigate();

        const [title, setTitle] = useState("");
        const [due_to , setDueTo] = useState("");
        const [users, setUsers] = useState([])
        const [assigned_To_id,  setAssigned_To_id] = useState("");
        const [owner_id, setOwner] = useState("")
        const [loggedInUser, setLoggedInUser] = useState(null);
        const [errorMsg, setErrorMsg] = useState("")
        const [titleErr, setTitleErr] = useState("");
        const [dueToErr, setDueToErr] = useState("");

        useEffect(() => {
            const token = cookies.get('auth');
            setLoggedInUser(token);
            setOwner(token._id)
            console.log(token);
            axios.get('http://localhost:8000/api/user/getall')
            .then(res => {
                setUsers(res.data)
                console.log(res.data)})
            .catch(err => console.error(err.response.data));
          }, []);

          const handleTitle = (e)=>{
          setTitle(e.target.value)
          if(title.length < 6){
          setTitleErr("Must be Atleast 6 Characters")
            } else{
             setTitleErr("")
             }
            }

            const handleDate =(e)=>{
                 setDueTo(e.target.value)
                 if(dueToErr.length < 6){
                  setDueTo("Date must not be empty")
                  }
                 else{
                 setDueTo("")
                }
                 }

        const handleForm=(e)=>{
            e.preventDefault();
            if(loggedInUser.isAdmin == true){
            axios.post('http://localhost:8000/api/task/add',{title, due_to, assigned_To_id,owner_id})
            
            .then(res=> console.log(res))
            .catch(err => console.error(err.response.data));}
            else{
                console.log("you are not an admin")
                setErrorMsg("you Are Not An Admin")
            }
        }

        const routeChange = () => {
            navigate('/Home');
        }

    return ( 

    <div > 
        
        {
            errorMsg.length!=0 ?
                <p style={{color:"white", fontSize:"20px"}}>You Are Not An Admin </p> : ""
            
        }



        <form id='form' className='flex flex-col' onSubmit={(e)=>handleForm(e)}>
            <input  value={title} type="text" placeholder='Task Name' onChange={handleTitle} />
            {
                titleErr.length !=0?
                <p style={{display: "inline" ,color:"#fff"}}>{titleErr}</p>
                :""
            }
            <input  value={due_to} id="w3review" placeholder="Due To" rows="4" cols="50" type="date"
            onChange={(e)=>setDueTo(e.target.value)}>
            </input>
            <select onChange={(e)=>setAssigned_To_id(e.target.value)}>{
              users?.map((user,idx) => 
                <option  value = {user._id} key={idx}>{user.name}</option> )
            }</select>
            {/* <input value={assigned_To_id} type="text" placeholder='assign to' onChange={(e)=>setAssigned_To_id(e.target.value)}/> */}
            <input type="submit" value="add task" />
            <button type="submit"onClick={routeChange}> Back to Home </button>

        </form>
        
    </div>

    )}
    
export default Addtask;