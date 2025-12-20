const STORAGE_KEY = "addressbook_contacts";
let dataContacts = [];
let editMode = false;

// ===== STORAGE =====
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataContacts));
}

function load() {
  const data = localStorage.getItem(STORAGE_KEY);
  dataContacts = data ? JSON.parse(data) : [];
}

// ===== AUTO DETECT CITY =====
function detectCity() {
  if (!navigator.geolocation) {
    location.value = "-";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );
        const data = await res.json();

        location.value =
          data.address.city || data.address.town || data.address.village || "-";
      } catch {
        location.value = "-";
      }
    },
    () => {
      location.value = "-";
    }
  );
}

// ===== RENDER =====
function render(data = dataContacts) {
  const tbody = document.getElementById("contactTableBody");
  tbody.innerHTML = "";

  if (data.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center py-6 italic text-slate-200">
          No contacts available
        </td>
      </tr>
    `;
    return;
  }

  data.forEach((c) => {
    tbody.innerHTML += `
      <tr class="hover:bg-slate-600 transition">
        <td class="p-3">
          <input type="checkbox" class="select" data-id="${c.id}">
        </td>
        <td class="p-3">${c.fullName}</td>
        <td class="p-3">${c.email}</td>
        <td class="p-3">${c.phone}</td>
        <td class="p-3">${c.location || "-"}</td>
      </tr>
    `;
  });
}

// ===== MODAL =====
function openNew() {
  editMode = false;
  modalTitle.innerText = "New Contact";
  contactId.value = "";
  fullName.value = "";
  email.value = "";
  phone.value = "";
  location.value = "Detecting...";

  contactModal.classList.remove("hidden");
  contactModal.classList.add("flex");

  detectCity(); // ⭐ AUTO
}

function closeModal() {
  contactModal.classList.add("hidden");
}

// ===== SAVE =====
function saveContact() {
  const id = contactId.value;

  const contact = {
    id: id ? Number(id) : Date.now(),
    fullName: fullName.value,
    email: email.value,
    phone: phone.value,
    location: location.value.trim() || "-",
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

// ===== EDIT =====
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
  contactModal.classList.remove("hidden");
  contactModal.classList.add("flex");
}

// ===== DELETE =====
function deleteSelected() {
  const selected = document.querySelectorAll(".select:checked");
  if (selected.length === 0) return alert("Pilih data");
  if (!confirm("Yakin hapus?")) return;

  const ids = [...selected].map((s) => Number(s.dataset.id));
  dataContacts = dataContacts.filter((c) => !ids.includes(c.id));

  save();
  render();
}

// ===== SEARCH =====
function searchContacts() {
  const q = searchInput.value.toLowerCase();
  render(dataContacts.filter((c) => c.fullName.toLowerCase().includes(q)));
}

// ===== TOGGLE =====
function toggleAll(source) {
  document
    .querySelectorAll(".select")
    .forEach((cb) => (cb.checked = source.checked));
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  load();
  render();
});
