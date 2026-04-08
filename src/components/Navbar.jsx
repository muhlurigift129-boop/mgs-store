import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase"

export default function Navbar({ cartCount }) {

const [user,setUser] = useState(null)

useEffect(()=>{
onAuthStateChanged(auth,(u)=>setUser(u))
},[])

return (

<div style={{
background:"#0a3d91",
padding:"12px 20px",
color:"#fff",
boxShadow:"0 2px 8px rgba(0,0,0,0.2)"
}}>

{/* TOP BAR */}
<div style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
flexWrap:"wrap",
gap:"10px"
}}>

{/* LOGO */}
<Link to="/" style={{textDecoration:"none", color:"#fff"}}>
<h2 style={{margin:0}}>
MGS<span style={{color:"#00e676"}}>.stall</span>
</h2>
</Link>

{/* NAV LINKS */}
<div style={{
display:"flex",
gap:"15px",
alignItems:"center",
flexWrap:"wrap"
}}>

<Link to="/" style={linkStyle}>Shop</Link>
<Link to="/track" style={linkStyle}>Track</Link>

{/* ADMIN ONLY (optional later security) */}
<Link to="/admin" style={linkStyle}>Admin</Link>

{/* 👤 USER SECTION */}
{user ? (

<>
<span style={{
fontSize:"13px",
background:"#004aad",
padding:"5px 10px",
borderRadius:"20px"
}}>
👤 {user.email}
</span>

<button
onClick={()=>signOut(auth)}
style={{
background:"#000",
color:"#fff",
border:"none",
padding:"6px 10px",
borderRadius:"5px",
cursor:"pointer"
}}
>
Logout
</button>
</>

) : (

<>
<Link to="/login" style={linkStyle}>Login</Link>
<Link to="/register" style={linkStyle}>Register</Link>
</>

)}

{/* CART */}
<Link to="/cart" style={{
...linkStyle,
background:"#e60023",
padding:"6px 14px",
borderRadius:"20px",
fontWeight:"bold",
display:"flex",
alignItems:"center",
gap:"5px"
}}>
🛒 {cartCount}
</Link>

</div>

</div>

{/* SEARCH BAR */}
<div style={{marginTop:"12px"}}>

<input
placeholder="Search noodles, flavours..."
style={{
width:"100%",
padding:"12px 15px",
borderRadius:"30px",
border:"none",
outline:"none",
background:"#fff",
color:"#000",
fontSize:"14px",
boxShadow:"0 2px 6px rgba(0,0,0,0.2)"
}}
/>

</div>

</div>

)
}

/* STYLE */
const linkStyle = {
color:"#fff",
textDecoration:"none",
fontSize:"14px"
}