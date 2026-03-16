import { Link, useLocation } from "react-router-dom"
import { useEffect, useRef } from "react"
import { saveOrder } from "../utils/saveOrder"
import { sendEmail } from "../utils/sendEmail"

export default function Success(){

const location = useLocation()
const order = location.state?.order

// prevents duplicate saving if page refreshes
const saved = useRef(false)

useEffect(()=>{

if(order && !saved.current){

saved.current = true

const fullOrder = {
...order,
status:"paid",
createdAt: new Date().toISOString()
}

saveOrder(fullOrder)
sendEmail(fullOrder)

}

},[order])

return(

<div style={{
minHeight:"100vh",
display:"flex",
flexDirection:"column",
justifyContent:"center",
alignItems:"center",
background:"#f5f5f5",
textAlign:"center",
padding:"40px"
}}>

<h1 style={{color:"green"}}>✅ Payment Successful</h1>

<p>Your order has been received.</p>

<p>Thank you for shopping at <b>MGS Stall</b>.</p>

{order && (

<div style={{
background:"#fff",
padding:"20px",
borderRadius:"8px",
marginTop:"20px",
boxShadow:"0 2px 8px rgba(0,0,0,0.2)",
width:"300px"
}}>

<h3>Order Summary</h3>

<p><b>Name:</b> {order.name}</p>

<p><b>Email:</b> {order.email}</p>

<p><b>Total Paid:</b> R{order.total}</p>

<p><b>Items:</b> {order.items?.length}</p>

</div>

)}

<Link to="/">

<button style={{
marginTop:"30px",
padding:"12px 20px",
background:"#0a3d91",
color:"#fff",
border:"none",
borderRadius:"6px",
cursor:"pointer",
fontSize:"16px"
}}>

Return to Store

</button>

</Link>

</div>

)

}