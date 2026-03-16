import { db } from "../firebase"
import { collection, addDoc } from "firebase/firestore"

export async function saveOrder(order){

try{

await addDoc(collection(db,"orders"),order)

console.log("Order saved")

}catch(err){

console.error("Order error",err)

}

}