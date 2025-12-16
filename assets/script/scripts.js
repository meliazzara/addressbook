const STORAGE_KEY = "addressbook_contacts";
let dataContacts = [];
let editMode = false;

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataContacts));
}
function load() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) dataContacts = JSON.parse(data);
}

function render(data = dataContacts) {
  const tbody = document.getElementById("contactTableBody");
  tbody.innerHTML = "";

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="empty">No contacts available</td></tr>`;
    return;
  }

  data.forEach((c) => {
    tbody.innerHTML += `
      <tr>
        <td><input type="checkbox" class="select" data-id="${c.id}"></td>
        <td>${c.fullName}</td>
        <td>${c.email}</td>
        <td>${c.phone}</td>
        <td>${c.location}</td>
      </tr>
    `;
  });
}

function openNew() {
  editMode = false;
  document.getElementById("modalTitle").innerText = "New Contact";
  document.getElementById("contactId").value = "";
  document
    .querySelectorAll(".modal-content input")
    .forEach((i) => (i.value = ""));
  document.getElementById("contactModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("contactModal").style.display = "none";
}

function saveContact() {
  const id = document.getElementById("contactId").value;
  const contact = {
    id: id || Date.now(),
    fullName: fullName.value,
    email: email.value,
    phone: phone.value,
    location: location.value,
  };

  if (editMode) {
    const index = dataContacts.findIndex((c) => c.id == id);
    dataContacts[index] = contact;
  } else {
    dataContacts.push(contact);
  }

  save();
  render();
  closeModal();
}

function editSelected() {
  const selected = document.querySelector(".select:checked");
  if (!selected) return alert("Pilih satu data");

  const contact = dataContacts.find((c) => c.id == selected.dataset.id);
  editMode = true;

  contactId.value = contact.id;
  fullName.value = contact.fullName;
  email.value = contact.email;
  phone.value = contact.phone;
  location.value = contact.location;

  modalTitle.innerText = "Edit Contact";
  contactModal.style.display = "flex";
}

function deleteSelected() {
  const selected = document.querySelectorAll(".select:checked");
  if (selected.length === 0) return alert("Pilih data");

  if (!confirm("Yakin hapus?")) return;

  const ids = [...selected].map((s) => s.dataset.id);
  dataContacts = dataContacts.filter((c) => !ids.includes(String(c.id)));

  save();
  render();
}

function searchContacts() {
  const q = searchInput.value.toLowerCase();
  render(dataContacts.filter((c) => c.fullName.toLowerCase().includes(q)));
}

function toggleAll(source) {
  document
    .querySelectorAll(".select")
    .forEach((cb) => (cb.checked = source.checked));
}

document.addEventListener("DOMContentLoaded", () => {
  load();
  if (dataContacts.length === 0) {
    dataContacts = [
      {
        id: 1,
        fullName: "Arkhan Hibban Habibi",
        email: "hibban@example.com",
        phone: "6288...",
        location: "Jakarta",
      },
      {
        id: 2,
        fullName: "Melia Az Zahra",
        email: "melia@example.com",
        phone: "6288...",
        location: "Jakarta",
      },
    ];
    save();
  }
  render();
});
