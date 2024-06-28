import { SORT_ORDER } from '../constants/constants.js';
import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  user = null,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find({ userId: user._id });

  if (filter.typeOfContact) {
    contactsQuery.where('contactType').equals(filter.typeOfContact);
  }

  if (filter.favourite) {
    contactsQuery.where('isFavourite').equals(filter.favourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (id) => {
  const contact = await ContactsCollection.findById(id);
  return contact;
};
export const createContact = async (payload, userId) => {
  const newContact = await ContactsCollection.create({ userId, ...payload });
  return newContact;
};

export const deleteContactById = async (id) => {
  const deleteContact = await ContactsCollection.findByIdAndDelete({ _id: id });

  return deleteContact;
};

export const patchContactById = async (id, payload) => {
  const patchContact = await ContactsCollection.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return patchContact;
};
