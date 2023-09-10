import fs from 'node:fs/promises';
import { nanoid } from 'nanoid';

const contactsPath = './db/contacts.json';

/*
 * Skomentuj i zapisz wartość
 * const contactsPath = ;
 */
function printContact(contact) {
	console.log(
		`id: ${contact.id}, name: ${contact.name}, email: ${contact.email}, phone: ${contact.phone}`
	);
}

// TODO: udokumentuj każdą funkcję
export async function listContacts() {
	const jsonString = await fs.readFile(contactsPath, 'utf8');
	const contacts = JSON.parse(jsonString);

	contacts.forEach(printContact);
}

export async function getContactById(contactId) {
	const jsonString = await fs.readFile(contactsPath, 'utf8');
	const contacts = JSON.parse(jsonString);

	const contact = contacts.find((contact) => contact.id === contactId);

	if (contact) {
		printContact(contact);
	} else {
		console.log('Could not find contact');
	}
}

export async function removeContact(contactId) {
	const jsonString = await fs.readFile(contactsPath, 'utf8');
	const contacts = JSON.parse(jsonString);

	const numberOfContacts = contacts.length;
	contacts.splice(
		contacts.findIndex(function (i) {
			return i.id === contactId;
		}),
		1
	);

	if (contacts.length === numberOfContacts) {
		console.log('Could not find contact');
		return;
	}

	await fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf8');
	console.log(`removed contact with id: ${contactId}`);
}

export async function addContact(name, email, phone) {
	const jsonString = await fs.readFile(contactsPath, 'utf8');
	const contacts = JSON.parse(jsonString);

	const newContact = { id: nanoid(), name, email, phone };
	contacts.push(newContact);

	await fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf8');
	console.log(`added contact:`);
	printContact(newContact);
}
