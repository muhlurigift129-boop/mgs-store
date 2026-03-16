export function calculateShipping(weight){

if(weight <= 0.5) return 50

if(weight <= 1) return 60

if(weight <= 3) return 90

if(weight <= 5) return 120

return 150

}