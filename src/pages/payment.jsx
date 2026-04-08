import { useLocation } from "react-router-dom"

export default function Payment(){

const location = useLocation()

// FULL ORDER (not just total)
const order = location.state?.order

// fallback
const total = order?.total || 0

// PayFast credentials
const merchant_id = "21640826"
const merchant_key = "lbwzjvmjwbsfj"

// IMPORTANT: unique order id
const order_id = Date.now()

// format amount
const amount = total.toFixed(2)

// URLs (Render)
const return_url = "https://mgs-store.onrender.com/success"
const cancel_url = "https://mgs-store.onrender.com/cancel"
const notify_url = "https://mgs-store.onrender.com/api/notify" // future webhook

return(

<div style={{
padding:"40px",
maxWidth:"500px",
margin:"auto",
background:"#fff",
borderRadius:"10px",
boxShadow:"0 2px 10px rgba(0,0,0,0.2)"
}}>

<h2 style={{textAlign:"center"}}>💳 Secure Payment</h2>

<p style={{textAlign:"center",fontSize:"18px"}}>
Total: <b>R{amount}</b>
</p>

<p style={{textAlign:"center",fontSize:"12px",color:"#777"}}>
Order ID: {order_id}
</p>

<form
action="https://sandbox.payfast.co.za/eng/process"
method="post"
>

<input type="hidden" name="merchant_id" value={merchant_id}/>
<input type="hidden" name="merchant_key" value={merchant_key}/>
<input type="hidden" name="amount" value={amount}/>
<input type="hidden" name="item_name" value="MGS Stall Noodles Order"/>

{/* IMPORTANT */}
<input type="hidden" name="m_payment_id" value={order_id}/>

{/* URLs */}
<input type="hidden" name="return_url" value={return_url}/>
<input type="hidden" name="cancel_url" value={cancel_url}/>
<input type="hidden" name="notify_url" value={notify_url}/>

<button
style={{
width:"100%",
padding:"14px",
background:"#0a3d91",
color:"white",
border:"none",
borderRadius:"6px",
fontSize:"16px",
cursor:"pointer"
}}
>
Pay with PayFast
</button>

</form>

</div>

)

}