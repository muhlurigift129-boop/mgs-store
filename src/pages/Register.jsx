import { useState } from "react"
import { auth } from "../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate, Link } from "react-router-dom"

export default function Register(){

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [loading,setLoading]=useState(false)

const navigate = useNavigate()

async function register(){

if(!email || !password){
return alert("Please fill all fields")
}

if(password.length < 6){
return alert("Password must be at least 6 characters")
}

setLoading(true)

try{

await createUserWithEmailAndPassword(auth,email,password)

alert("Account created successfully ✅")

navigate("/") // go to store after signup

}catch(e){

alert(e.message)

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
boxShadow:"0 4px 12px rgba(0,0,0,0.15)"
}}>

<h2 style={{textAlign:"center",color:"#0a3d91"}}>
Create Account
</h2>

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
onClick={register}
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

{loading ? "Creating..." : "Register"}

</button>

<p style={{marginTop:"15px",textAlign:"center"}}>

Already have an account?  
<br/>

<Link to="/login" style={{color:"#e60023"}}>
Login
</Link>

</p>

</div>

</div>

)
}