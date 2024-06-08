import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';
import {
  createContact,
  deleteContactById,
  getAllContacts,
  getContactById,
  patchContactById,
} from '../services/contacts.js';

export const getAllContactsController = async (req, res) => {
  const contacts = await getAllContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const id = req.params.contactId;

  if (!isValidObjectId(id)) {
    return next(createHttpError(400, `${id} is not valid`));
  }

  const contactById = await getContactById(id);

  if (!contactById) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id : ${id}!`,
    data: contactById,
  });
};

export const createContactsController = async (req, res) => {
  const contact = await createContact(req.body);

  res.json({
    status: 201,
    message: 'Successfully created a new contact!',
    data: contact,
  });
};

export const deleteContactByIdController = async (req, res, next) => {
  const id = req.params.contactId;

  if (!isValidObjectId(id)) {
    next(createHttpError(400, `${id} is not valid`));
    return;
  }
  const contactById = await deleteContactById(id);

  if (!contactById) {
    next(createHttpError(404, `Contact with id : ${id} not found`));
    return;
  }

  res.status(204).send();
};

export const patchContactByIdController = async (req, res, next) => {
  const id = req.params.contactId;

  if (!isValidObjectId(id)) {
    next(createHttpError(400, `${id} is not valid`));
    return;
  }
  const contactById = await patchContactById(id, req.body);

  if (!contactById) {
    next(createHttpError(404, `Contact with id : ${id} not found`));
    return;
  }
  res.json({
    status: 200,
    message: `Successfully patched contact with id : ${id}!`,
    data: contactById,
  });
};
