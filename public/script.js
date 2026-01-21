const apiUrl = "http://localhost:5000/customers";

// Fetch all customers
async function fetchCustomers() {
  const res = await fetch(apiUrl);
  const data = await res.json();
  const tbody = document.querySelector("#customersTable tbody");
  tbody.innerHTML = "";
  data.forEach(c => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.name}</td>
      <td>${c.email}</td>
      <td>${c.phone}</td>
      <td>${c.address || ""}</td>
      <td>
        <button onclick="deleteCustomer('${c._id}')">Delete</button>
        <button onclick="editCustomer('${c._id}', '${c.name}', '${c.email}', '${c.phone}', '${c.address || ""}')">Edit</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Add new customer
async function addCustomer() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  if (!name || !email || !phone) {
    alert("Name, Email, and Phone are required!");
    return;
  }

  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone, address })
  });

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("address").value = "";

  fetchCustomers();
}

// Delete customer
async function deleteCustomer(id) {
  if (confirm("Are you sure you want to delete?")) {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    fetchCustomers();
  }
}

// Edit customer
function editCustomer(id, name, email, phone, address) {
  const newName = prompt("Enter new name:", name) || name;
  const newEmail = prompt("Enter new email:", email) || email;
  const newPhone = prompt("Enter new phone:", phone) || phone;
  const newAddress = prompt("Enter new address:", address) || address;

  fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newName, email: newEmail, phone: newPhone, address: newAddress })
  }).then(fetchCustomers);
}

// Load customers on page load
window.onload = fetchCustomers;
