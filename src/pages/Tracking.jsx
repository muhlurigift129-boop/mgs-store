import { useState } from "react"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../firebase"

export default function Tracking(){

const [orderId,setOrderId] = useState("")
const [order,setOrder] = useState(null)
const [loading,setLoading] = useState(false)

async function trackOrder(){

if(!orderId) return alert("Enter Order ID")

setLoading(true)

try{

const q = query(
collection(db,"orders"),
where("orderId","==",orderId)
)

const snapshot = await getDocs(q)

if(snapshot.empty){
alert("Order not found")
setLoading(false)
return
}

setOrder(snapshot.docs[0].data())

}catch(err){
console.error(err)
alert("Error fetching order")
}

setLoading(false)
}

return(

<div style={{padding:"40px",textAlign:"center"}}>

<h2>📦 Track Your Order</h2>

<input
placeholder="Enter Order ID (MGS-...)"
value={orderId}
onChange={(e)=>setOrderId(e.target.value)}
style={{padding:"12px",width:"300px"}}
/>

<br/><br/>

<button onClick={trackOrder} style={{
padding:"10px 20px",
background:"#0a3d91",
color:"#fff",
border:"none"
}}>
{loading ? "Checking..." : "Track Order"}
</button>

{order && (

<div style={{
marginTop:"30px",
background:"#fff",
padding:"20px",
borderRadius:"10px",
boxShadow:"0 4px 10px rgba(0,0,0,0.2)",
display:"inline-block"
}}>

<h3>Order Status</h3>

<p><b>Status:</b> 
<span style={{
color:
order.status==="paid" ? "green" :
order.status==="delivered" ? "blue" :
"orange"
}}>
 {order.status}
</span>
</p>

<p><b>Total:</b> R{order.total}</p>

</div>

)}

</div>

)
}