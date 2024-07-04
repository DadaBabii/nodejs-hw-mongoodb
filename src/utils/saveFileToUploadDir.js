import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';

import cloudinary from 'cloudinary';

import { env } from './env.js';
import { CLOUDINARY } from '../constants/index.js';

export const saveFileToUploadDir = async (file) => {
  // await fs.rename(path.join(TEMP_UPLOAD_DIR, file.filename), path.join(UPLOAD_DIR, file.filename));
  const content = await fs.readFile(file.path);
  const newPath = path.join(UPLOAD_DIR, file.filename);
  await fs.writeFile(newPath, content);
  await fs.unlink(file.path);
  return `${env('APP_DOMAIN')}/uploads/${file.filename}`;
};

cloudinary.v2.config({
  secure: true,
  cloud_name: env(CLOUDINARY.CLOUD_NAME),
  api_key: env(CLOUDINARY.API_KEY),
  api_secret: env(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  // const wayPath = await fs.readFile(file.path);
  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};
