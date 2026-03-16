import { useState } from "react"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../firebase"
import { calculateShipping } from "../utils/shipping"

export default function Checkout({ cart }){

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [address,setAddress] = useState("")
const [delivery,setDelivery] = useState("pickup")

const itemsTotal = cart.reduce((sum,item)=>sum+item.price,0)

const weight = cart.reduce((sum,item)=>sum+item.weight,0)

const shipping = delivery === "shipping"
? calculateShipping(weight)
: 0

const total = itemsTotal + shipping

/* PayFast Sandbox */

const merchant_id = "10000100"
const merchant_key = "46f0cd694581a"

const return_url = "https://mgs-store.onrender.com/success"
const cancel_url = "https://mgs-store.onrender.com/cancel"

/* Generate simple order number */

const orderId = "MGS-" + Date.now()

async function pay(){

if(!name){
alert("Please enter your name")
return
}

if(!email){
alert("Please enter your email")
return
}

if(delivery==="shipping" && !address){
alert("Please enter delivery address")
return
}

try{

/* Save order */

await addDoc(collection(db,"orders"),{

orderId,
name,
email,
address,
delivery,
cart,
itemsTotal,
shipping,
total,
status:"pending payment",
createdAt:new Date()

})

}catch(err){

console.error("Order save error",err)

}

/* Create PayFast form */

const form = document.createElement("form")

form.method = "POST"

form.action = "https://sandbox.payfast.co.za/eng/process"

/* PayFast fields */

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

/* Add hidden inputs */

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

<div style={{padding:"40px",maxWidth:"500px",margin:"auto"}}>

<h2>MGS Stall Checkout</h2>

<input
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
style={{width:"100%",padding:"10px"}}
/>

<br/><br/>

<input
placeholder="Email Address"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={{width:"100%",padding:"10px"}}
/>

<br/><br/>

<select
value={delivery}
onChange={(e)=>setDelivery(e.target.value)}
style={{width:"100%",padding:"10px"}}
>

<option value="pickup">Pickup</option>
<option value="shipping">Shipping</option>

</select>

<br/><br/>

{delivery === "shipping" && (

<>
<input
placeholder="Delivery Address"
value={address}
onChange={(e)=>setAddress(e.target.value)}
style={{width:"100%",padding:"10px"}}
/>

<br/><br/>
</>

)}

<p>Items Total: <b>R{itemsTotal}</b></p>

<p>Shipping: <b>R{shipping}</b></p>

<h3>Total: R{total}</h3>

<br/>

<button
onClick={pay}
style={{
background:"#0a3d91",
color:"#fff",
border:"none",
padding:"12px",
width:"100%",
borderRadius:"6px",
cursor:"pointer",
fontWeight:"bold"
}}
>

Pay Securely

</button>

</div>

)

}