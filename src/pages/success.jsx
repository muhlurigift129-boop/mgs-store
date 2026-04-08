import { Link, useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { sendEmail } from "../utils/sendEmail"

export default function Success(){

const location = useLocation()
const saved = useRef(false)

const [order,setOrder] = useState(null)

/* ✅ Get orderId from URL (PayFast return) */
const params = new URLSearchParams(location.search)
const orderId = params.get("m_payment_id")

useEffect(()=>{

async function updateOrder(){

if(!orderId || saved.current) return

saved.current = true

try{

/* 🔥 FIND ORDER IN FIREBASE */
const q = query(
collection(db,"orders"),
where("orderId","==",orderId)
)

const snapshot = await getDocs(q)

if(snapshot.empty){
console.log("Order not found")
return
}

const docRef = snapshot.docs[0].ref
const data = snapshot.docs[0].data()

/* ✅ UPDATE STATUS */
await updateDoc(docRef,{
status:"paid",
paid:true
})

setOrder(data)

/* ✅ SEND EMAIL ONCE */
sendEmail({
...data,
status:"paid"
})

}catch(err){
console.error("Error updating order:",err)
}

}

updateOrder()

},[orderId])

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
width:"320px"
}}>

<h3>Order Summary</h3>

<p><b>Order ID:</b> {orderId}</p>
<p><b>Name:</b> {order.name}</p>
<p><b>Email:</b> {order.email}</p>
<p><b>Total Paid:</b> R{order.total}</p>
<p><b>Status:</b> <span style={{color:"green"}}>Paid</span></p>

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