import emailjs from "emailjs-com"

export function sendEmail(order){

emailjs.send(

"service_mgs",
"template_order",
{
customer_name:order.name,
customer_email:order.email,
order_total:order.total
},

"YOUR_PUBLIC_KEY"

)

}