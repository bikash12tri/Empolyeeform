
import "./home.css"
import { Link,useNavigate } from "react-router-dom"


const Home = (() => {

    const navegate = new useNavigate();
    navegate("register");

    return(

        <div className="home">
            <h1>WelCome to EmployeeForm</h1>
           <h3><Link to='/register'> <button>Go To Register page</button></Link></h3>
        </div>
    )
});


export default Home;