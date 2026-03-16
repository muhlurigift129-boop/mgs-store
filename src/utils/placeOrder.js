import { db } from "../firebase"
import { collection, addDoc } from "firebase/firestore"

export async function placeOrder(cart,total){

await addDoc(collection(db,"orders"),{

items:cart,
total:total,
status:"processing",
date:Date.now()

})

alert("Order placed")

}