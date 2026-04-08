import { useState } from "react"
import { auth } from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"

export default function Login(){

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [loading,setLoading] = useState(false)

const navigate = useNavigate()

async function login(){

if(!email || !password){
return alert("Please enter email and password")
}

setLoading(true)

try{

await signInWithEmailAndPassword(auth,email,password)

alert("Welcome back 👋")

navigate("/") // redirect to store

}catch(e){

if(e.code === "auth/user-not-found"){
alert("User not found")
}else if(e.code === "auth/wrong-password"){
alert("Wrong password")
}else{
alert("Login failed")
}

}

setLoading(false)
}

return(

<div style={{
minHeight:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"#f5f5f5"
}}>

<div style={{
background:"#fff",
padding:"30px",
borderRadius:"10px",
width:"320px",
boxShadow:"0 4px 12px rgba(0,0,0,0.2)"
}}>

<h2 style={{textAlign:"center",color:"#0a3d91"}}>Login</h2>

<input
placeholder="Email"
value={email}
onChange={e=>setEmail(e.target.value)}
style={{
width:"100%",
padding:"12px",
marginBottom:"10px",
borderRadius:"6px",
border:"1px solid #ccc"
}}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={e=>setPassword(e.target.value)}
style={{
width:"100%",
padding:"12px",
marginBottom:"15px",
borderRadius:"6px",
border:"1px solid #ccc"
}}
/>

<button
onClick={login}
disabled={loading}
style={{
width:"100%",
padding:"12px",
background: loading ? "#999" : "#0a3d91",
color:"#fff",
border:"none",
borderRadius:"6px",
cursor:"pointer",
fontWeight:"bold"
}}
>
{loading ? "Logging in..." : "Login"}
</button>

<p style={{marginTop:"15px",textAlign:"center"}}>

Don't have an account?  
<a href="/register" style={{color:"#e60023",marginLeft:"5px"}}>
Register
</a>

</p>

</div>

</div>

)
}