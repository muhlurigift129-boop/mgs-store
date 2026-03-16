import { useEffect, useState } from "react"
import { db } from "../firebase"
import { collection, getDocs } from "firebase/firestore"

import Header from "../components/Header"
import Categories from "../components/Categories"
import ProductCard from "../components/ProductCard"
import BottomNav from "../components/BottomNav"

export default function Home({addToCart, cartCount}){

const [products,setProducts] = useState([])
const [search,setSearch] = useState("")

useEffect(()=>{

async function loadProducts(){

const snap = await getDocs(collection(db,"products"))

setProducts(

snap.docs.map(doc => ({
id:doc.id,
...doc.data()
}))

)

}

loadProducts()

},[])

const filteredProducts = products.filter(p =>
p.name.toLowerCase().includes(search.toLowerCase())
)

return(

<div style={{
background:"#111",
color:"white",
minHeight:"100vh",
paddingBottom:"70px"
}}>

<Header cartCount={cartCount} search={search} setSearch={setSearch}/>

<Categories/>

<h3 style={{padding:"15px"}}>

Pick Up Where You Left Off

</h3>

<div style={{
display:"flex",
gap:"15px",
overflowX:"auto",
padding:"15px"
}}>

{filteredProducts.map(p=>(

<ProductCard
key={p.id}
product={p}
addToCart={addToCart}
/>

))}

</div>

<BottomNav/>

</div>

)

}