import createHttpError from 'http-errors';

import { ContactsCollection } from '../db/models/contacts.js';

export const checkUser = async (req, res, next) => {
  const { user } = req;
  if (!user) {
    next(createHttpError(401, 'not the one'));
    return;
  }
  //   const contactId = req.params._id;

  const contact = await ContactsCollection.find({
    userId: user._id,
  });

  if (contact) {
    next();
  }
  next();
};
