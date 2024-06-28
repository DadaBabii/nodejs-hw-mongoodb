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
import { authenticate } from '../middlewares/authenticate.js';
import { checkUser } from '../middlewares/checkUser.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.use('/:contactId', validateMongooseId('contactId'));

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(getContactByIdController));

contactsRouter.post('', validateBody(createContactShema), ctrlWrapper(createContactsController));

contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactByIdController));

contactsRouter.patch('/:contactId', validateBody(updateContactShema), ctrlWrapper(patchContactByIdController));

export default contactsRouter;
