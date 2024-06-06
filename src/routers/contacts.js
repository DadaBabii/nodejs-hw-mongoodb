import { Router } from 'express';

import {
  createContactsController,
  deleteContactByIdController,
  getAllContactsController,
  getContactByIdController,
  patchContactByIdController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));

contactsRouter.get(
  '/contacts/:contactId',
  ctrlWrapper(getContactByIdController),
);

contactsRouter.post('/contacts', ctrlWrapper(createContactsController));

contactsRouter.delete(
  '/contacts/:contactId',
  ctrlWrapper(deleteContactByIdController),
);

contactsRouter.patch(
  '/contacts/:contactId',
  ctrlWrapper(patchContactByIdController),
);

export default contactsRouter;
