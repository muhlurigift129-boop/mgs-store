import { useEffect,useState } from "react"
import { db } from "../firebase"
import { collection,getDocs } from "firebase/firestore"

export default function Analytics(){

const [orders,setOrders] = useState([])

useEffect(()=>{

async function load(){

const snap = await getDocs(collection(db,"orders"))

setOrders(snap.docs.map(d=>d.data()))

}

load()

},[])

const revenue = orders.reduce((sum,o)=>sum+o.total,0)

return(

<div style={{padding:"40px"}}>

<h2>Sales Dashboard</h2>

<p>Total Orders: {orders.length}</p>

<p>Total Revenue: R{revenue}</p>

</div>

)

}