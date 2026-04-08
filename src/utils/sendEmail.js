import emailjs from "@emailjs/browser"

export function sendEmail(order){

const serviceID = "service_l5oatwh"
const templateID = "template_frfph9m"
const publicKey = "Oc2yifG1pUMdKZUse"

const itemsList = order.cart
.map(item => `<li>${item.name} x${item.qty || 1} - R${item.price}</li>`)
.join("")

const templateParams = {
name: order.name,
email: order.email,
order_id: order.orderId,
items: itemsList,
items_total: order.itemsTotal,
shipping: order.shipping,
total: order.total,
delivery: order.delivery,
address: order.address
}

emailjs.send(serviceID, templateID, templateParams, publicKey)
.then(() => {
console.log("✅ Email sent")
})
.catch((error) => {
console.error("❌ Email error:", error)
})

}