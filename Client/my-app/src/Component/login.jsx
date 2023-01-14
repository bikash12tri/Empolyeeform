import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Login = ({ updateUserDataLC }) => {
  const navigate = new useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const onSubmits = (event) => {
    event.preventDefault();
  }
  const handlesumbit = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const loginData = () => {
    const {email, password} = values
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
      return alert("Password should be minimum 8 and maximum 15 character.It contains atleast--> 1 Uppercase letter, 1 Lowercase letter, 1 Number, 1 Special character")
    }
    axios.post("http://localhost:5000/login", values).catch(()=>{
      alert('either email or password is incorrect')
    }).then((res) => {
      alert(res.data.message);
      updateUserDataLC(res.data.user);
      navigate("/");
    })
  };

  return (
    <>
      <formcontainer>
        <form onSubmit={onSubmits}>
          <div className="brand">
            <h2>LOGIN</h2>
          </div>
          <input
            type="email"
            placeholder="Enter your email"
            value={values.email}
            name="email"
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

          <button type="sumbit" onClick={loginData}>
            Login
          </button>

          <span>
            Did't have an account <Link to="/">Home</Link>
          </span>
        </form>
      </formcontainer>
    </>
  );
};

export default Login;