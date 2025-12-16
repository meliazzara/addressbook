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

function renderContacts(list = dataContacts) {
  const tbody = document.getElementById("contactTableBody");
  tbody.innerHTML = "";

  if (list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="empty">No contacts available</td>
      </tr>
    `;
    return;
  }

  list.forEach((c) => {
    tbody.innerHTML += `
      <tr>
        <td><input type="checkbox" class="selectContact" data-id="${c.id}"></td>
        <td>${c.fullName}</td>
        <td>${c.email}</td>
        <td>${c.phone}</td>
        <td>${c.location}</td>
      </tr>
    `;
  });
}

function openNew() {
  const fullName = prompt("Nama:");
  const email = prompt("Email:");
  const phone = prompt("Phone:");
  const location = prompt("Location:");

  if (!fullName || !email || !phone || !location) return;

  dataContacts.push({
    id: Date.now(),
    fullName,
    email,
    phone,
    location,
  });

  renderContacts();
}

function editSelected() {
  const checked = document.querySelector(".selectContact:checked");
  if (!checked) {
    alert("Pilih 1 data dulu");
    return;
  }

  const id = Number(checked.dataset.id);
  const c = dataContacts.find((x) => x.id === id);

  c.fullName = prompt("Nama:", c.fullName);
  c.email = prompt("Email:", c.email);
  c.phone = prompt("Phone:", c.phone);
  c.location = prompt("Location:", c.location);

  renderContacts();
}

function deleteSelected() {
  const checked = document.querySelectorAll(".selectContact:checked");
  if (checked.length === 0) {
    alert("Pilih data dulu");
    return;
  }

  if (!confirm("Yakin hapus data?")) return;

  const ids = [...checked].map((c) => Number(c.dataset.id));
  dataContacts = dataContacts.filter((c) => !ids.includes(c.id));

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
