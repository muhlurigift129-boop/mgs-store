export default function ProductCard({ product, addToCart, removeFromCart }) {

return (

<div style={{
  background:"#fff",
  padding:"15px",
  borderRadius:"12px",
  boxShadow:"0 4px 12px rgba(0,0,0,0.1)",
  textAlign:"center",
  transition:"0.3s"
}}
onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"}
onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
>

<img src={product.image} width="140" />

<h4>{product.name}</h4>

<p style={{color:"#0a3d91",fontWeight:"bold"}}>
R{product.price}
</p>

<p style={{fontSize:"12px",color:"#ffaa00"}}>⭐⭐⭐⭐☆</p>

<div style={{display:"flex",justifyContent:"center",gap:"10px"}}>

<button onClick={()=>removeFromCart(product.id)}>−</button>

<button onClick={()=>addToCart(product)}>+</button>

</div>

</div>

)

}