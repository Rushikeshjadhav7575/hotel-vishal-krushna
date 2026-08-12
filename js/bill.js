// =========================================
// Hotel Vishal & Krushna
// Customer Order Confirmation
// =========================================


// Get current order

const order =
    JSON.parse(
        localStorage.getItem("currentOrder")
    );


// =========================================
// CHECK ORDER
// =========================================

if (!order) {

    alert("No order found!");

    window.location.href = "menu.html";

}


// =========================================
// SHOW ORDER ID
// =========================================

document.getElementById("orderId").innerText =
    order.orderId;


// =========================================
// SHOW ONLY TOTAL AMOUNT
// =========================================

document.getElementById("grandTotal").innerText =
    "₹" + Number(order.grandTotal).toFixed(2);