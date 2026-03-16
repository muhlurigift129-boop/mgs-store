import { useState } from "react";

export default function Store({addToCart}){

const products = [

{ id:1, name:"Chicken Noodles Packet", price:25, weight:0.1, image:"https://via.placeholder.com/200?text=Chicken"},
{ id:2, name:"Vegetable Noodles Packet", price:25, weight:0.1, image:"https://via.placeholder.com/200?text=Vegetable"},
{ id:3, name:"Curry Noodles Packet", price:25, weight:0.1, image:"https://via.placeholder.com/200?text=Curry"},
{ id:4, name:"Roast Lamb Noodles Packet", price:25, weight:0.1, image:"https://via.placeholder.com/200?text=Lamb"},
{ id:5, name:"Cheese Noodles Packet", price:25, weight:0.1, image:"https://via.placeholder.com/200?text=Cheese"},
{ id:6, name:"Beef Noodles Packet", price:25, weight:0.1, image:"https://via.placeholder.com/200?text=Beef"},
{ id:7, name:"Spicy Beef Noodles Packet", price:25, weight:0.1, image:"https://via.placeholder.com/200?text=Spicy+Beef"},

{ id:8, name:"Chicken Noodles Box", price:200, weight:2, image:"https://via.placeholder.com/200?text=Chicken+Box"},
{ id:9, name:"Vegetable Noodles Box", price:200, weight:2, image:"https://via.placeholder.com/200?text=Vegetable+Box"},
{ id:10, name:"Curry Noodles Box", price:200, weight:2, image:"https://via.placeholder.com/200?text=Curry+Box"},
{ id:11, name:"Roast Lamb Noodles Box", price:200, weight:2, image:"https://via.placeholder.com/200?text=Lamb+Box"},
{ id:12, name:"Cheese Noodles Box", price:200, weight:2, image:"https://via.placeholder.com/200?text=Cheese+Box"},
{ id:13, name:"Beef Noodles Box", price:200, weight:2, image:"https://via.placeholder.com/200?text=Beef+Box"},
{ id:14, name:"Spicy Beef Noodles Box", price:200, weight:2, image:"https://via.placeholder.com/200?text=Spicy+Beef+Box"}

];

const [cart,setCart] = useState({});
const [search,setSearch] = useState("");
const [delivery,setDelivery] = useState("pickup");

function addToCart(product){

const newCart = {...cart}

if(newCart[product.id]){
newCart[product.id].qty += 1
}else{
newCart[product.id] = {...product, qty:1}
}

setCart(newCart)
}

function removeFromCart(id){

const newCart = {...cart}

if(newCart[id].qty > 1){
newCart[id].qty -= 1
}else{
delete newCart[id]
}

setCart(newCart)
}

const filteredProducts = products.filter(p =>
p.name.toLowerCase().includes(search.toLowerCase())
)

const cartItems = Object.values(cart)

const itemsTotal = cartItems.reduce((sum,item)=>sum + item.price * item.qty,0)

const weight = cartItems.reduce((sum,item)=>sum + item.weight * item.qty,0)

const shipping = delivery==="shipping" ? weight * 10 : 0

const total = itemsTotal + shipping

const cartCount = cartItems.reduce((sum,item)=>sum + item.qty,0)

return(

<div style={{background:"#f5f5f5",minHeight:"100vh"}}>

{/* HEADER */}

<div style={{
background:"#0a3d91",
color:"#fff",
padding:"10px 20px",
display:"flex",
alignItems:"center",
justifyContent:"space-between"
}}>

<h2>MGS STALL</h2>

<input
placeholder="Search noodles..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={{
padding:"8px",
width:"300px",
borderRadius:"5px",
border:"none"
}}
/>

<div>🛒 Cart ({cartCount})</div>

</div>

{/* PRODUCT GRID */}

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",
gap:"20px",
padding:"30px"
}}>

{filteredProducts.map(p=>(

<div key={p.id}
style={{
background:"#fff",
padding:"15px",
borderRadius:"8px",
boxShadow:"0 2px 8px rgba(0,0,0,0.2)",
textAlign:"center"
}}>

<img src={p.image} width="150"/>

<h4>{p.name}</h4>

<p style={{color:"#0a3d91",fontWeight:"bold"}}>R{p.price}</p>

<p style={{fontSize:"12px"}}>⭐⭐⭐⭐☆</p>

<div style={{display:"flex",justifyContent:"center",gap:"10px"}}>

<button
onClick={()=>removeFromCart(p.id)}
style={{
background:"#ccc",
border:"none",
padding:"5px 10px",
cursor:"pointer"
}}
>
-
</button>

<button
onClick={()=>addToCart(p)}
style={{
background:"#e60023",
color:"#fff",
border:"none",
padding:"5px 12px",
cursor:"pointer"
}}
>
+
</button>

</div>

</div>

))}

</div>

{/* ORDER SUMMARY */}

{cartItems.length>0 && (

<div style={{
position:"fixed",
bottom:"20px",
right:"20px",
background:"#fff",
padding:"20px",
width:"260px",
borderRadius:"10px",
boxShadow:"0 4px 10px rgba(0,0,0,0.3)"
}}>

<h3>Order Summary</h3>

<p>Items: {cartCount}</p>

<p>Items Total: R{itemsTotal.toFixed(2)}</p>

<div>

<label>
<input
type="radio"
checked={delivery==="pickup"}
onChange={()=>setDelivery("pickup")}
/>
 Pickup
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

<p>Shipping: R{shipping.toFixed(2)}</p>

<h3>Total: R{total.toFixed(2)}</h3>

<button
style={{
background:"#0a3d91",
color:"#fff",
border:"none",
padding:"10px",
width:"100%",
borderRadius:"5px",
cursor:"pointer"
}}
>

Checkout

</button>

</div>

)}

</div>

)

}