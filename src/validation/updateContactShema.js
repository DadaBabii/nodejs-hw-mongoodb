import joi from 'joi';

export const updateContactShema = joi.object({
  name: joi.string().min(3).max(20),
  phoneNumber: joi.string().min(3).max(20),
  email: joi.string().min(3).max(20),
  isFavourite: joi.boolean(),
  contactType: joi.string().valid('personal', 'home', 'other'),
  photo: joi.string(),
});
