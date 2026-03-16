import { useState } from "react"
import { auth } from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"

export default function Login(){

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

function login(){

signInWithEmailAndPassword(auth,email,password)
.then(()=>{
alert("Logged in")
})
.catch(e=>alert(e.message))

}

return(

<div style={{padding:"40px"}}>

<h2>Login</h2>

<input
placeholder="Email"
onChange={e=>setEmail(e.target.value)}
/>

<br/>

<input
type="password"
placeholder="Password"
onChange={e=>setPassword(e.target.value)}
/>

<br/>

<button onClick={login}>Login</button>

</div>

)

}