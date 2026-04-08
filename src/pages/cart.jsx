import { useState } from "react"
import { calculateShipping } from "../utils/shipping"
import { useNavigate } from "react-router-dom"

export default function Cart({ cart, setCart }) {

const navigate = useNavigate()

// DELIVERY STATE
const [delivery, setDelivery] = useState("pickup")

// CALCULATIONS (FIXED)
const itemsTotal = cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0)

const weight = cart.reduce((sum, item) => sum + item.weight * (item.qty || 1), 0)

const shipping = delivery === "shipping" ? calculateShipping(weight) : 0

const total = itemsTotal + shipping

// REMOVE ITEM
function removeItem(id){
setCart(cart.filter(item => item.id !== id))
}

// CHECKOUT
function handleCheckout(){

navigate("/checkout", {
state: {
cartItems: cart,
delivery,
total
}
})

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

<p>Qty: {item.qty || 1}</p>

<p style={{fontSize:"12px"}}>
Weight: {(item.weight * (item.qty || 1)).toFixed(2)} kg
</p>

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

<p>Items Total: <b>R{itemsTotal.toFixed(2)}</b></p>

<p>Total Weight: <b>{weight.toFixed(2)} kg</b></p>

<p>Shipping: <b>R{shipping.toFixed(2)}</b></p>

<h2>Total: R{total.toFixed(2)}</h2>

<button
onClick={handleCheckout}
style={{
background:"#0a3d91",
color:"#fff",
border:"none",
padding:"12px 20px",
cursor:"pointer",
borderRadius:"6px",
width:"100%",
marginTop:"10px",
fontWeight:"bold"
}}
>
Proceed to Checkout
</button>

</div>

</div>

)

}