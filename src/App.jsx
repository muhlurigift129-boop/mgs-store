import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import BottomNav from "./components/BottomNav"

import Home from "./pages/Home"
import Product from "./pages/Product"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"

/* PAYMENTS */
import Payment from "./pages/Payment"
import Success from "./pages/Success"
import Cancel from "./pages/Cancel"

/* ADMIN */
import Admin from "./pages/Admin"
import Analytics from "./pages/Analytics"

function App(){

/* ---------------- CART STORAGE ---------------- */

const [cart,setCart] = useState(()=>{

const savedCart = localStorage.getItem("cart")

return savedCart ? JSON.parse(savedCart) : []

})

/* SAVE CART TO LOCAL STORAGE */

useEffect(()=>{

localStorage.setItem("cart",JSON.stringify(cart))

},[cart])

/* ---------------- CART FUNCTIONS ---------------- */

/* ADD TO CART */

function addToCart(product){

setCart(prevCart=>{

const existing = prevCart.find(item=>item.id===product.id)

if(existing){

return prevCart.map(item =>
item.id === product.id
? {...item, qty: item.qty + 1}
: item
)

}

return [...prevCart,{...product,qty:1}]

})

}

/* REMOVE FROM CART */

function removeFromCart(id){

setCart(prevCart => prevCart.filter(item => item.id !== id))

}

/* UPDATE QUANTITY */

function updateQty(id,qty){

if(qty <= 0) return

setCart(prevCart =>
prevCart.map(item =>
item.id === id ? {...item,qty} : item
)
)

}

/* CLEAR CART */

function clearCart(){

setCart([])

}

/* ---------------- CART TOTALS ---------------- */

const cartCount = cart.reduce((sum,item)=>sum+item.qty,0)

const cartTotal = cart.reduce(
(sum,item)=>sum+(item.price * item.qty),0
)

/* ---------------- APP ---------------- */

return(

<BrowserRouter>

<Navbar cartCount={cartCount}/>

<Routes>

<Route
path="/"
element={<Home addToCart={addToCart}/>}
/>

<Route
path="/product/:id"
element={<Product addToCart={addToCart}/>}
/>

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

<Route
path="/checkout"
element={
<Checkout
cart={cart}
cartTotal={cartTotal}
clearCart={clearCart}
/>
}
/>

/* ---------------- PAYMENTS ---------------- */

<Route
path="/payment"
element={
<Payment
cart={cart}
cartTotal={cartTotal}
clearCart={clearCart}
/>
}
/>

<Route
path="/success"
element={<Success clearCart={clearCart}/>}
/>

<Route
path="/cancel"
element={<Cancel/>}
/>

/* ---------------- ADMIN ---------------- */

<Route
path="/admin"
element={<Admin/>}
/>

<Route
path="/analytics"
element={<Analytics/>}
/>

</Routes>

<BottomNav/>

</BrowserRouter>

)

}

export default App