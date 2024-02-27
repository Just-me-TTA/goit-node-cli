const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const buffer = await fs.readFile(contactsPath);
  const contacts = JSON.parse(buffer);
  return contacts;
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contactById = allContacts.find(({ id }) => id === contactId);
  return contactById || null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const contactById = await getContactById(contactId);
  const updatedContacts = allContacts.filter(({ id }) => id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  return contactById;
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const newContact = { id, name, email, phone };
  const allContacts = await listContacts();
  const updatedContacts = [...allContacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
