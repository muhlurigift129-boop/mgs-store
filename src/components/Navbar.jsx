import { Link } from "react-router-dom"

export default function Navbar({cartCount}){

return(

<div style={{
background:"#121212",
padding:"15px",
color:"white"
}}>

<div style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}>

<h2>
MGS<span style={{color:"#00aaff"}}>.stall
</span>
</h2>

<Link to="/cart" style={{color:"white"}}>
🛒 {cartCount}
</Link>

</div>

<input
placeholder="Search noodles, brands..."
style={{
width:"100%",
marginTop:"10px",
padding:"12px",
borderRadius:"25px",
border:"none",
background:"#000",
color:"white"
}}
/>

</div>

)

}