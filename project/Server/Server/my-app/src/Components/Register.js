import bgImg from '../assets/img1.jpg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

    const Register = () => {
        const navigate = useNavigate();
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [emailErr, setemailError] = useState("");
        const [passwordErr, setPasswordErr] = useState("");
        const [nameErr, setnameError] = useState("");
        const [errors ,setErrors]=useState([]);
        const [loadedError,setLoadedError]=useState(false);


        const handleEmail =(e)=>{
            setEmail(e.target.value)
            if(email.length === 0 ){
                setemailError("Email must not be empty")
            }
            else{
                setemailError("")
            }
        }

        const handlePassword =(e)=>{
            setPassword(e.target.value)
            if(password.length < 6 && password.length!=0){
                setPasswordErr("Password must be atleast 6 characters!")
            }
            else{
                setPasswordErr("")
            }
        }
        const handleName =(e)=>{
            setName(e.target.value)
            if(name.length < 6 && name.length!=0){
                setnameError("Name must be atleast 6 characters!")
            }
            else{
                setnameError("")
            }
        }
       const handleSubmit = (event) => {
      
        event.preventDefault()
        
        axios.post('http://localhost:8000/api/user/register',{name,email,password})
        .then(res=> {console.log(res) ; navigate('/')}) 
        .catch(err=>{
            console.log(err.response.data)

            const errorResponse = err.response.data; // Get the errors from err.response.data
            // const errorArr = []; // Define a temp error array to push the messages in 
            // for (const key of Object.keys(errorResponse)) 
            // { // Loop through all errors and get the messages
            //     console.log(key)
            // errorArr.push(errorResponse[key].message)
            //  }
            // Set Errors            
            setErrors(errorResponse);
            setLoadedError(true)
            })
     
           }
      
       
        
   return (  

        <div className="container"> 
        
        <section>
        <div className="register">
            <div className="col-1"> 
            {loadedError ? <p style={{color:"#e22222db",fontSize:"14px"}}>{errors}</p>:""}
                <h2>Sign Up</h2>
                <span>register and enjoy the service</span>
                 
                <form id='form' className='flex flex-col' onSubmit= {(e) => handleSubmit(e)}>
                    <input value = {name} type="text" placeholder='Username'   onChange={handleName} />
                    {   
                nameErr.length !=0?
                <p style={{color:"#e22222db",fontSize:"14px"}}>{nameErr}</p>
                :""
                }
                    <input value = {email}  type="email" placeholder='Email' onChange={handleEmail} />
                    {   
                    emailErr.length !=0?
                <p style={{color:"#e22222db",fontSize:"14px"}}>{emailErr}</p>
                :""
                    }
                    <input value = {password} type="password" placeholder='Password' onChange={handlePassword}/>
                    {   
                passwordErr.length !=0?
                <p style={{color:"#e22222db",fontSize:"14px"}}>{passwordErr}</p>
                :""
                }
                    <input type="submit" value="Register" />
                    <Link to='/'>Already have an account?</Link>

                </form>

            </div>
            <div className="col-2">
                <img src={bgImg} alt="dojo" />
            </div>
        </div>
    </section>
        
        </div>

    );
   }

 export default Register;
