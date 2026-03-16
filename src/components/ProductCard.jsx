import { link } from "react-router-dom"

export default function ProductCard({product,addToCart}){

return(

<div style={{
background:"#1c1c1c",
padding:"10px",
borderRadius:"10px",
width:"180px"
}}>

<Link to={"/product/"+product.id}>

<img
src={product.image}
style={{
width:"100%",
borderRadius:"8px"
}}
/>

</Link>

<h4>{product.name}</h4>

<p style={{fontWeight:"bold"}}>

R {product.price}

</div>

<p>⭐ 4.5</p>

<button
onClick={()=>addToCart(product)}
style={{
background:"#00aaff",
border:"none",
padding:"8px",
borderRadius:"6px",
color:"white",
width:"100%"
}}
>

Add to Cart

</button>

</div>

)

}