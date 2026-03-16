import { useState } from "react"
import { calculateShipping } from "../utils/shipping"
import { useNavigate } from "react-router-dom"

export default function Cart({ cart, setCart }) {

const navigate = useNavigate()

const itemsTotal = cart.reduce((sum, item) => sum + item.price, 0)

const weight = cart.reduce((sum, item) => sum + item.weight, 0)

const [delivery, setDelivery] = useState("pickup")

const shipping = delivery === "shipping" ? calculateShipping(weight) : 0

const total = itemsTotal + shipping


function removeItem(id){
setCart(cart.filter(item => item.id !== id))
}


return (

<div style={{ padding:"40px", maxWidth:"900px", margin:"auto" }}>

<h2>Your Shopping Cart</h2>


{/* CART ITEMS */}

{cart.length === 0 && <p>Your cart is empty</p>}

{cart.map(item => (

<div
key={item.id}
style={{
display:"flex",
alignItems:"center",
background:"#fff",
padding:"15px",
marginBottom:"15px",
borderRadius:"8px",
boxShadow:"0 2px 6px rgba(0,0,0,0.1)"
}}
>

<img src={item.image} width="90" />

<div style={{ marginLeft:"15px", flex:1 }}>

<h4>{item.name}</h4>

<p>Price: R{item.price}</p>

<p style={{fontSize:"12px"}}>Weight: {item.weight} kg</p>

</div>

<button
onClick={()=>removeItem(item.id)}
style={{
background:"#e60023",
color:"#fff",
border:"none",
padding:"6px 12px",
cursor:"pointer",
borderRadius:"4px"
}}
>

Remove

</button>

</div>

))}


{/* DELIVERY OPTIONS */}

<div style={{
marginTop:"30px",
padding:"20px",
background:"#f7f7f7",
borderRadius:"8px"
}}>

<h3>Delivery Method</h3>

<label>

<input
type="radio"
checked={delivery==="pickup"}
onChange={()=>setDelivery("pickup")}
/>

 Pickup (Free)

</label>

<br/>

<label>

<input
type="radio"
checked={delivery==="shipping"}
onChange={()=>setDelivery("shipping")}
/>

 Shipping

</label>

</div>


{/* ORDER SUMMARY */}

<div style={{
marginTop:"25px",
background:"#fff",
padding:"20px",
borderRadius:"8px",
boxShadow:"0 2px 6px rgba(0,0,0,0.1)"
}}>

<h3>Order Summary</h3>

<p>Items Total: R{itemsTotal}</p>

<p>Total Weight: {weight.toFixed(2)} kg</p>

<p>Shipping: R{shipping}</p>

<h2>Total: R{total}</h2>


<button
onClick={()=>navigate("/checkout")}
style={{
background:"#0a3d91",
color:"#fff",
border:"none",
padding:"12px 20px",
cursor:"pointer",
borderRadius:"6px",
width:"100%",
marginTop:"10px"
}}
>

Proceed to Checkout

</button>

</div>

</div>

)

}