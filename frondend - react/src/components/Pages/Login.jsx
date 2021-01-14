import React, {useEffect} from 'react';
import axios from "axios";

const Login = (props) => {

    const loginInfo = {
        "wachtwoord": "test9",
        "email": "test9@gmail.com"
    }
    const updatewachtwoord = (event) => {
        loginInfo.wachtwoord = event.target.value;
    };
    const updateemail = (event) => {
        loginInfo.email = event.target.value;
    };

    async function SetUser() {
        const res = await axios.post('http://localhost:3000/users/login', {wachtwoord:"test9",email:"test9@gmail.com"});
        console.log(res)
        props.setuser(res.data)
    }

    return (
        <div>
            <h1>Login</h1>
            <label>email:</label>
            <input type="text" onChange={updateemail}/>
            <br/>
            <label>wachtwoor:</label>
            <input  type="text" onChange={updatewachtwoord}/>
            <br/>
            <button onClick={SetUser}>Login</button>
        </div>
    );
};

export default Login;