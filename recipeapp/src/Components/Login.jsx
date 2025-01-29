import React, { useState} from 'react'
import { useNavigate } from 'react-router';
import { FaLock , FaUser } from 'react-icons/fa'; 
import './login-register.css'
import axios from 'axios'

const Login = ({onClose}) => {

  const [uname,setUname] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")
  const navigate=useNavigate()

  const [isRegister,setIsRegister]=useState(false)

  const handleSubmit=async(e)=>{
    e.preventDefault()
    let endpoint=(isRegister) ? "api/register" : "api/login"
    await axios.post(`http://localhost:3000/${endpoint}`,{uname,password})
    .then((res)=>{
      localStorage.setItem("token",res.data.token)
      localStorage.setItem("user",JSON.stringify(res.data.user))
      
      console.log('Response:', res); 
      if (response.data.token) { 
        navigate('/addrecipe');
        localStorage.setItem('token', response.data.token); 
        
        
      } else {
        alert(response.data.message || 'Invalid credentials!');
      }  
    }
   
  )
    .catch(data=>setError(data.res?.data?.error))

  }

  return (
      // <>
      // <div className="backdrop">

      //   <dialoge className="model" open> 
      //     <h1 className="hello">Hello</h1>

      //   </dialoge>
      // </div>
      // </>


    <>
    {/* <div className="backdrop" onClick={onClose}>  </div>   */}
    <div className="wrapper">
      <dialog className='model' open>
        <div className="form-box-login" >
          <form className='loginform' name="form" onSubmit={handleSubmit}>

            <h1 className="l-title">{ (isRegister)? "Register" : "Login"}</h1>

            <div className="formgroup">
              {/* <label htmlFor="uname">Username</label> */}
              <input type="text" id='uname' placeholder='Username' onChange={(e) => setUname(e.target.value)} />
              <FaUser  className='icon' />
            </div>
            
            <div className="formgroup">
              {/* <label htmlFor="password">Password</label> */}
              <input type="password" id='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
              <FaLock className='icon' />
            </div>

            <div className="forgotpass">
              <a href="/">Forgot password?</a>
            </div>

            <div className="submitlogin">
              <button type="submit" className='submitlogin-btn'>{(isRegister)?"Register" : "Login"}</button>
            </div>

            <div className="register-link">
              {/* <p>Don't have an account ? <Link to="/register">Register</Link></p> */}
              <br /><br />
              <h6>{error}</h6><br /><br /><br /><br />
              <p>{(isRegister)?"Already a user ? ":"Don't have a account?"} <span  onClick={()=>setIsRegister(pre=>!pre)}> {(isRegister)?"Login":"Register"}</span></p>
            </div>

          </form>

        </div>
      </dialog>
    </div>         
    </>
  )
}

export default Login
