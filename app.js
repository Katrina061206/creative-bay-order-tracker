const STORAGE_KEY = "creativeBayOrders";
const VALID_STATUSES = ["Pending", "Processing", "Completed"];

const form = document.getElementById("orderForm");
const customer = document.getElementById("customer");
const description = document.getElementById("description");
const quantity = document.getElementById("quantity");
const orderDate = document.getElementById("orderDate");
const status = document.getElementById("status");
const orderList = document.getElementById("orderList");
const emptyState = document.getElementById("emptyState");
const search = document.getElementById("search");
const filter = document.getElementById("filter");
const submitBtn = document.getElementById("submitBtn");
const cancelEdit = document.getElementById("cancelEdit");

let toastTimer;
let orders = loadOrders();
let editingId = null;

function loadOrders() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) return [];

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) {
      showToast("Saved orders could not be read because the stored data is invalid.");
      return [];
    }

    const validOrders = parsed.filter(order =>
      order && typeof order.id === "string" && order.id.length > 0 &&
      typeof order.customer === "string" && order.customer.trim().length > 0 &&
      typeof order.description === "string" && order.description.trim().length > 0 &&
      Number.isInteger(order.quantity) &&
      order.quantity >= 1 && order.quantity <= 9999 &&
      isValidOrderDate(order.date) &&
      VALID_STATUSES.includes(order.status)
    );

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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    return true;
  } catch {
    showToast("Unable to save. Browser storage may be full.");
    return false;
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function todayString() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function isCalendarDate(date) {
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return false;
  }
  const parsed = new Date(`${date}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === date;
}

function isValidOrderDate(date) {
  return isCalendarDate(date) && date <= todayString();
}

orderDate.max = todayString();
orderDate.value = todayString();

function formatDate(date) {
  return new Date(date + "T00:00:00").toLocaleDateString(
    "en-PH", {month: "short", day: "numeric", year: "numeric"}
  );
}

function render() {
  document.getElementById("totalCount").textContent = orders.length;
  document.getElementById("pendingCount").textContent =
    orders.filter(o => o.status === "Pending").length;
  document.getElementById("processingCount").textContent =
    orders.filter(o => o.status === "Processing").length;
  document.getElementById("completedCount").textContent =
    orders.filter(o => o.status === "Completed").length;

  const query = search.value.trim().toLowerCase();
  const selected = filter.value;

  const visible = orders.filter(order => {
    const matchesSearch =
      order.customer.toLowerCase().includes(query) ||
      order.description.toLowerCase().includes(query);

    const matchesStatus =
      selected === "All" || order.status === selected;

    return matchesSearch && matchesStatus;
  });

  orderList.innerHTML = visible.map(order => `
    <tr>
      <td class="customer">${escapeHTML(order.customer)}</td>
      <td class="order-desc" title="${escapeHTML(order.description)}">
        ${escapeHTML(order.description)}
      </td>
      <td>${order.quantity}</td>
      <td>${formatDate(order.date)}</td>
      <td>
        <select class="filter-select status ${order.status}"
          aria-label="Change status for ${escapeHTML(order.customer)}"
          data-order-id="${escapeHTML(order.id)}">
          <option value="Pending" ${order.status === "Pending" ? "selected" : ""}>Pending</option>
          <option value="Processing" ${order.status === "Processing" ? "selected" : ""}>Processing</option>
          <option value="Completed" ${order.status === "Completed" ? "selected" : ""}>Completed</option>
        </select>
      </td>
      <td>
        <div class="actions">
          <button class="action-btn" type="button" data-action="edit"
            data-order-id="${escapeHTML(order.id)}">Edit</button>
          <button class="action-btn delete-btn" type="button" data-action="delete"
            data-order-id="${escapeHTML(order.id)}">Delete</button>
        </div>
      </td>
    </tr>
  `).join("");

  emptyState.style.display = visible.length ? "none" : "block";
  orderList.closest(".table-wrap").querySelector("table").style.display =
    visible.length ? "table" : "none";

  if (!visible.length && orders.length) {
    emptyState.querySelector("h4").textContent = "No matching orders";
    emptyState.querySelector("p").textContent =
      "Try another search term or status filter.";
  } else if (!orders.length) {
    emptyState.querySelector("h4").textContent = "No orders yet";
    emptyState.querySelector("p").textContent =
      "Your customer orders will appear here.";
  }
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const name = customer.value.trim();
  const details = description.value.trim();
  const qty = Number(quantity.value);
  const date = orderDate.value;

  if (!name || !details || !date) {
    showToast("Please complete all required fields.");
    return;
  }

  if (!Number.isInteger(qty) || qty < 1 || qty > 9999) {
    showToast("Quantity must be a whole number from 1 to 9999.");
    quantity.focus();
    return;
  }

  if (!isCalendarDate(date)) {
    showToast("Enter a valid order date.");
    orderDate.focus();
    return;
  }

  if (date > todayString()) {
    showToast("Order date cannot be in the future.");
    orderDate.focus();
    return;
  }

  if (!VALID_STATUSES.includes(status.value)) {
    showToast("Choose a valid order status.");
    status.focus();
    return;
  }

  const wasEditing = editingId !== null;
  const previousOrders = [...orders];

  if (wasEditing) {
    orders = orders.map(order =>
      order.id === editingId
        ? {...order, customer: name, description: details,
           quantity: qty, date, status: status.value}
        : order
    );
  } else {
    orders.unshift({
      id: createOrderId(),
      customer: name,
      description: details,
      quantity: qty,
      date,
      status: status.value
    });
  }

  if (!saveOrders()) {
    orders = previousOrders;
    return;
  }

  resetForm();
  render();
  showToast(wasEditing ? "Order updated successfully!" : "New order added!");
});

function editOrder(id) {
  const order = orders.find(item => item.id === id);
  if (!order) return;

  editingId = id;
  customer.value = order.customer;
  description.value = order.description;
  quantity.value = order.quantity;
  orderDate.value = order.date;
  status.value = order.status;

  document.getElementById("formTitle").textContent = "Edit Order";
  submitBtn.textContent = "Save Changes";
  cancelEdit.hidden = false;

  document.querySelector(".workspace").scrollIntoView({
    behavior: "smooth", block: "start"
  });
}

function deleteOrder(id) {
  if (!confirm("Are you sure you want to delete this order?")) return;

  const previousOrders = [...orders];
  orders = orders.filter(order => order.id !== id);

  if (!saveOrders()) {
    orders = previousOrders;
    return;
  }

  if (editingId === id) resetForm();
  render();
  showToast("Order deleted.");
}

function changeStatus(id, newStatus) {
  if (!VALID_STATUSES.includes(newStatus) || !orders.some(order => order.id === id)) {
    render();
    return;
  }

  const previousOrders = [...orders];
  orders = orders.map(order =>
    order.id === id ? {...order, status: newStatus} : order
  );

  if (!saveOrders()) {
    orders = previousOrders;
    render();
    return;
  }

  render();
  showToast("Order status updated!");
}

function resetForm() {
  form.reset();
  editingId = null;
  orderDate.value = todayString();
  document.getElementById("formTitle").textContent = "Add New Order";
  submitBtn.textContent = "+ Add Order";
  cancelEdit.hidden = true;
}

function createOrderId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

orderList.addEventListener("click", event => {
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const {action, orderId} = button.dataset;
  if (action === "edit") editOrder(orderId);
  if (action === "delete") deleteOrder(orderId);
});

orderList.addEventListener("change", event => {
  if (!(event.target instanceof HTMLSelectElement) ||
      !event.target.matches("[data-order-id]")) return;
  changeStatus(event.target.dataset.orderId, event.target.value);
});

cancelEdit.addEventListener("click", resetForm);
search.addEventListener("input", render);
filter.addEventListener("change", render);

render();
