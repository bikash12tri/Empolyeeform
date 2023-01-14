
import './login.css'
import {  Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {useState} from "react"



const Login  = ({updateUserDataLC}) => {

  const navigate = new useNavigate();

    const [values, setValues] = useState({
       email:"",
       phone:"",
    })
  
    const handlesumbit= (e) => {

        const{name,value}=e.target
        setValues({
            ...values,
            [name]:value
        })
    }
    const loginData = ()=>{

      axios.post("http://localhost:5000/login",values)
      .then(res =>{
         alert(res.data.message)
         updateUserDataLC(res.data.user) 
         navigate("/")
     }         
      )
   }
  
  return (
    <> 
    <formcontainer>
        <form>
            <div className='brand'>
              <h2>LOGIN</h2>
            </div>
            <input type="text" placeholder='Enter your email' value={values.email} name='email'
            onChange={handlesumbit}
             />

            <input type="text" placeholder='Enter your phone' value={values.phone} name='phone'
            onChange={handlesumbit}
            />

          <button type='sumbit' onClick={loginData}>Login</button>

          <span>Did't have an account <Link to='/'>Home</Link></span>
        </form>
    </formcontainer>
    </>
  )
}

export default Login;