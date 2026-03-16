export default function Categories(){

const cats = [
{name:"Chicken",img:"https://via.placeholder.com/100?text=Chicken"},
{name:"Beef",img:"https://via.placeholder.com/100?text=Beef"},
{name:"Curry",img:"https://via.placeholder.com/100?text=Curry"},
{name:"Cheese",img:"https://via.placeholder.com/100?text=Cheese"},
{name:"Spicy-beef",img:"https://via.placeholder.com/100?text=Spicy"}
{name:"lamb",img:"https://via.placeholder.com/100?text=lamb"}
{name:"vegetable",img:"https://via.placeholder.com/100?text=vegetable"}
]

return(

<div style={{padding:"15px"}}>

<h3>Featured Categories</h3>

<div style={{
display:"flex",
gap:"15px",
overflowX:"auto"
}}>

{cats.map((c,i)=>(

<div key={i} style={{textAlign:"center"}}>

<img
src={c.img}
style={{
width:"70px",
height:"70px",
borderRadius:"10px"
}}
/>

<p>{c.name}</p>

</div>

))}

</div>

</div>

)

}