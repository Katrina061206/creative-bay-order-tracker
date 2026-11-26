
/* =========================================================
   CREATIVE BAY ORDER TRACKER
   Main JavaScript
   FR-01: Customer Order Management
   FR-02: Business Dashboard and Sales Analytics
========================================================= */

const STORAGE_KEY = "creativeBayOrders";

const VALID_STATUSES = [
    "Pending",
    "Processing",
    "Completed"
];

const VALID_CATEGORIES = [
    "ID Picture and Photography",
    "Printing Services",
    "Customized Designs and Layouts",
    "Tarpaulin and Banner Printing",
    "School and Office Documents"
];

/* =========================================================
   DOM ELEMENTS
========================================================= */

const form = document.getElementById("orderForm");

const customer = document.getElementById("customer");
const serviceCategory = document.getElementById("serviceCategory");
const description = document.getElementById("description");
const quantity = document.getElementById("quantity");
const unitPrice = document.getElementById("unitPrice");
const orderTotal = document.getElementById("orderTotal");
const orderDate = document.getElementById("orderDate");
const status = document.getElementById("status");

const editOrderModal = document.getElementById("editOrderModal");
const editOrderForm = document.getElementById("editOrderForm");
const editFields = {
    customer: document.getElementById("editCustomer"),
    category: document.getElementById("editServiceCategory"),
    description: document.getElementById("editDescription"),
    quantity: document.getElementById("editQuantity"),
    unitPrice: document.getElementById("editUnitPrice"),
    total: document.getElementById("editOrderTotal"),
    date: document.getElementById("editOrderDate"),
    status: document.getElementById("editStatus")
};

const orderList = document.getElementById("orderList");
const emptyState = document.getElementById("emptyState");

const search = document.getElementById("search");
const filter = document.getElementById("filter");

const cancelEdit = document.getElementById("cancelEdit");

const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const sidebarClose = document.getElementById("sidebarClose");
const sidebarOverlay = document.getElementById("sidebarOverlay");

const revenuePeriod = document.getElementById("revenuePeriod");


/* =========================================================
   APPLICATION STATE
========================================================= */

let toastTimer;
let editingId = null;

let orders = loadOrders();


/* =========================================================
   STORAGE
========================================================= */

/*
   Existing orders are retained even if they were created
   before the Unit Price feature was added.

   Older orders without unitPrice receive null.
   Their revenue will not be included until a price is entered.
*/

function loadOrders() {

    try {

        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved === null) {
            return [];
        }

        const parsed = JSON.parse(saved);

        if (!Array.isArray(parsed)) {
            showToast("Saved orders could not be read because the stored data is invalid.");
            return [];
        }

        const validOrders = parsed
            .filter(order =>
                order &&
                typeof order.id === "string" &&
                order.id.length > 0 &&
                typeof order.customer === "string" &&
                order.customer.trim().length > 0 &&
                typeof order.description === "string" &&
                order.description.trim().length > 0 &&
                Number.isSafeInteger(order.quantity) &&
                order.quantity >= 1 &&
                isValidOrderDate(order.date) &&
                VALID_STATUSES.includes(order.status)
            )
            .map(order => {

                const savedPrice = Number(order.unitPrice);

                const hasValidPrice =
                    order.unitPrice !== null &&
                    order.unitPrice !== undefined &&
                    Number.isFinite(savedPrice) &&
                    savedPrice > 0;

                return {
    ...order,
    category: VALID_CATEGORIES.includes(order.category)
        ? order.category
        : "",
    unitPrice: hasValidPrice ? savedPrice : null
};

            });

        if (validOrders.length !== parsed.length) {
            showToast("Some invalid saved orders were skipped.");
        }

        return validOrders;

    } catch {

        showToast("Unable to load saved orders from this browser.");
        return [];

    }

}


function saveOrders() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(orders)
        );

        return true;

    } catch {

        showToast("Unable to save. Browser storage may be full.");
        return false;

    }

}


/* =========================================================
   NOTIFICATIONS
========================================================= */

function showToast(message) {

    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2800);

}


/* =========================================================
   SECURITY
========================================================= */

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, char => ({

        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"

    })[char]);

}


/* =========================================================
   DATE FUNCTIONS
========================================================= */

function todayString() {

    const now = new Date();

    const local = new Date(
        now.getTime() - now.getTimezoneOffset() * 60000
    );

    return local.toISOString().slice(0, 10);

}


function isCalendarDate(date) {

    if (
        typeof date !== "string" ||
        !/^\d{4}-\d{2}-\d{2}$/.test(date)
    ) {
        return false;
    }

    const parsed = new Date(`${date}T00:00:00.000Z`);

    return (
        !Number.isNaN(parsed.getTime()) &&
        parsed.toISOString().slice(0, 10) === date
    );

}


function isValidOrderDate(date) {

    return (
        isCalendarDate(date) &&
        date <= todayString()
    );

}


function formatDate(date) {

    return new Date(date + "T00:00:00").toLocaleDateString(
        "en-PH",
        {
            month: "short",
            day: "numeric",
            year: "numeric"
        }
    );

}


function localDateKey(date) {

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}


/* =========================================================
   CURRENCY AND PRICE FUNCTIONS
========================================================= */

function formatCurrency(value) {

    const amount = Number(value) || 0;

    return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);

}


function getOrderTotal(order) {

    if (
        order.unitPrice === null ||
        !Number.isFinite(Number(order.unitPrice))
    ) {
        return null;
    }

    return order.quantity * Number(order.unitPrice);

}


function getCompletedOrders() {

    return orders.filter(order =>
        order.status === "Completed" &&
        order.unitPrice !== null &&
        Number.isFinite(getOrderTotal(order))
    );

}


function getTotalRevenue() {

    return getCompletedOrders().reduce(
        (total, order) => total + getOrderTotal(order),
        0
    );

}


function updateOrderTotal() {

    updateTotal(quantity, unitPrice, orderTotal);

}


function updateTotal(quantityInput, priceInput, totalInput) {

    const qty = Number(quantityInput.value);
    const price = Number(priceInput.value);

    if (
        Number.isSafeInteger(qty) &&
        qty > 0 &&
        Number.isFinite(price) &&
        price > 0
    ) {

        totalInput.value = formatCurrency(qty * price);

    } else {

        totalInput.value = "₱0.00";

    }

}


/* =========================================================
   FORM DATE INITIALIZATION
========================================================= */

orderDate.max = todayString();
orderDate.value = todayString();
editFields.date.max = todayString();


/* =========================================================
   DASHBOARD STATISTICS
========================================================= */

function renderStatistics() {

    const total = orders.length;

    const pending = orders.filter(
        order => order.status === "Pending"
    ).length;

    const processing = orders.filter(
        order => order.status === "Processing"
    ).length;

    const completed = orders.filter(
        order => order.status === "Completed"
    ).length;

    document.getElementById("totalCount").textContent = total;
    document.getElementById("pendingCount").textContent = pending;
    document.getElementById("processingCount").textContent = processing;
    document.getElementById("completedCount").textContent = completed;

    document.getElementById("dashboardPending").textContent = pending;
    document.getElementById("dashboardProcessing").textContent = processing;
    document.getElementById("dashboardCompleted").textContent = completed;

    const today = todayString();

    const todayRevenue = getCompletedOrders()
        .filter(order => order.date === today)
        .reduce(
            (sum, order) => sum + getOrderTotal(order),
            0
        );

    document.getElementById("totalRevenue").textContent =
        formatCurrency(getTotalRevenue());

    document.getElementById("todayRevenue").textContent =
        formatCurrency(todayRevenue);

    const safeTotal = total || 1;

    document.getElementById("pendingProgress").style.width =
        `${(pending / safeTotal) * 100}%`;

    document.getElementById("processingProgress").style.width =
        `${(processing / safeTotal) * 100}%`;

    document.getElementById("completedProgress").style.width =
        `${(completed / safeTotal) * 100}%`;

}


/* =========================================================
   ORDER TABLE
========================================================= */

function renderOrderTable() {

    const query = search.value.trim().toLowerCase();
    const selected = filter.value;

    const visible = orders.filter(order => {

        const matchesSearch =
    order.customer.toLowerCase().includes(query) ||
    (order.category || "").toLowerCase().includes(query) ||
    order.description.toLowerCase().includes(query);

        const matchesStatus =
            selected === "All" ||
            order.status === selected;

        return matchesSearch && matchesStatus;

    });


    orderList.innerHTML = visible.map(order => {

        const total = getOrderTotal(order);

        return `
            <tr>

                <td class="customer">
    ${escapeHTML(order.customer)}
</td>

<td>${escapeHTML(order.category || "Uncategorized")}</td>

<td class="order-desc"
                    title="${escapeHTML(order.description)}">
                    ${escapeHTML(order.description)}
                </td>

                <td>${order.quantity}</td>

                <td>
                    ${
                        order.unitPrice === null
                            ? "—"
                            : formatCurrency(order.unitPrice)
                    }
                </td>

                <td>
                    ${
                        total === null
                            ? "—"
                            : formatCurrency(total)
                    }
                </td>

                <td>${formatDate(order.date)}</td>

                <td>
                    <select
                        class="filter-select status ${order.status}"
                        aria-label="Change status for ${escapeHTML(order.customer)}"
                        data-order-id="${escapeHTML(order.id)}">

                        <option value="Pending"
                            ${order.status === "Pending" ? "selected" : ""}>
                            Pending
                        </option>

                        <option value="Processing"
                            ${order.status === "Processing" ? "selected" : ""}>
                            Processing
                        </option>

                        <option value="Completed"
                            ${order.status === "Completed" ? "selected" : ""}>
                            Completed
                        </option>

                    </select>
                </td>

                <td>
                    <div class="actions">

                        <button
                            class="action-btn"
                            type="button"
                            data-action="edit"
                            data-order-id="${escapeHTML(order.id)}">
                            Edit
                        </button>

                        <button
                            class="action-btn delete-btn"
                            type="button"
                            data-action="delete"
                            data-order-id="${escapeHTML(order.id)}">
                            Delete
                        </button>

                    </div>
                </td>

            </tr>
        `;

    }).join("");


    emptyState.style.display = visible.length ? "none" : "block";

    orderList.closest(".table-wrap")
        .querySelector("table")
        .style.display = visible.length ? "table" : "none";


    if (!visible.length && orders.length) {

        emptyState.querySelector("h4").textContent =
            "No matching orders";

        emptyState.querySelector("p").textContent =
            "Try another search term or status filter.";

    } else if (!orders.length) {

        emptyState.querySelector("h4").textContent =
            "No orders yet";

        emptyState.querySelector("p").textContent =
            "Your customer orders will appear here.";

    }

}


/* =========================================================
   RECENT ORDERS
========================================================= */

function renderRecentOrders() {

    const container = document.getElementById("recentOrders");

    const recent = [...orders]
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 5);

    if (!recent.length) {

        container.innerHTML = `
            <div class="empty-dashboard">
                <span>▤</span>
                <p>No recent orders yet.</p>
            </div>
        `;

        return;

    }

    container.innerHTML = recent.map(order => {

        const total = getOrderTotal(order);

        return `
            <div class="recent-order-item">

                <div class="recent-order-info">

                    <strong>
                        ${escapeHTML(order.customer)}
                    </strong>

                    <span>
                        ${escapeHTML(order.description)}
                        · ${formatDate(order.date)}
                    </span>

                    <span class="status ${order.status}">
                        ${order.status}
                    </span>

                </div>

                <div class="recent-order-meta">

                    <strong>
                        ${total === null ? "Price not set" : formatCurrency(total)}
                    </strong>

                </div>

            </div>
        `;

    }).join("");

}


/* =========================================================
   SALES ANALYTICS SUMMARY
========================================================= */

function renderAnalyticsSummary() {

    const completedOrders = getCompletedOrders();

    const revenue = getTotalRevenue();

    const units = completedOrders.reduce(
        (sum, order) => sum + order.quantity,
        0
    );

    const averageOrderValue = completedOrders.length
        ? revenue / completedOrders.length
        : 0;

    document.getElementById("analyticsRevenue").textContent =
        formatCurrency(revenue);

    document.getElementById("analyticsCompleted").textContent =
        completedOrders.length;

    document.getElementById("analyticsUnits").textContent =
        units;

    document.getElementById("averageOrderValue").textContent =
        formatCurrency(averageOrderValue);

}


/* =========================================================
   REVENUE CHART DATA
========================================================= */

function getMonday(date) {

    const result = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );

    const day = result.getDay();

    const difference = day === 0 ? -6 : 1 - day;

    result.setDate(result.getDate() + difference);

    return result;

}


function getRevenueChartData(period) {

    const completed = getCompletedOrders();

    const now = new Date();

    const groups = [];


    if (period === "daily") {

        for (let i = 6; i >= 0; i--) {

            const date = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate() - i
            );

            groups.push({
                key: localDateKey(date),
                label: date.toLocaleDateString("en-PH", {
                    weekday: "short"
                }),
                total: 0
            });

        }

        const lookup = new Map(
            groups.map(group => [group.key, group])
        );

        completed.forEach(order => {

            const group = lookup.get(order.date);

            if (group) {
                group.total += getOrderTotal(order);
            }

        });

    }


    else if (period === "weekly") {

        const currentMonday = getMonday(now);

        for (let i = 7; i >= 0; i--) {

            const date = new Date(currentMonday);

            date.setDate(date.getDate() - i * 7);

            groups.push({
                key: localDateKey(date),
                label: date.toLocaleDateString("en-PH", {
                    month: "short",
                    day: "numeric"
                }),
                total: 0
            });

        }

        const lookup = new Map(
            groups.map(group => [group.key, group])
        );

        completed.forEach(order => {

            const orderDate = new Date(order.date + "T00:00:00");
            const monday = getMonday(orderDate);
            const group = lookup.get(localDateKey(monday));

            if (group) {
                group.total += getOrderTotal(order);
            }

        });

    }


    else if (period === "monthly") {

        for (let i = 5; i >= 0; i--) {

            const date = new Date(
                now.getFullYear(),
                now.getMonth() - i,
                1
            );

            const key =
                `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

            groups.push({
                key,
                label: date.toLocaleDateString("en-PH", {
                    month: "short"
                }),
                total: 0
            });

        }

        const lookup = new Map(
            groups.map(group => [group.key, group])
        );

        completed.forEach(order => {

            const group = lookup.get(order.date.slice(0, 7));

            if (group) {
                group.total += getOrderTotal(order);
            }

        });

    }

    return groups;

}


/* =========================================================
   RENDER REVENUE CHART
========================================================= */

function renderRevenueChart() {

    const container = document.getElementById("revenueChart");

    const period = revenuePeriod.value;

    const data = getRevenueChartData(period);

    const maximum = Math.max(
        ...data.map(item => item.total),
        0
    );

    if (!getCompletedOrders().length) {

        container.innerHTML = `
            <div class="chart-empty">
                <span>▥</span>
                <p>Complete an order to start tracking sales revenue.</p>
            </div>
        `;

        return;

    }

    container.innerHTML = `
        <div class="chart-bars">

            ${data.map(item => {

                const height = maximum > 0
                    ? Math.max((item.total / maximum) * 145, item.total > 0 ? 5 : 0)
                    : 0;

                return `
                    <div class="chart-bar-group">

                        <span class="chart-bar-value">
                            ${item.total > 0 ? formatCurrency(item.total) : "₱0"}
                        </span>

                        <div
                            class="chart-bar"
                            style="height: ${height}px"
                            title="${escapeHTML(item.label)}: ${formatCurrency(item.total)}">
                        </div>

                        <span class="chart-bar-label">
                            ${escapeHTML(item.label)}
                        </span>

                    </div>
                `;

            }).join("")}

        </div>
    `;

}


/* =========================================================
   BEST-SELLING PRODUCTS
========================================================= */

function renderBestSellingProducts() {

    const container = document.getElementById("bestSellingProducts");

    const completed = getCompletedOrders();

    const productMap = new Map();


    completed.forEach(order => {

        const key = order.description.trim().toLowerCase();

        if (!productMap.has(key)) {

            productMap.set(key, {
                name: order.description.trim(),
                quantity: 0
            });

        }

        productMap.get(key).quantity += order.quantity;

    });


    const products = [...productMap.values()]
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5);


    if (!products.length) {

        container.innerHTML = `
            <div class="chart-empty">
                <span>✦</span>
                <p>Complete orders to see your best-selling products.</p>
            </div>
        `;

        return;

    }


    const maximum = Math.max(
        ...products.map(product => product.quantity)
    );


    container.innerHTML = products.map(product => {

        const percentage =
            (product.quantity / maximum) * 100;

        return `
            <div class="best-selling-item">

                <div class="best-selling-heading">

                    <strong title="${escapeHTML(product.name)}">
                        ${escapeHTML(product.name)}
                    </strong>

                    <span>
                        ${product.quantity} sold
                    </span>

                </div>

                <div class="best-selling-track">

                    <div
                        class="best-selling-fill"
                        style="width: ${percentage}%">
                    </div>

                </div>

            </div>
        `;

    }).join("");

}


/* =========================================================
   COMPLETE DASHBOARD RENDER
========================================================= */

function render() {

    renderStatistics();

    renderOrderTable();

    renderRecentOrders();

    renderAnalyticsSummary();

    renderRevenueChart();

    renderBestSellingProducts();

}


/* =========================================================
   FORM VALIDATION AND ORDER SUBMISSION
========================================================= */

function getValidatedOrder(fields) {

    const name = fields.customer.value.trim();
    const category = fields.category.value;
    const details = fields.description.value.trim();
    const quantityValue = fields.quantity.value;
    const qty = Number(quantityValue);
    const priceValue = fields.unitPrice.value.trim();
    const price = Number(priceValue);
    const date = fields.date.value;
    const selectedStatus = fields.status.value;

    if (!name || !category || !details || !date || !priceValue) {
        showToast("Please complete all required fields.");
        return null;
    }

    if (!VALID_CATEGORIES.includes(category)) {
        showToast("Please select a valid service category.");
        fields.category.focus();
        return null;
    }

    if (
        !/^[0-9]+$/.test(quantityValue) ||
        !Number.isSafeInteger(qty) ||
        qty < 1
    ) {
        showToast("Quantity must be a positive whole number.");
        fields.quantity.focus();
        return null;
    }

    if (
        !/^\d+(?:\.\d{1,2})?$/.test(priceValue) ||
        !Number.isFinite(price) ||
        price <= 0
    ) {
        showToast("Enter a valid price greater than zero, with up to two decimal places.");
        fields.unitPrice.focus();
        return null;
    }

    if (!Number.isFinite(qty * price)) {
        showToast("The calculated order total is too large.");
        fields.unitPrice.focus();
        return null;
    }

    if (!isCalendarDate(date)) {
        showToast("Enter a valid order date.");
        fields.date.focus();
        return null;
    }

    if (date > todayString()) {
        showToast("Order date cannot be in the future.");
        fields.date.focus();
        return null;
    }

    if (!VALID_STATUSES.includes(selectedStatus)) {
        showToast("Choose a valid order status.");
        fields.status.focus();
        return null;
    }

    return {
        customer: name,
        category,
        description: details,
        quantity: qty,
        unitPrice: price,
        date,
        status: selectedStatus
    };

}


function getAddOrderFields() {
    return {
        customer,
        category: serviceCategory,
        description,
        quantity,
        unitPrice,
        date: orderDate,
        status
    };
}


function getEditOrderFields() {
    return editFields;
}


form.addEventListener("submit", event => {

    event.preventDefault();

    const orderData = getValidatedOrder(getAddOrderFields());

    if (!orderData) return;

    const previousOrders = [...orders];
    orders.unshift({
        id: createOrderId(),
        ...orderData
    });

    if (!saveOrders()) {
        orders = previousOrders;
        return;
    }

    resetAddOrderForm();
    render();
    showToast("New order added successfully!");

});


editOrderForm.addEventListener("submit", event => {

    event.preventDefault();

    if (editingId === null || !orders.some(order => order.id === editingId)) {
        closeEditModal();
        return;
    }

    const orderData = getValidatedOrder(getEditOrderFields());

    if (!orderData) return;

    const previousOrders = [...orders];
    orders = orders.map(order =>
        order.id === editingId
            ? {...order, ...orderData}
            : order
    );

    if (!saveOrders()) {
        orders = previousOrders;
        return;
    }

    closeEditModal();
    render();
    showToast("Order updated successfully!");

});


/* =========================================================
   EDIT ORDER
========================================================= */

let lastEditTrigger = null;


function editOrder(id, trigger) {

    const order = orders.find(item => item.id === id);

    if (!order) return;

    editingId = id;
    lastEditTrigger = trigger;

    editFields.customer.value = order.customer;
    editFields.category.value = VALID_CATEGORIES.includes(order.category)
        ? order.category
        : "";
    editFields.description.value = order.description;
    editFields.quantity.value = order.quantity;
    editFields.unitPrice.value = order.unitPrice === null
        ? ""
        : order.unitPrice;
    editFields.date.value = order.date;
    editFields.status.value = order.status;
    editFields.date.max = todayString();
    updateTotal(editFields.quantity, editFields.unitPrice, editFields.total);

    editOrderModal.hidden = false;
    document.body.classList.add("modal-open");
    editFields.customer.focus();

}


function closeEditModal() {

    if (editOrderModal.hidden) return;

    editOrderModal.hidden = true;
    document.body.classList.remove("modal-open");
    editOrderForm.reset();
    editFields.total.value = "₱0.00";
    editingId = null;

    if (lastEditTrigger && lastEditTrigger.isConnected) {
        lastEditTrigger.focus();
    }

    lastEditTrigger = null;

}


/* =========================================================
   DELETE ORDER
========================================================= */

function deleteOrder(id) {

    if (!confirm("Are you sure you want to delete this order?")) {
        return;
    }

    const previousOrders = [...orders];

    orders = orders.filter(order => order.id !== id);


    if (!saveOrders()) {

        orders = previousOrders;

        return;

    }


    if (editingId === id) {
        closeEditModal();
    }

    render();

    showToast("Order deleted.");

}


/* =========================================================
   CHANGE ORDER STATUS
========================================================= */

function changeStatus(id, newStatus) {

    if (
        !VALID_STATUSES.includes(newStatus) ||
        !orders.some(order => order.id === id)
    ) {

        renderOrderTable();

        return;

    }


    const previousOrders = [...orders];

    orders = orders.map(order =>

        order.id === id
            ? {...order, status: newStatus}
            : order

    );


    if (!saveOrders()) {

        orders = previousOrders;

        render();

        return;

    }


    render();

    showToast("Order status updated!");

}


/* =========================================================
   RESET ORDER FORM
========================================================= */

function resetAddOrderForm() {

    form.reset();
    serviceCategory.value = "";

    orderDate.max = todayString();

    orderDate.value = todayString();

    orderTotal.value = "₱0.00";

}


/* =========================================================
   CREATE UNIQUE ORDER ID
========================================================= */

function createOrderId() {

    if (
        window.crypto &&
        typeof window.crypto.randomUUID === "function"
    ) {

        return window.crypto.randomUUID();

    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;

}


/* =========================================================
   ORDER TABLE EVENT LISTENERS
========================================================= */

orderList.addEventListener("click", event => {

    if (!(event.target instanceof Element)) {
        return;
    }

    const button = event.target.closest("[data-action]");

    if (!button) return;

    const {action, orderId} = button.dataset;

    if (action === "edit") {
        editOrder(orderId, button);
    }

    if (action === "delete") {
        deleteOrder(orderId);
    }

});


orderList.addEventListener("change", event => {

    if (
        !(event.target instanceof HTMLSelectElement) ||
        !event.target.matches("[data-order-id]")
    ) {
        return;
    }

    changeStatus(
        event.target.dataset.orderId,
        event.target.value
    );

});


/* =========================================================
   FORM EVENT LISTENERS
========================================================= */

cancelEdit.addEventListener("click", closeEditModal);

search.addEventListener("input", renderOrderTable);

filter.addEventListener("change", renderOrderTable);

quantity.addEventListener("input", updateOrderTotal);

unitPrice.addEventListener("input", updateOrderTotal);

editFields.quantity.addEventListener("input", () =>
    updateTotal(editFields.quantity, editFields.unitPrice, editFields.total)
);

editFields.unitPrice.addEventListener("input", () =>
    updateTotal(editFields.quantity, editFields.unitPrice, editFields.total)
);

editOrderModal.addEventListener("click", event => {
    if (event.target === editOrderModal) {
        closeEditModal();
    }
});

if (revenuePeriod) {
    revenuePeriod.addEventListener("change", renderRevenueChart);
}


/* =========================================================
   SIDEBAR NAVIGATION
========================================================= */

function closeSidebar() {

    sidebar.classList.remove("open");

    sidebarOverlay.classList.remove("show");

    menuToggle.setAttribute("aria-expanded", "false");

}


function openSidebar() {

    sidebar.classList.add("open");

    sidebarOverlay.classList.add("show");

    menuToggle.setAttribute("aria-expanded", "true");

}


function switchView(viewId, sourceButton = null) {

    const targetView = document.getElementById(viewId);

    if (!targetView) return;


    document.querySelectorAll(".page-view").forEach(view => {

        view.classList.remove("active");

        view.hidden = true;

    });


    targetView.hidden = false;

    targetView.classList.add("active");


    const titles = {

        dashboardView: "Dashboard",

        ordersView: "Order Management",

        addOrderView: "Add Order",

        analyticsView: "Sales Analytics"

    };


    document.getElementById("pageTitle").textContent =
        titles[viewId] || "Dashboard";


    document.querySelectorAll(".nav-link").forEach(link => {

        link.classList.remove("active");

        link.removeAttribute("aria-current");

    });


    if (sourceButton && sourceButton.classList.contains("nav-link")) {

        sourceButton.classList.add("active");

        sourceButton.setAttribute("aria-current", "page");

    } else {

        const defaultLink = document.querySelector(
            `.nav-link[data-view="${viewId}"]`
        );

        if (defaultLink) {

            defaultLink.classList.add("active");

            defaultLink.setAttribute("aria-current", "page");

        }

    }


    closeSidebar();


    if (viewId === "addOrderView") {
        customer.focus();
    }

}


/* =========================================================
   NAVIGATION BUTTON EVENTS
========================================================= */

document.querySelectorAll("[data-view]").forEach(button => {

    button.addEventListener("click", () => {

        switchView(
            button.dataset.view,
            button
        );

    });

});


/* =========================================================
   HAMBURGER MENU EVENTS
========================================================= */

menuToggle.addEventListener("click", () => {

    if (sidebar.classList.contains("open")) {

        closeSidebar();

    } else {

        openSidebar();

    }

});


sidebarClose.addEventListener("click", closeSidebar);

sidebarOverlay.addEventListener("click", closeSidebar);


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeEditModal();
        closeSidebar();

    }

});


/* =========================================================
   CURRENT DATE AND FOOTER YEAR
========================================================= */

document.getElementById("currentDate").textContent =
    new Date().toLocaleDateString("en-PH", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric"
    });


document.getElementById("footerYear").textContent =
    new Date().getFullYear();


/* =========================================================
   INITIAL APPLICATION SETUP
========================================================= */

render();

