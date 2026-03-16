import { Link } from "react-router-dom"

export default function Cancel(){

return(

<div style={{
minHeight:"100vh",
display:"flex",
flexDirection:"column",
justifyContent:"center",
alignItems:"center",
background:"#f5f5f5"
}}>

<h1 style={{color:"red"}}>❌ Payment Cancelled</h1>

<p>Your order was not completed.</p>

<p>You can return and try again.</p>

<Link to="/cart">

<button style={{
marginTop:"20px",
padding:"12px 20px",
background:"#e60023",
color:"#fff",
border:"none",
borderRadius:"6px",
cursor:"pointer"
}}>

Return to Cart

</button>

</Link>

</div>

)

}