import { useEffect,useState } from "react"
import { db } from "../firebase"
import { collection,getDocs } from "firebase/firestore"

export default function Orders(){

const [orders,setOrders]=useState([])

useEffect(()=>{

async function load(){

const snap = await getDocs(collection(db,"orders"))

setOrders(snap.docs.map(d=>d.data()))

}

load()

},[])

return(

<div style={{padding:"20px"}}>

<h2>Your Orders</h2>

{orders.map((o,i)=>(

<div key={i}>

<p>Status: {o.status}</p>
<p>Total: R{o.total}</p>

</div>

))}

</div>

)

}