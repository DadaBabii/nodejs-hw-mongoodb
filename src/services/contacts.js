import { SORT_ORDER } from '../constants/constants.js';
import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { saveFileToCloudinary, saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

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

export const getContactById = async (authContactId) => {
  const contact = await ContactsCollection.findOne(authContactId);
  return contact;
};
export const createContact = async ({ userId, photo, ...payload }) => {
  const url = await saveFileToCloudinary(photo);

  const newContact = await ContactsCollection.create({ ...payload, userId: userId, photo: url });
  return newContact;
};

export const deleteContactById = async (authContactId) => {
  const deleteContact = await ContactsCollection.findOneAndDelete(authContactId);

  return deleteContact;
};

export const patchContactById = async (authContactId, payload, options = {}) => {
  const patchContact = await ContactsCollection.findOneAndUpdate(authContactId, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!patchContact || !patchContact.value) return null;

  return {
    contact: patchContact.value,
    isNew: Boolean(patchContact?.lastErrorObject?.upserted),
  };
};
