let dataContacts = [
  {
    id: 1,
    fullName: "Arkhan Hibban Habibi",
    phone: "62881080070700",
    email: "hibbanhabibi@example.com",
    location: "Jakarta",
  },
  {
    id: 2,
    fullName: "Melia Az Zahra",
    phone: "62881080080800",
    email: "zmeliaa@example.com",
    location: "Jakarta",
  },
];

function renderContacts(contacts = dataContacts) {
  const tbody = document.getElementById("contactTableBody");
  tbody.innerHTML = "";

  if (contacts.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="empty">No contacts available</td>
      </tr>
    `;
    return;
  }

  contacts.forEach((contact) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td><input type="checkbox"></td>
      <td>${contact.fullName}</td>
      <td>${contact.email}</td>
      <td>${contact.phone}</td>
      <td>${contact.location}</td>
    `;

    tbody.appendChild(row);
  });
}

function getLastId() {
  if (dataContacts.length === 0) return 1;
  return dataContacts[dataContacts.length - 1].id + 1;
}

function addContact(fullName, phone, email, location) {
  dataContacts.push({
    id: getLastId(),
    fullName,
    phone,
    email,
    location,
  });

  renderContacts();
}

function searchContacts(keyword) {
  const result = dataContacts.filter((contact) =>
    contact.fullName.toLowerCase().includes(keyword.toLowerCase())
  );

  renderContacts(result);
}

document.addEventListener("DOMContentLoaded", () => {
  renderContacts();

  // TEST (BOLEH DIHAPUS)
  addContact("Nam Jo Hyuk", "6281234567890", "hyuk@example.com", "Jakarta");
  addContact("Nam Jo Hyuk", "6281234567890", "hyuk@example.com", "Jakarta");
});
