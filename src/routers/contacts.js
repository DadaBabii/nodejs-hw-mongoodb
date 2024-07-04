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
import { upload } from '../middlewares/multer.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.use('/:contactId', validateMongooseId('contactId'));

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(getContactByIdController));

contactsRouter.post(
  '',
  upload.single('photo'),
  validateBody(createContactShema),
  ctrlWrapper(createContactsController),
);

contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactByIdController));

contactsRouter.patch(
  '/:contactId',
  upload.single('photo'),
  validateBody(updateContactShema),
  ctrlWrapper(patchContactByIdController),
);

export default contactsRouter;
