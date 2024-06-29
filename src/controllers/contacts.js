import createHttpError from 'http-errors';
import {
  createContact,
  deleteContactById,
  getAllContacts,
  getContactById,
  patchContactById,
} from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const user = req.user;
  if (req.user) {
    filter.userId = req.user._id;
  }

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    user,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

const setAuthContactId = (req) => {
  let authContactId = {};
  const { contactId } = req.params;
  const userId = req.user._id;
  if (contactId) {
    authContactId = { _id: contactId };
  }
  if (userId) {
    authContactId = { ...authContactId, userId: userId };
  }

  return authContactId;
};

export const getContactByIdController = async (req, res, next) => {
  const authContactId = setAuthContactId(req);

  const contactById = await getContactById(authContactId);

  if (!contactById) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id : ${authContactId._id}!`,
    data: contactById,
  });
};

export const createContactsController = async (req, res) => {
  const contact = await createContact({ userId: req.user._id, ...req.body });
  res.status(201).json({
    status: 201,
    message: 'Successfully created a new contact!',
    data: contact,
  });
};

export const deleteContactByIdController = async (req, res, next) => {
  const authContactId = setAuthContactId(req);

  const contactById = await deleteContactById(authContactId);

  if (!contactById) {
    next(createHttpError(404, `Contact with id : ${authContactId} not found`));
    return;
  }

  res.status(204).send();
};

export const patchContactByIdController = async (req, res, next) => {
  const authContactId = setAuthContactId(req);

  const contactById = await patchContactById(authContactId, req.body);

  if (!contactById) {
    next(createHttpError(404, `Contact with id : ${authContactId._id} not found`));
    return;
  }
  res.json({
    status: 200,
    message: `Successfully patched contact with id : ${authContactId._id}!`,
    data: contactById,
  });
};
