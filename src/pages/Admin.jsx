import { useState } from "react"
import { db } from "../firebase"
import { collection, addDoc } from "firebase/firestore"

export default function Admin(){

const [name,setName] = useState("")
const [price,setPrice] = useState("")
const [image,setImage] = useState("")
const [weight,setWeight] = useState("")

async function addProduct(){

await addDoc(collection(db,"products"),{

name,
price:Number(price),
image,
weight:Number(weight)

})

alert("Product added")

}

return(

<div style={{padding:"40px"}}>

<h2>Admin Dashboard</h2>

<h3>Add Product</h3>

<input
placeholder="Product Name"
onChange={e=>setName(e.target.value)}
/>

<br/>

<input
placeholder="Price"
onChange={e=>setPrice(e.target.value)}
/>

<br/>

<input
placeholder="Image URL"
onChange={e=>setImage(e.target.value)}
/>

<br/>

<input
placeholder="Weight"
onChange={e=>setWeight(e.target.value)}
/>

<br/>

<button onClick={addProduct}>

Add Product

</button>

</div>

)

}