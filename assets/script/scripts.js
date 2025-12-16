let dataContacts = [
  {
    id: 1,
    fullName: "Melia Az Zahra",
    email: "zmeliaa@example.com",
    phone: "62881080080800",
    location: "Jakarta",
  },
  {
    id: 2,
    fullName: "Arkhan Hibban Habibi",
    email: "hibbanhabibi@example.com",
    phone: "62881080070700",
    location: "Jakarta",
  },
];

function renderContacts(contacts = dataContacts) {
  const tbody = document.getElementById("contactTableBody");
  tbody.innerHTML = "";

  if (contacts.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center;">No contacts available</td>
      </tr>`;
    return;
  }

  contacts.forEach((c) => {
    tbody.innerHTML += `
      <tr>
        <td>${c.fullName}</td>
        <td>${c.email}</td>
        <td>${c.phone}</td>
        <td>${c.location}</td>
        <td>
          <button onclick="editContact(${c.id})">Edit</button>
          <button class="delete" onclick="deleteContact(${c.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function saveContact() {
  const id = document.getElementById("contactId").value;
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const location = document.getElementById("location").value;

  if (!fullName || !email || !phone || !location) {
    alert("Semua field wajib diisi");
    return;
  }

  if (id) {
    const contact = dataContacts.find((c) => c.id == id);
    contact.fullName = fullName;
    contact.email = email;
    contact.phone = phone;
    contact.location = location;
  } else {
    dataContacts.push({
      id: Date.now(),
      fullName,
      email,
      phone,
      location,
    });
  }

  clearForm();
  renderContacts();
}

function editContact(id) {
  const c = dataContacts.find((c) => c.id === id);

  document.getElementById("formTitle").innerText = "Edit Contact";
  document.getElementById("contactId").value = c.id;
  document.getElementById("fullName").value = c.fullName;
  document.getElementById("email").value = c.email;
  document.getElementById("phone").value = c.phone;
  document.getElementById("location").value = c.location;
}

function deleteContact(id) {
  if (!confirm("Yakin ingin menghapus contact ini?")) return;

  dataContacts = dataContacts.filter((c) => c.id !== id);
  renderContacts();
}

function searchContacts() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();

  const result = dataContacts.filter((c) =>
    c.fullName.toLowerCase().includes(keyword)
  );

  renderContacts(result);
}

document.addEventListener("DOMContentLoaded", renderContacts);
