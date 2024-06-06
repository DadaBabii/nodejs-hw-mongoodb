import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
  //return await ContactsCollection.find({});
};

export const getContactById = async (id) => {
  const contact = await ContactsCollection.findById(id);
  return contact;
};
