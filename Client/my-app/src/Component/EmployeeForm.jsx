
 import "./employee.css";
 import { Link, useNavigate } from "react-router-dom";
 import axios from "axios";
 import { useState } from "react";
 
 const EmpolyeeForm = () => {
   const navigate = new useNavigate();
   const [values, setValues] = useState({
     Fname: "",
     Lname: "",
     email: "",
     phone: "",
     password: "",
     address: "",
   });
 
   const onSubmits = (event) => {
     event.preventDefault();
   };
   const handlesumbit = (e) => {
     const { name, value } = e.target;
     setValues({
       ...values,
       [name]: value,
     });
   };
   const registerEmployee = () => {
     const { Fname, Lname, email, phone, password, address } = values;
     if (!Fname) {
       return alert("Please enter your first name");
     }
     if (!/^[A-Za-z ]+$/.test(Fname)) {
       return alert("Please enter a valid first name");
     }
     if (!Lname) {
       return alert("Please enter your last name");
     }
     if (!/^[A-Za-z ]+$/.test(Lname)) {
       return alert("Please enter a valid last name");
     }
     if (!email) {
       return alert("Please enter your email");
     }
     if (!/.+\@.+\..+/.test(email)) {
       return alert("Please enter a valid email Id");
     }
     if (!password) {
       return alert("Password is required");
     }
     if (!/^\S{8,15}$/.test(password)) {
       return alert(
         "Password should be minimum 8 and maximum 15 character.It contains atleast--> 1 Uppercase letter, 1 Lowercase letter, 1 Number, 1 Special character"
       );
     }
     if (!address) {
       return alert("Please enter your address");
     }
     if (!/^[A-Za-z ]+$/.test(address)) {
       return alert("Please enter a valid address");
     }
     if (Fname && email && phone && Lname && address && password) {
       alert("posted");
       axios.post("http://localhost:5000/register", values).then((res) => {
         alert(res.data.message);
         navigate("/login");
       });
     }
   };
 
   return (
     <>
       <formcontainer>
         <form onSubmit={onSubmits}>
           <div className="brand">
             <h2>
               Employee<span className="span_tag">Form</span>
             </h2>
           </div>
           <input
             type="text"
             placeholder="Enter your Fname"
             value={values.Fname}
             name="Fname"
             onChange={handlesumbit}
             required
           />
 
           <input
             type="text"
             placeholder="Enter your Lname"
             value={values.Lname}
             name="Lname"
             onChange={handlesumbit}
             required
           />
 
           <input
             type="email"
             placeholder="Enter your email"
             value={values.email}
             name="email"
             onChange={handlesumbit}
             required
           />
 
           <input
             type="number"
             placeholder="Enter your phone"
             value={values.phone}
             name="phone"
             onChange={handlesumbit}
             required
           />
 
           <input
             type="text"
             placeholder="Enter your address"
             value={values.address}
             name="address"
             onChange={handlesumbit}
             required
           />
 
           <input
             type="text"
             placeholder="Enter your password"
             value={values.password}
             name="password"
             onChange={handlesumbit}
             required
           />
 
           <button type="sumbit" onClick={registerEmployee}>
             Register
           </button>
           <span>
             Already have an account <Link to="/login">Login</Link>
           </span>
         </form>
       </formcontainer>
     </>
   );
 };
 
 export default EmpolyeeForm;