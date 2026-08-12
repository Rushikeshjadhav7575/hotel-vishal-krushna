// =============================================
// HOTEL VISHAL & KRUSHNA
// ADMIN DASHBOARD
// =============================================


// =============================================
// LOAD EVERYTHING
// =============================================

function loadDashboard() {

    loadOrders();

    loadTableBookings();

    loadHallBookings();

    loadTodayIncome();

}


// =============================================
// FOOD ORDERS
// =============================================

function loadOrders() {

    const container =
        document.getElementById("ordersContainer");

    const orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];


    const totalOrders =
        document.getElementById("totalOrders");


    if (totalOrders) {

        totalOrders.innerText =
            orders.length;

    }


    if (!container) {
        return;
    }


    if (orders.length === 0) {

        container.innerHTML = `

            <div class="alert alert-info text-center">

                No food orders yet.

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    orders
        .slice()
        .reverse()
        .forEach((order, reverseIndex) => {


            const realIndex =
                orders.length -
                1 -
                reverseIndex;


            let itemsHTML = "";


            if (
                order.items &&
                Array.isArray(order.items)
            ) {

                order.items.forEach(item => {

                    itemsHTML += `

                        <tr>

                            <td>
                                ${item.name || "Item"}
                            </td>

                            <td>
                                ${item.quantity || 0}
                            </td>

                            <td>
                                ₹${Number(
                                    item.price || 0
                                ).toFixed(2)}
                            </td>

                            <td>
                                ₹${(
                                    Number(item.price || 0) *
                                    Number(item.quantity || 0)
                                ).toFixed(2)}
                            </td>

                        </tr>

                    `;

                });

            }


            // =====================================
            // PAYMENT STATUS
            // =====================================

            const payment =
                order.paymentStatus ||
                "Pending";


            const paymentBadge =
                payment === "Paid"

                ?

                `

                    <span class="badge bg-success">

                        PAID

                    </span>

                `

                :

                `

                    <span class="badge bg-danger">

                        PENDING

                    </span>

                `;


            // =====================================
            // KITCHEN STATUS
            // =====================================

            const kitchenStatus =
                order.kitchenStatus ||
                "New";


            let kitchenBadge = "";


            if (
                kitchenStatus === "Completed"
            ) {

                kitchenBadge = `

                    <span class="badge bg-success">

                        🍽️ FOOD READY

                    </span>

                `;

            }

            else if (
                kitchenStatus === "Preparing"
            ) {

                kitchenBadge = `

                    <span class="badge bg-primary">

                        👨‍🍳 PREPARING

                    </span>

                `;

            }

            else {

                kitchenBadge = `

                    <span class="badge bg-warning text-dark">

                        ⏳ WAITING FOR KITCHEN

                    </span>

                `;

            }


            // =====================================
            // BILL STATUS
            // =====================================

            const billStatus =
                order.billStatus ||
                "Pending";


            let billBadge = "";


            if (
                billStatus === "Accepted"
            ) {

                billBadge = `

                    <span class="badge bg-info text-dark">

                        BILL ACCEPTED

                    </span>

                `;

            }

            else {

                billBadge = `

                    <span class="badge bg-secondary">

                        BILL NOT ACCEPTED

                    </span>

                `;

            }


            // =====================================
            // CARD
            // =====================================

            container.innerHTML += `

                <div
                    class="card mb-4
                           border-warning
                           shadow-sm">


                    <!-- HEADER -->

                    <div
                        class="card-header
                               bg-dark
                               text-white">


                        <strong>

                            Order ID:

                            ${order.orderId || "N/A"}

                        </strong>


                    </div>


                    <!-- BODY -->

                    <div class="card-body">


                        <!-- CUSTOMER -->

                        <div class="row">


                            <div class="col-md-6">


                                <p>

                                    <strong>
                                        Customer:
                                    </strong>

                                    ${order.customerName || "N/A"}

                                </p>


                                <p>

                                    <strong>
                                        Mobile:
                                    </strong>

                                    ${order.mobileNumber || "N/A"}

                                </p>


                            </div>


                            <div class="col-md-6">


                                <p>

                                    <strong>
                                        Table:
                                    </strong>

                                    ${order.tableNumber || "N/A"}

                                </p>


                                <p>

                                    <strong>
                                        Date:
                                    </strong>

                                    ${order.orderDate || "N/A"}

                                </p>


                            </div>


                        </div>


                        <hr>


                        <!-- KITCHEN STATUS -->

                        <div class="mb-3">

                            <strong>
                                Kitchen Status:
                            </strong>

                            ${kitchenBadge}

                        </div>


                        <!-- BILL STATUS -->

                        <div class="mb-3">

                            <strong>
                                Bill Status:
                            </strong>

                            ${billBadge}

                        </div>


                        <!-- PAYMENT -->

                        <div class="mb-3">

                            <strong>
                                Payment:
                            </strong>

                            ${paymentBadge}

                        </div>


                        <h5 class="text-warning">

                            🍔 Ordered Items

                        </h5>


                        <div class="table-responsive">


                            <table
                                class="table table-bordered">


                                <thead
                                    class="table-dark">


                                    <tr>

                                        <th>
                                            Item
                                        </th>

                                        <th>
                                            Qty
                                        </th>

                                        <th>
                                            Price
                                        </th>

                                        <th>
                                            Total
                                        </th>

                                    </tr>


                                </thead>


                                <tbody>

                                    ${itemsHTML}

                                </tbody>


                            </table>


                        </div>


                        <!-- TOTAL -->

                        <div class="text-end">


                            <p>

                                <strong>
                                    Subtotal:
                                </strong>

                                ₹${Number(
                                    order.subtotal || 0
                                ).toFixed(2)}

                            </p>


                            <p>

                                <strong>
                                    GST:
                                </strong>

                                ₹${Number(
                                    order.gst || 0
                                ).toFixed(2)}

                            </p>


                            <h4 class="text-success">

                                Grand Total:

                                ₹${Number(
                                    order.grandTotal || 0
                                ).toFixed(2)}

                            </h4>


                        </div>


                        <hr>


                        <!-- BUTTONS -->

                        <div
                            class="d-flex
                                   flex-wrap
                                   gap-2">


                            ${
                                payment === "Paid"

                                ?

                                `

                                    <!-- PRINT ONLY AFTER PAYMENT -->

                                    <button

                                        class="btn btn-primary"

                                        onclick="
                                            printBill(
                                                ${realIndex}
                                            )
                                        ">

                                        🧾 Print Bill

                                    </button>

                                `

                                :

                                order.billStatus === "Accepted"

                                ?

                                `

                                    <!-- CUSTOMER HAS TO PAY -->

                                    <button

                                        class="btn btn-success"

                                        onclick="
                                            markPaid(
                                                ${realIndex}
                                            )
                                        ">

                                        💰 Mark Paid

                                    </button>

                                `

                                :

                                kitchenStatus === "Completed"

                                ?

                                `

                                    <!-- KITCHEN FINISHED -->

                                    <button

                                        class="btn btn-warning"

                                        onclick="
                                            acceptBill(
                                                ${realIndex}
                                            )
                                        ">

                                        🧾 Accept Bill

                                    </button>

                                `

                                :

                                `

                                    <!-- WAITING FOR KITCHEN -->

                                    <span
                                        class="
                                            badge
                                            bg-secondary
                                            p-2
                                        ">

                                        👨‍🍳 Waiting for Kitchen

                                    </span>

                                `

                            }


                            <!-- COMPLETE ORDER -->

                            ${
                                payment === "Paid"

                                ?

                                `

                                    <button

                                        class="btn btn-success"

                                        onclick="
                                            completeOrder(
                                                ${realIndex}
                                            )
                                        ">

                                        ✅ Complete Order

                                    </button>

                                `

                                :

                                ""

                            }


                            <!-- DELETE -->

                            <button

                                class="btn btn-danger"

                                onclick="
                                    deleteOrder(
                                        ${realIndex}
                                    )
                                ">

                                🗑️ Delete

                            </button>


                        </div>


                    </div>


                </div>

            `;

        });

}



// =============================================
// ACCEPT BILL
// ONLY AFTER KITCHEN COMPLETED
// =============================================

function acceptBill(index) {

    let orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];


    if (!orders[index]) {

        alert(
            "Order not found."
        );

        return;

    }


    const order =
        orders[index];


    // =========================================
    // KITCHEN CHECK
    // =========================================

    if (
        order.kitchenStatus !== "Completed"
    ) {

        alert(

            "⏳ Kitchen has not completed this order yet."

        );

        return;

    }


    // =========================================
    // ALREADY ACCEPTED
    // =========================================

    if (
        order.billStatus === "Accepted"
    ) {

        alert(
            "Bill is already accepted."
        );

        return;

    }


    // =========================================
    // ACCEPT BILL
    // =========================================

    order.billStatus =
        "Accepted";


    order.orderStatus =
        "Bill Accepted";


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    loadOrders();


    alert(

        "✅ Bill accepted.\n\n" +

        "Customer can now pay at the counter."

    );

}



// =============================================
// MARK FOOD ORDER PAID
// =============================================

function markPaid(index) {

    let orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];


    if (!orders[index]) {

        alert(
            "Order not found."
        );

        return;

    }


    const order =
        orders[index];


    // =========================================
    // BILL MUST BE ACCEPTED FIRST
    // =========================================

    if (
        order.billStatus !== "Accepted"
    ) {

        alert(

            "Please accept the bill first."

        );

        return;

    }


    // =========================================
    // PREVENT DOUBLE PAYMENT
    // =========================================

    if (
        order.paymentStatus === "Paid"
    ) {

        alert(

            "This order is already marked as PAID."

        );

        return;

    }


    // =========================================
    // MARK PAID
    // =========================================

    order.paymentStatus =
        "Paid";


    order.orderStatus =
        "Paid";


    // =========================================
    // TODAY'S INCOME
    // =========================================

    let income =
        Number(
            localStorage.getItem(
                "todayIncome"
            )
        ) || 0;


    const billAmount =
        Number(
            order.grandTotal || 0
        );


    income +=
        billAmount;


    localStorage.setItem(
        "todayIncome",
        income
    );


    // =========================================
    // SAVE
    // =========================================

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    // =========================================
    // CUSTOMER PHONE
    // =========================================

    let phone =
        order.mobileNumber ||
        order.mobile ||
        order.phone ||
        "";


    phone =
        String(phone)
        .replace(/\D/g, "");


    if (
        phone.length === 10
    ) {

        phone =
            "91" + phone;

    }


    // =========================================
    // WHATSAPP MESSAGE
    // =========================================

    const customerName =
        order.customerName ||
        "Customer";


    const orderId =
        order.orderId ||
        "N/A";


    const message =

`Hello ${customerName} 👋

✅ PAYMENT RECEIVED

🏨 Hotel Vishal & Krushna

🧾 Order ID: ${orderId}

💰 Bill Amount: ₹${billAmount.toFixed(2)}

✅ Payment Status: PAID

Thank you for visiting Hotel Vishal & Krushna! 🙏

We hope to see you again! 😊`;


    // =========================================
    // REFRESH
    // =========================================

    loadOrders();

    loadTodayIncome();


    // =========================================
    // WHATSAPP
    // =========================================

    if (
        phone.length >= 12
    ) {

        const whatsappURL =
            "https://wa.me/" +
            phone +
            "?text=" +
            encodeURIComponent(
                message
            );


        window.open(
            whatsappURL,
            "_blank"
        );

    }

    else {

        alert(

            "Payment marked as PAID.\n\n" +

            "Customer mobile number is missing or invalid, " +

            "so WhatsApp could not be opened."

        );

    }

}



// =============================================
// COMPLETE FOOD ORDER
// =============================================

function completeOrder(index) {

    let orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];


    if (!orders[index]) {

        return;

    }


    if (
        orders[index].paymentStatus !== "Paid"
    ) {

        alert(
            "Payment must be completed first."
        );

        return;

    }


    orders[index].orderStatus =
        "Completed";


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    loadOrders();

}



// =============================================
// DELETE FOOD ORDER
// =============================================

function deleteOrder(index) {

    if (
        !confirm(
            "Delete this food order?"
        )
    ) {

        return;

    }


    let orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];


    orders.splice(
        index,
        1
    );


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    loadOrders();

}



// =============================================
// CLEAR FOOD ORDERS
// DOES NOT CLEAR TODAY'S INCOME
// =============================================

function clearOrders() {

    if (
        !confirm(
            "Delete all food orders?"
        )
    ) {

        return;

    }


    localStorage.removeItem(
        "orders"
    );


    /*
     * IMPORTANT:
     *
     * todayIncome is NOT deleted.
     */


    loadOrders();

}



// =============================================
// TABLE BOOKINGS
// =============================================

function loadTableBookings() {

    const container =
        document.getElementById(
            "tableBookingsContainer"
        );


    const bookings =
        JSON.parse(
            localStorage.getItem(
                "tableBookings"
            )
        ) || [];


    const total =
        document.getElementById(
            "totalTableBookings"
        );


    if (total) {

        total.innerText =
            bookings.length;

    }


    if (!container) {

        return;

    }


    if (bookings.length === 0) {

        container.innerHTML = `

            <div class="alert alert-info text-center">

                No table bookings yet.

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    bookings
        .slice()
        .reverse()
        .forEach((booking, reverseIndex) => {


            const realIndex =
                bookings.length -
                1 -
                reverseIndex;


            const status =
                booking.status ||
                "Pending";


            container.innerHTML += `

                <div
                    class="
                        card
                        mb-3
                        border-primary
                        shadow-sm
                    ">


                    <div
                        class="
                            card-header
                            bg-primary
                            text-white
                        ">


                        <strong>

                            Booking ID:

                            ${booking.bookingId || "N/A"}

                        </strong>


                    </div>


                    <div class="card-body">


                        <div class="row">


                            <div class="col-md-6">


                                <p>

                                    <strong>
                                        Customer:
                                    </strong>

                                    ${booking.name || "N/A"}

                                </p>


                                <p>

                                    <strong>
                                        Mobile:
                                    </strong>

                                    ${booking.mobile || "N/A"}

                                </p>


                            </div>


                            <div class="col-md-6">


                                <p>

                                    <strong>
                                        Date:
                                    </strong>

                                    ${booking.date || "N/A"}

                                </p>


                                <p>

                                    <strong>
                                        Time:
                                    </strong>

                                    ${booking.time || "N/A"}

                                </p>


                                <p>

                                    <strong>
                                        Guests:
                                    </strong>

                                    ${booking.guests || "N/A"}

                                </p>


                            </div>


                        </div>


                        <hr>


                        <p>

                            <strong>
                                Status:
                            </strong>

                            <span
                                class="
                                    badge
                                    ${
                                        status === "Confirmed"
                                        ? "bg-success"
                                        : "bg-warning text-dark"
                                    }
                                ">

                                ${status}

                            </span>

                        </p>


                        <div
                            class="
                                d-flex
                                flex-wrap
                                gap-2
                            ">


                            ${
                                status !== "Confirmed"

                                ?

                                `

                                    <button

                                        class="btn btn-success"

                                        onclick="
                                            confirmTableBooking(
                                                ${realIndex}
                                            )
                                        ">

                                        ✅ Confirm Booking

                                    </button>

                                `

                                :

                                `

                                    <span
                                        class="
                                            badge
                                            bg-success
                                            p-2
                                        ">

                                        ✓ Booking Confirmed

                                    </span>

                                `
                            }


                            <button

                                class="btn btn-danger"

                                onclick="
                                    deleteTableBooking(
                                        ${realIndex}
                                    )
                                ">

                                🗑️ Delete

                            </button>


                        </div>


                    </div>


                </div>

            `;

        });

}



// =============================================
// CONFIRM TABLE BOOKING
// + WHATSAPP
// =============================================

function confirmTableBooking(index) {

    let bookings =
        JSON.parse(
            localStorage.getItem(
                "tableBookings"
            )
        ) || [];


    if (!bookings[index]) {

        alert(
            "Table booking not found."
        );

        return;

    }


    const booking =
        bookings[index];


    if (
        booking.status === "Confirmed"
    ) {

        alert(
            "This booking is already confirmed."
        );

        return;

    }


    booking.status =
        "Confirmed";


    localStorage.setItem(
        "tableBookings",
        JSON.stringify(bookings)
    );


    loadTableBookings();


    // =========================================
    // PHONE
    // =========================================

    let phone =
        booking.mobile ||
        booking.mobileNumber ||
        booking.phone ||
        "";


    phone =
        String(phone)
        .replace(/\D/g, "");


    if (
        phone.length === 10
    ) {

        phone =
            "91" + phone;

    }


    // =========================================
    // MESSAGE
    // =========================================

    const message =

`Hello ${booking.name || "Customer"} 👋

✅ TABLE BOOKING CONFIRMED

🏨 Hotel Vishal & Krushna

🧾 Booking ID: ${booking.bookingId || "N/A"}

📅 Date: ${booking.date || "N/A"}
⏰ Time: ${booking.time || "N/A"}
👥 Guests: ${booking.guests || "N/A"}

Your table booking has been confirmed successfully.

Thank you for choosing Hotel Vishal & Krushna! 🙏`;


    if (
        phone.length >= 12
    ) {

        const whatsappURL =
            "https://wa.me/" +
            phone +
            "?text=" +
            encodeURIComponent(
                message
            );


        window.open(
            whatsappURL,
            "_blank"
        );

    }

    else {

        alert(
            "Booking confirmed, but mobile number is missing or invalid."
        );

    }

}



// =============================================
// DELETE TABLE BOOKING
// =============================================

function deleteTableBooking(index) {

    if (
        !confirm(
            "Delete this table booking?"
        )
    ) {

        return;

    }


    let bookings =
        JSON.parse(
            localStorage.getItem(
                "tableBookings"
            )
        ) || [];


    bookings.splice(
        index,
        1
    );


    localStorage.setItem(
        "tableBookings",
        JSON.stringify(bookings)
    );


    loadTableBookings();

}



// =============================================
// HALL BOOKINGS
// =============================================

function loadHallBookings() {

    const container =
        document.getElementById(
            "hallBookingsContainer"
        );


    const bookings =
        JSON.parse(
            localStorage.getItem(
                "hallBookings"
            )
        ) || [];


    const total =
        document.getElementById(
            "totalHallBookings"
        );


    if (total) {

        total.innerText =
            bookings.length;

    }


    if (!container) {

        return;

    }


    if (bookings.length === 0) {

        container.innerHTML = `

            <div class="alert alert-info text-center">

                No hall bookings yet.

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    bookings
        .slice()
        .reverse()
        .forEach((booking, reverseIndex) => {


            const realIndex =
                bookings.length -
                1 -
                reverseIndex;


            const status =
                booking.status ||
                "Pending";


            const price =
                Number(
                    booking.price || 0
                ).toLocaleString(
                    "en-IN"
                );


            container.innerHTML += `

                <div
                    class="
                        card
                        mb-3
                        border-success
                        shadow-sm
                    ">


                    <div
                        class="
                            card-header
                            bg-success
                            text-white
                        ">


                        <strong>

                            Booking ID:

                            ${booking.bookingId || "N/A"}

                        </strong>


                    </div>


                    <div class="card-body">


                        <div class="row">


                            <div class="col-md-6">


                                <p>

                                    <strong>
                                        Customer:
                                    </strong>

                                    ${booking.name || "N/A"}

                                </p>


                                <p>

                                    <strong>
                                        Mobile:
                                    </strong>

                                    ${booking.mobile || "N/A"}

                                </p>


                                <p>

                                    <strong>
                                        Event:
                                    </strong>

                                    ${booking.eventType || "N/A"}

                                </p>


                            </div>


                            <div class="col-md-6">


                                <p>

                                    <strong>
                                        Date:
                                    </strong>

                                    ${booking.date || "N/A"}

                                </p>


                                <p>

                                    <strong>
                                        Guests:
                                    </strong>

                                    ${booking.guests || "N/A"}

                                </p>


                                <p>

                                    <strong>
                                        Hall Price:
                                    </strong>

                                    ₹${price}

                                </p>


                            </div>


                        </div>


                        <p>

                            <strong>
                                Message:
                            </strong>

                            ${booking.message || "None"}

                        </p>


                        <hr>


                        <p>

                            <strong>
                                Status:
                            </strong>


                            <span
                                class="
                                    badge
                                    ${
                                        status === "Confirmed"
                                        ? "bg-success"
                                        : "bg-warning text-dark"
                                    }
                                ">

                                ${status}

                            </span>


                        </p>


                        <div
                            class="
                                d-flex
                                flex-wrap
                                gap-2
                            ">


                            ${
                                status !== "Confirmed"

                                ?

                                `

                                    <button

                                        class="btn btn-success"

                                        onclick="
                                            confirmHallBooking(
                                                ${realIndex}
                                            )
                                        ">

                                        ✅ Confirm Booking

                                    </button>

                                `

                                :

                                `

                                    <span
                                        class="
                                            badge
                                            bg-success
                                            p-2
                                        ">

                                        ✓ Booking Confirmed

                                    </span>

                                `
                            }


                            <button

                                class="btn btn-danger"

                                onclick="
                                    deleteHallBooking(
                                        ${realIndex}
                                    )
                                ">

                                🗑️ Delete

                            </button>


                        </div>


                    </div>


                </div>

            `;

        });

}



// =============================================
// CONFIRM HALL BOOKING
// + WHATSAPP
// =============================================

function confirmHallBooking(index) {

    let bookings =
        JSON.parse(
            localStorage.getItem(
                "hallBookings"
            )
        ) || [];


    if (!bookings[index]) {

        alert(
            "Hall booking not found."
        );

        return;

    }


    const booking =
        bookings[index];


    if (
        booking.status === "Confirmed"
    ) {

        alert(
            "This hall booking is already confirmed."
        );

        return;

    }


    booking.status =
        "Confirmed";


    localStorage.setItem(
        "hallBookings",
        JSON.stringify(bookings)
    );


    loadHallBookings();


    // =========================================
    // PHONE
    // =========================================

    let phone =
        booking.mobile ||
        booking.mobileNumber ||
        booking.phone ||
        "";


    phone =
        String(phone)
        .replace(/\D/g, "");


    if (
        phone.length === 10
    ) {

        phone =
            "91" + phone;

    }


    const price =
        Number(
            booking.price || 0
        ).toLocaleString(
            "en-IN"
        );


    // =========================================
    // MESSAGE
    // =========================================

    const message =

`Hello ${booking.name || "Customer"} 👋

🎉 HALL BOOKING CONFIRMED

🏨 Hotel Vishal & Krushna

🧾 Booking ID: ${booking.bookingId || "N/A"}

🎊 Event: ${booking.eventType || "N/A"}
📅 Date: ${booking.date || "N/A"}
👥 Guests: ${booking.guests || "N/A"}
💰 Hall Price: ₹${price}

Your hall booking has been confirmed successfully.

Thank you for choosing Hotel Vishal & Krushna! 🙏`;


    if (
        phone.length >= 12
    ) {

        const whatsappURL =
            "https://wa.me/" +
            phone +
            "?text=" +
            encodeURIComponent(
                message
            );


        window.open(
            whatsappURL,
            "_blank"
        );

    }

    else {

        alert(
            "Hall booking confirmed, but mobile number is missing or invalid."
        );

    }

}



// =============================================
// DELETE HALL BOOKING
// =============================================

function deleteHallBooking(index) {

    if (
        !confirm(
            "Delete this hall booking?"
        )
    ) {

        return;

    }


    let bookings =
        JSON.parse(
            localStorage.getItem(
                "hallBookings"
            )
        ) || [];


    bookings.splice(
        index,
        1
    );


    localStorage.setItem(
        "hallBookings",
        JSON.stringify(bookings)
    );


    loadHallBookings();

}



// =============================================
// CLEAR TABLE BOOKINGS
// =============================================

function clearTableBookings() {

    if (
        !confirm(
            "Delete all table bookings?"
        )
    ) {

        return;

    }


    localStorage.removeItem(
        "tableBookings"
    );


    loadTableBookings();

}



// =============================================
// CLEAR HALL BOOKINGS
// =============================================

function clearHallBookings() {

    if (
        !confirm(
            "Delete all hall bookings?"
        )
    ) {

        return;

    }


    localStorage.removeItem(
        "hallBookings"
    );


    loadHallBookings();

}



// =============================================
// PRINT FOOD BILL
// ONLY AFTER PAYMENT
// =============================================

function printBill(index) {

    let orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];


    const order =
        orders[index];


    if (!order) {

        alert(
            "Order not found."
        );

        return;

    }


    // =========================================
    // PAYMENT CHECK
    // =========================================

    if (
        order.paymentStatus !== "Paid"
    ) {

        alert(
            "Please mark payment as PAID first."
        );

        return;

    }


    // =========================================
    // OPEN PRINT WINDOW
    // =========================================

    const printWindow =
        window.open(
            "",
            "_blank",
            "width=800,height=800"
        );


    if (!printWindow) {

        alert(
            "Please allow pop-ups to print the bill."
        );

        return;

    }


    let itemsHTML = "";


    if (
        order.items &&
        Array.isArray(order.items)
    ) {

        order.items.forEach(item => {

            itemsHTML += `

                <tr>

                    <td>
                        ${item.name || "Item"}
                    </td>

                    <td>
                        ${item.quantity || 0}
                    </td>

                    <td>
                        ₹${Number(
                            item.price || 0
                        ).toFixed(2)}
                    </td>

                    <td>
                        ₹${(
                            Number(item.price || 0) *
                            Number(item.quantity || 0)
                        ).toFixed(2)}
                    </td>

                </tr>

            `;

        });

    }


    printWindow.document.write(`

        <!DOCTYPE html>

        <html>


        <head>

            <title>

                Bill -
                ${order.orderId || "Order"}

            </title>


            <style>

                body {

                    font-family:
                        Arial,
                        sans-serif;

                    padding: 30px;

                    max-width: 700px;

                    margin: auto;

                }


                h1,
                h2 {

                    text-align: center;

                }


                table {

                    width: 100%;

                    border-collapse:
                        collapse;

                    margin-top: 20px;

                }


                th,
                td {

                    border:
                        1px solid #333;

                    padding: 8px;

                }


                th {

                    background:
                        #222;

                    color:
                        white;

                }


                .right {

                    text-align:
                        right;

                }


                .paid {

                    text-align:
                        center;

                    font-size:
                        20px;

                    font-weight:
                        bold;

                    margin-top:
                        20px;

                }

            </style>


        </head>


        <body>


            <h1>

                Hotel Vishal & Krushna

            </h1>


            <h2>

                Restaurant Bill

            </h2>


            <hr>


            <p>

                <strong>
                    Order ID:
                </strong>

                ${order.orderId || "N/A"}

            </p>


            <p>

                <strong>
                    Customer:
                </strong>

                ${order.customerName || "N/A"}

            </p>


            <p>

                <strong>
                    Mobile:
                </strong>

                ${order.mobileNumber || "N/A"}

            </p>


            <p>

                <strong>
                    Table:
                </strong>

                ${order.tableNumber || "N/A"}

            </p>


            <table>


                <thead>

                    <tr>

                        <th>
                            Item
                        </th>

                        <th>
                            Qty
                        </th>

                        <th>
                            Price
                        </th>

                        <th>
                            Total
                        </th>

                    </tr>

                </thead>


                <tbody>

                    ${itemsHTML}

                </tbody>


            </table>


            <div class="right">


                <p>

                    Subtotal:

                    ₹${Number(
                        order.subtotal || 0
                    ).toFixed(2)}

                </p>


                <p>

                    GST:

                    ₹${Number(
                        order.gst || 0
                    ).toFixed(2)}

                </p>


                <h2>

                    Total:

                    ₹${Number(
                        order.grandTotal || 0
                    ).toFixed(2)}

                </h2>


            </div>


            <div class="paid">

                PAYMENT: PAID ✓

            </div>


            <hr>


            <p style="text-align:center">

                Thank you for visiting
                Hotel Vishal & Krushna! 🙏

            </p>


            <script>

                window.onload =
                    function() {

                        window.print();

                    };

            <\/script>


        </body>


        </html>

    `);


    printWindow.document.close();

}



// =============================================
// TODAY'S INCOME
// =============================================

function loadTodayIncome() {

    const incomeElement =
        document.getElementById(
            "todayIncome"
        );


    if (!incomeElement) {

        return;

    }


    const income =
        Number(
            localStorage.getItem(
                "todayIncome"
            )
        ) || 0;


    incomeElement.innerText =
        "₹" +
        income.toLocaleString(
            "en-IN"
        );

}



// =============================================
// ADD TO TODAY'S INCOME
// =============================================

function addToTodayIncome(amount) {

    let income =
        Number(
            localStorage.getItem(
                "todayIncome"
            )
        ) || 0;


    income +=
        Number(amount) || 0;


    localStorage.setItem(
        "todayIncome",
        income
    );


    loadTodayIncome();

}



// =============================================
// AUTO REFRESH
// =============================================

setInterval(
    function() {

        loadOrders();

        loadTableBookings();

        loadHallBookings();

        loadTodayIncome();

    },
    5000
);



// =============================================
// START DASHBOARD
// =============================================

loadDashboard();

loadTodayIncome();