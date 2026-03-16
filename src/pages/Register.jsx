import { useState } from "react"
import { auth } from "../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"

export default function Register(){

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

function register(){

createUserWithEmailAndPassword(auth,email,password)
.then(()=>{
alert("Account created")
})
.catch(e=>alert(e.message))

}

return(

<div style={{padding:"40px"}}>

<h2>Create Account</h2>

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

<button onClick={register}>Register</button>

</div>

)

}