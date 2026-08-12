// =========================================
// Hotel Vishal & Krushna
// menu.js
// =========================================

// Cart
let cart = [];
const GST_RATE = 5;

// HTML Elements
const customerName = document.getElementById("customerName");
const mobileNumber = document.getElementById("mobileNumber");
const tableNumber = document.getElementById("tableNumber");

const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");

// ===============================
// Read Table Number From QR
// Example:
// menu.html?table=5
// ===============================

// const params = new URLSearchParams(window.location.search);
// const table = params.get("table");

// if (tableNumber) {
//     tableNumber.value = table || "";
// }
const params = new URLSearchParams(window.location.search);
const table = params.get("table");

if (tableNumber) {
    tableNumber.value = table ? table : "1";
}
// ===============================
// Add To Cart
// ===============================

function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    renderCart();
}

// ===============================
// Increase Quantity
// ===============================

function increaseQty(index) {

    cart[index].quantity++;

    renderCart();
}

// ===============================
// Decrease Quantity
// ===============================

function decreaseQty(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    renderCart();

}

// ===============================
// Remove Item
// ===============================

function removeItem(index) {

    cart.splice(index, 1);

    renderCart();

}

// ===============================
// Render Cart
// ===============================

function renderCart() {

    cartItems.innerHTML = "";

    let subtotal = 0;

    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;

        subtotal += itemTotal;

        cartItems.innerHTML += `

<div class="cart-item mb-3 p-3 border rounded bg-dark text-white">

<div class="row align-items-center">

<div class="col-md-4">

<h5>${item.name}</h5>

<p>₹${item.price}</p>

</div>

<div class="col-md-3 text-center">

<button
class="btn btn-warning btn-sm"
onclick="decreaseQty(${index})">-</button>

<span class="mx-2">${item.quantity}</span>

<button
class="btn btn-warning btn-sm"
onclick="increaseQty(${index})">+</button>

</div>

<div class="col-md-3 text-center">

<strong>₹${itemTotal}</strong>

</div>

<div class="col-md-2 text-end">

<button
class="btn btn-danger btn-sm"
onclick="removeItem(${index})">

🗑 Remove

</button>

</div>

</div>

</div>

`;

    });

    const gst = subtotal * GST_RATE / 100;

    const grandTotal = subtotal + gst;

    totalPrice.innerHTML = `

<h5>Subtotal : ₹${subtotal.toFixed(2)}</h5>

<h5>GST (5%) : ₹${gst.toFixed(2)}</h5>

<hr>

<h4 class="text-success">

Grand Total : ₹${grandTotal.toFixed(2)}

</h4>

`;

}

// ===============================
// Place Order
// ===============================

function placeOrder() {

    const name = customerName.value.trim();

    const mobile = mobileNumber.value.trim();

    const table = tableNumber.value.trim();

    if (name === "") {

        alert("Please enter Customer Name");

        customerName.focus();

        return;

    }

    if (!/^[0-9]{10}$/.test(mobile)) {

        alert("Please enter a valid 10 digit Mobile Number");

        mobileNumber.focus();

        return;

    }

    if (cart.length === 0) {

        alert("Please add food items.");

        return;

    }

    let subtotal = 0;

    cart.forEach(item => {

        subtotal += item.price * item.quantity;

    });

    const gst = subtotal * GST_RATE / 100;

    const grandTotal = subtotal + gst;

    const order = {

        orderId: "ORD" + Date.now(),

        customerName: name,

        mobileNumber: mobile,

        tableNumber: table,

        items: cart,

        subtotal: subtotal,

        gst: gst,

        grandTotal: grandTotal,

        paymentStatus: "Pending",

        orderStatus: "Preparing",

        orderDate: new Date().toLocaleString()

    };

    localStorage.setItem(
        "currentOrder",
        JSON.stringify(order)
    );
    let orders =
    JSON.parse(localStorage.getItem("orders")) || [];

orders.push(order);

localStorage.setItem(
    "orders",
    JSON.stringify(orders)
);

    console.log(order);

    window.location.href = "bill.html";

}

// ===============================
// Place Order Button
// ===============================

const placeOrderBtn = document.getElementById("placeOrderBtn");

if (placeOrderBtn) {

    placeOrderBtn.addEventListener("click", placeOrder);

}