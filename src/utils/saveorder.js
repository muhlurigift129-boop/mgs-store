import { db } from "../firebase"
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore"

export async function saveOrder(order){

try{

/* 🔍 Find existing order using orderId */
const q = query(
collection(db,"orders"),
where("orderId","==",order.orderId)
)

const snapshot = await getDocs(q)

if(snapshot.empty){
console.log("Order not found — skipping duplicate save")
return order.orderId
}

/* 📄 Get document */
const docRef = snapshot.docs[0].ref

/* ✅ Update instead of creating new */
await updateDoc(docRef,{
status: order.status || "paid",
paid: true,
updatedAt: new Date()
})

return order.orderId

}catch(err){
console.error("Save order error:",err)
return null
}

}