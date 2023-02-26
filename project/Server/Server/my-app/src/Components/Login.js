import { useState } from 'react';
import { Link } from 'react-router-dom';
import bgImg from '../assets/img1.jpg';
import axios from 'axios';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth';



const Login = () => {
   
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [cookies, setCookie, removeCookie] = useCookies(["auth"]);
const [user, setUser] = useState('');
const [errors ,setErrors]=useState([]);
const [loadedError,setLoadedError]=useState(false);
const auth = useAuth();
const navigate = useNavigate();




    const handleSubmit = async (event) => {
    event.preventDefault()
    const res =axios.post('http://localhost:8000/api/user/Login',{email,password} )
    .then(res=> {
       localStorage.setItem("auth",JSON.stringify(res.data))
        auth.login(res);
        console.log(res.data);
        setCookie("auth", res.data,{maxAge: 1000 * 60 * 60 * 24 *30});
        navigate('/Home',{replace:true});
        ;}) 
        .catch(err=>{
            console.log(err.response.data)

            const errorResponse = err.response.data;
            setErrors(errorResponse);
            setLoadedError(true)
            })
    }
    return (  

        <div className="container"> 
        
        <section>
        <div className="LogIn">
            <div className="col-1">
            {loadedError ? <p style={{color:"#e22222db",fontSize:"14px"}}>{errors}</p>:""}
                <h2>Log In </h2>
                <span>LogIn And Have Fun</span>

                <form id='form' className='flex flex-col' onSubmit={handleSubmit} >
                    <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} value = {email}/>
                    <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} value ={password}/>
                    <input type="submit" value="Login" />
                    Don't have an account?<Link to='/register'> Sign Up Now</Link>
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
 
export default Login;