import { Router } from 'express';

import {
  createContactsController,
  deleteContactByIdController,
  getAllContactsController,
  getContactByIdController,
  patchContactByIdController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateMongooseId } from '../middlewares/validateMongooseId.js';
import { createContactShema } from '../validation/createContactShema.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateContactShema } from '../validation/updateContactShema.js';

const contactsRouter = Router();

contactsRouter.use('/contacts/:contactId', validateMongooseId('contactId'));

contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));

contactsRouter.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

contactsRouter.post('/contacts', validateBody(createContactShema), ctrlWrapper(createContactsController));

contactsRouter.delete('/contacts/:contactId', ctrlWrapper(deleteContactByIdController));

contactsRouter.patch('/contacts/:contactId', validateBody(updateContactShema), ctrlWrapper(patchContactByIdController));

export default contactsRouter;
