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
export const createContact = async (payload) => {
  const newContact = await ContactsCollection.create(payload);
  return newContact;
};

export const deleteContactById = async (id) => {
  const deleteContact = await ContactsCollection.findByIdAndDelete({ _id: id });

  return deleteContact;
};

export const patchContactById = async (id, payload) => {
  const patchContact = await ContactsCollection.findByIdAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return patchContact;
};
