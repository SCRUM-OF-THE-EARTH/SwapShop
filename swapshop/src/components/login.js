import { Component, useState } from "react";
import { apiDir } from "../data.js";

function LoginUser() {
    console.log("attempting the login user ");
    console.log(username, password)
    let url = apiDir+`login.php?user=${username}&&pass=${password}`;
    fetch(url)
    .then(data => data.text())
    .then(data => {
        if (data == "1") {
            console.log("login")
        } else {
            console.log("incorrect username or password")
        }
    })
}

let username;
let password;
 
export function Login() {
    
    return (
        <div id="login-container" class="login-container">

            <header>Login</header>
            <div>
                <input type="text" placeholder="username" value={username} onChange={e => username = e.target.value}/>
            </div>
            <div>
                <input type="password" placeholder="password" value={password} onChange={e => password = e.target.value}/>
            </div>

            <button onClick={LoginUser}>Login</button>

        </div>
    )
}
