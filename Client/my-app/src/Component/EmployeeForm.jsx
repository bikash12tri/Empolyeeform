
 import './employee.css'
 import {  Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {useState} from "react";

 
 const EmpolyeeForm = () => {

    const navigate = new useNavigate();
    const [values, setValues] = useState({
      Fname: "",
      Lname:"",
      email: "",
      phone: "",
      conphone:"",
      address: "",
    });
  
    const handlesumbit= (e) => {
        const{name,value}=e.target
        setValues({
            ...values,
            [name]:value
        })
    }
    const registerEmployee = () => {

          const{Fname,email,Lname,phone,address,conphone}=values;
          if(Fname && email &&phone&&Lname&& address && conphone && (phone===conphone))
        { alert("posted");
          axios.post("http://localhost:5000/register",values)
          .then(res=>{
            alert(res.data.message)
            navigate("/login")
        }
          )
        }
        else{
            alert("Incomplete form")
        }
}

  return (

    <> 
    <formcontainer>
        <form>
            <div className='brand'>
              <h2>Employee<span className='span_tag'>Form</span></h2>
            </div>
            <input type="text" placeholder='Enter your Fname' value={values.Fname} name='Fname'
            onChange={handlesumbit}
             />

            <input type="text" placeholder='Enter your Lname'value={values.Lname} name='Lname'
            onChange={handlesumbit}
             />

            <input type="text" placeholder='Enter your email' value={values.email}  name='email'
            onChange={handlesumbit}
            />

            <input type="text" placeholder='Enter your phone' value={values.phone} name='phone'
            onChange={handlesumbit}
            />

            <input type="text" placeholder='Enter your address' value={values.address} name='address'
            onChange={handlesumbit}
             />
             <input type="text" placeholder='Enter your conphone' value={values.conphone} name='conphone'
            onChange={handlesumbit}
             />
            
          <button type='sumbit' onClick={registerEmployee}>Register</button>
          <span>Already have an account <Link to='/login'>Login</Link></span>
        </form>
       </formcontainer>
    </>
  )
}

export default EmpolyeeForm;