export default function Header({cartCount}){

return(

<div className="header">

<div style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}>

<div className="logo">

MGS<span style={{color:"#00aaff"}}>.stall</span>

</div>

<div>🛒 {cartCount}</div>

</div>

<input
className="search"
placeholder="Search noodles, flavours..."
/>

</div>

)

}