import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import BottomNav from "./pages/BottomNav"

/* PAGES (FIXED CASE) */
import Home from "./pages/Home"
import Product from "./pages/product"
import Cart from "./pages/cart"
import Checkout from "./pages/checkout"

/* NEW */
import Tracking from "./pages/Tracking"

/* PAYMENTS */
import Payment from "./pages/payment"
import Success from "./pages/success"
import Cancel from "./pages/cancel"

/* ADMIN */
import Admin from "./pages/Admin"
import Analytics from "./pages/Analytics"

/* ---------------- APP ---------------- */

function App(){

/* ---------------- CART STORAGE ---------------- */

const [cart,setCart] = useState(()=>{

try{
const saved = localStorage.getItem("cart")
return saved ? JSON.parse(saved) : []
}catch{
return []
}

})

/* SAVE CART */
useEffect(()=>{
localStorage.setItem("cart",JSON.stringify(cart))
},[cart])

/* ---------------- CART FUNCTIONS ---------------- */

function addToCart(product){

setCart(prev=>{

const existing = prev.find(item=>item.id === product.id)

if(existing){
return prev.map(item =>
item.id === product.id
? {...item, qty: item.qty + 1}
: item
)
}

return [...prev,{...product, qty:1}]

})

}

function removeFromCart(id){
setCart(prev => prev.filter(item => item.id !== id))
}

function updateQty(id,qty){
if(qty <= 0) return
setCart(prev =>
prev.map(item =>
item.id === id ? {...item,qty} : item
)
)
}

function clearCart(){
setCart([])
}

/* ---------------- TOTALS ---------------- */

const cartCount = cart.reduce((sum,item)=>sum + item.qty,0)

const cartTotal = cart.reduce(
(sum,item)=>sum + (item.price * item.qty),0
)

const totalWeight = cart.reduce(
(sum,item)=>sum + (item.weight * item.qty),0
)

const shippingCost = totalWeight * 10
const grandTotal = cartTotal + shippingCost

/* ---------------- APP UI ---------------- */

return(

<BrowserRouter>

<Navbar cartCount={cartCount}/>

<Routes>

{/* 🏠 STORE */}
<Route
path="/"
element={<Home addToCart={addToCart}/>}
/>

{/* 📦 PRODUCT */}
<Route
path="/product/:id"
element={<Product addToCart={addToCart}/>}
/>

{/* 🛒 CART */}
<Route
path="/cart"
element={
<Cart
cart={cart}
removeFromCart={removeFromCart}
updateQty={updateQty}
cartTotal={cartTotal}
/>
}
/>

{/* 💳 CHECKOUT */}
<Route
path="/checkout"
element={
<Checkout
cart={cart}
cartTotal={cartTotal}
shippingCost={shippingCost}
grandTotal={grandTotal}
clearCart={clearCart}
/>
}
/>

{/* 💰 PAYMENT */}
<Route
path="/payment"
element={
<Payment
cart={cart}
total={grandTotal}
clearCart={clearCart}
/>
}
/>

{/* ✅ SUCCESS */}
<Route
path="/success"
element={<Success clearCart={clearCart}/>}
/>

<Route path="/cancel" element={<Cancel/>} />

{/* 📦 TRACKING (NEW) */}
<Route path="/track" element={<Tracking/>} />

{/* 🛠 ADMIN */}
<Route path="/admin" element={<Admin/>} />
<Route path="/analytics" element={<Analytics/>} />

</Routes>

<BottomNav/>

</BrowserRouter>

)

}

export default App