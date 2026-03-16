import { useParams } from "react-router-dom"
import { products } from "../data"

export default function Product({addToCart}){

const {id} = useParams()

const product = products.find(p=>p.id==id)

return(

<div style={{padding:"40px"}}>

<img src={product.image} width="300"/>

<h2>{product.name}</h2>

<h3>R{product.price}</h3>

<p>⭐⭐⭐⭐☆</p>

<button onClick={()=>addToCart(product)}>
Add To Cart
</button>

</div>

)

}