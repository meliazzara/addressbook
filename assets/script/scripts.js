const dataContacts = [
  {
    id: 1,
    fullName: "Arkhan Hibban Habibi",
    phone: 62881080070700,
    email: "hibbanhabibi@example.com",
    location: "Jakarta",
  },
  {
    id: 2,
    fullName: "Melia Az Zahra",
    phone: 62881080080800,
    email: "zmeliaa@example.com",
    location: "Jakarta",
  },
];

function displayContacts() {
  for (const contact of dataContacts) {
    console.log(`
🆔 : ${contact.id}
🧑‍🦱 : ${contact.fullName}
📱 : ${contact.phone}
📍 : ${contact.location}
✉️ : ${contact.email}
`);
  }
}

function getLastId() {
  if (dataContacts.length === 0) {
    return 1;
  }
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
}

function searchContacts(keyword) {
  const filteredContacts = dataContacts.filter(
    (contact) => contact.fullName === keyword
  );

  if (filteredContacts.length === 0) {
    console.log("Data tidak ditemukan");
    return;
  }

  for (const contact of filteredContacts) {
    console.log(`
🆔 : ${contact.id}
🧑‍🦱 : ${contact.fullName}
📱 : ${contact.phone}
📍 : ${contact.location}
✉️ : ${contact.email}
`);
  }
}

// TEST
addContact("Nam Jo Hyuk", 6281234567890, "hyuk@example.com", "Jakarta");
addContact("Nam Jo Hyuk", 6281234567890, "hyuk@example.com", "Jakarta");

searchContacts("Nam Jo Hyuk");
