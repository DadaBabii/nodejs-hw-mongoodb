import { model, Schema } from 'mongoose';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      required: false,
      default: false,
    },
    contactType: {
      type: String,
      required: false,
      default: 'other',
      enum: ['personal', 'home', 'other'],
    },

    userId: { type: Schema.Types.ObjectId, ref: 'users' }, // нова властивість
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactsCollection = model('contacts', contactsSchema);
