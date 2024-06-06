import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/constants.js';
import { getAllContacts, getContactById } from './services/contacts.js';
import { isValidObjectId } from 'mongoose';

dotenv.config();

const PORT = Number(env(ENV_VARS.PORT, '3000'));

export const setupServer = () => {
  const app = express();

  app.use(
    pino({
      transport: { target: 'pino-pretty' },
    }),
  );

  app.use(cors());

  app.get('/', (req, res) => {
    res.send('Welcome');
  });

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });
  app.get('/contacts/:contactId', async (req, res) => {
    const id = req.params.contactId;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        status: 400,
        message: `${id} is not valid`,
      });
    }

    const contactById = await getContactById(id);

    if (!contactById) {
      return res.status(404).json({
        status: 404,
        message: `Contact with id : ${id} was not found`,
      });
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id : ${id}!`,
      data: contactById,
    });
  });

  app.use('*', (req, res) => {
    res.status(404).send('Page not found');
  });

  app.use((err, req, res) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
