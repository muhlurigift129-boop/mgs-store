import { useState } from "react"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase"
import { calculateShipping } from "../utils/shipping"

export default function Checkout({ cart }){

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [address,setAddress] = useState("")
const [delivery,setDelivery] = useState("pickup")
const [loading,setLoading] = useState(false)

/* ✅ Normalize cart (VERY IMPORTANT) */
const cartItems = Array.isArray(cart) ? cart : Object.values(cart)

/* Totals */
const itemsTotal = cartItems.reduce(
  (sum,item)=> sum + item.price * (item.qty || 1),0
)

const weight = cartItems.reduce(
  (sum,item)=> sum + item.weight * (item.qty || 1),0
)

const shipping = delivery === "shipping"
? calculateShipping(weight)
: 0

const total = itemsTotal + shipping

/* PayFast */
const merchant_id = "10000100"
const merchant_key = "46f0cd694581a"

const return_url = "https://mgs-store.onrender.com/success"
const cancel_url = "https://mgs-store.onrender.com/cancel"

/* Unique Order ID */
const orderId = "MGS-" + Date.now()

async function pay(){

if(!name) return alert("Enter your name")
if(!email) return alert("Enter your email")

if(delivery==="shipping" && !address){
return alert("Enter delivery address")
}

setLoading(true)

try{

/* ✅ CLEAN CART STRUCTURE (for tracking page) */
const cleanCart = cartItems.map(item => ({
id: item.id,
name: item.name,
price: item.price,
qty: item.qty || 1
}))

/* ✅ SAVE ORDER */
await addDoc(collection(db,"orders"),{

orderId,
name,
email,
address: delivery==="shipping" ? address : "Pickup",
delivery,

items: cleanCart,   // 🔥 better structure
itemsTotal,
shipping,
total,

status:"pending payment",   // 🔥 tracking ready
paid:false,

createdAt: serverTimestamp()

})

}catch(err){

console.error("Order save error",err)
alert("Error saving order")
setLoading(false)
return
}

/* 💳 PAYFAST FORM */
const form = document.createElement("form")
form.method = "POST"
form.action = "https://sandbox.payfast.co.za/eng/process"

const data = {
merchant_id,
merchant_key,
amount: total.toFixed(2),
item_name: "MGS Noodles Order",
name_first: name,
email_address: email,
m_payment_id: orderId,
return_url,
cancel_url
}

for(const key in data){
const input = document.createElement("input")
input.type = "hidden"
input.name = key
input.value = data[key]
form.appendChild(input)
}

document.body.appendChild(form)
form.submit()
}

return(

<div style={{
padding:"40px",
maxWidth:"500px",
margin:"auto",
background:"#fff",
borderRadius:"10px",
boxShadow:"0 4px 12px rgba(0,0,0,0.1)"
}}>

<h2 style={{textAlign:"center"}}>🛒 MGS Checkout</h2>

<input
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
style={{width:"100%",padding:"12px",marginBottom:"10px"}}
/>

<input
placeholder="Email Address"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={{width:"100%",padding:"12px",marginBottom:"10px"}}
/>

<select
value={delivery}
onChange={(e)=>setDelivery(e.target.value)}
style={{width:"100%",padding:"12px",marginBottom:"10px"}}
>
<option value="pickup">Pickup</option>
<option value="shipping">Shipping</option>
</select>

{delivery === "shipping" && (
<input
placeholder="Delivery Address"
value={address}
onChange={(e)=>setAddress(e.target.value)}
style={{width:"100%",padding:"12px",marginBottom:"10px"}}
/>
)}

<hr/>

<p>Items Total: <b>R{itemsTotal.toFixed(2)}</b></p>
<p>Shipping: <b>R{shipping.toFixed(2)}</b></p>

<h3>Total: R{total.toFixed(2)}</h3>

<button
onClick={pay}
disabled={loading}
style={{
background: loading ? "#999" : "#0a3d91",
color:"#fff",
border:"none",
padding:"14px",
width:"100%",
borderRadius:"6px",
cursor:"pointer",
fontWeight:"bold"
}}
>
{loading ? "Processing..." : "Pay Securely"}
</button>

</div>

)
}