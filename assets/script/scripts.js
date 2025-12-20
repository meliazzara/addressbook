let contacts = JSON.parse(localStorage.getItem("contacts")) || [
  {
    id: 1,
    name: "Lesya Salsabilla Putri",
    phone: 62881080070700,
    email: "lesyabilla81@gmail.com",
    location: "Jakarta",
  },
  {
    id: 2,
    name: "Zhidane Fachri Ramadhan",
    phone: 62881080080800,
    email: "zhidane28@gmail.com",
    location: "Bandung",
  },
];

function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// DISPLAY CONTACT
function displayContacts() {
  const tableBody = document.getElementById("contactsTableBody");
  tableBody.innerHTML = "";

  if (contacts.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="5" class="p-4 text-center text-gray-500 italic">
          No contacts available
        </td>
      </tr>
    `;
    return;
  }

  for (const contact of contacts) {
    console.log(`
      🆔 : ${contact.id}
      🧑‍🦱 : ${contact.name}
      📱 : ${contact.phone}
      📍 : ${contact.location}
      ✉️ : ${contact.email}
    `);

    tableBody.innerHTML += `
      <tr class="border-b">
        <td class="p-2">
          <input type="checkbox">
        </td>
        <td class="p-2">${contact.name}</td>
        <td class="p-2">${contact.email}</td>
        <td class="p-2">${contact.phone}</td>
        <td class="p-2">${contact.location}</td>
      </tr>
    `;
  }
}

// AUTO ID
function getLastId() {
  if (contacts.length === 0) return 1;
  return contacts[contacts.length - 1].id + 1;
}

// ADD CONTACT
function addContact(name, phone, email, location) {
  contacts.push({
    id: getLastId(),
    name,
    phone,
    email,
    location,
  });

  saveContacts();
  displayContacts();
}

// SEARCH CONTACT
function searchContacts(keyword) {
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(keyword.toLowerCase()) ||
      contact.email.toLowerCase().includes(keyword.toLowerCase()) ||
      contact.location.toLowerCase().includes(keyword.toLowerCase()) ||
      contact.phone.toString().includes(keyword)
  );

  const tableBody = document.getElementById("contactsTableBody");
  tableBody.innerHTML = "";

  if (filteredContacts.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="5" class="p-4 text-center text-gray-500 italic">
          No contact found
        </td>
      </tr>
    `;
    return;
  }

  for (const contact of filteredContacts) {
    tableBody.innerHTML += `
      <tr class="border-b">
        <td class="p-2">
          <input type="checkbox">
        </td>
        <td class="p-2">${contact.name}</td>
        <td class="p-2">${contact.email}</td>
        <td class="p-2">${contact.phone}</td>
        <td class="p-2">${contact.location}</td>
      </tr>
    `;
  }
}

// DELETE CONTACT
function deleteContact(id) {
  const index = contacts.findIndex((c) => c.id === id);

  if (index === -1) {
    console.log(`❌ Contact with ID ${id} not found.`);
    return;
  }

  contacts.splice(index, 1);
  saveContacts();
  displayContacts();
}

// UPDATE CONTACT
function updateContact(id, newData) {
  const contact = contacts.find((c) => c.id === id);

  if (!contact) {
    console.log(`❌ Contact with ID ${id} not found.`);
    return;
  }

  contact.name = newData.name ?? contact.name;
  contact.phone = newData.phone ?? contact.phone;
  contact.email = newData.email ?? contact.email;
  contact.location = newData.location ?? contact.location;

  saveContacts();
  displayContacts();
}

document.getElementById("searchInput").addEventListener("input", function () {
  const keyword = this.value;
  searchContacts(keyword);
});

displayContacts();
