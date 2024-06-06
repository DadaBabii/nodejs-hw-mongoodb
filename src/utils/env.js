import dotenv from 'dotenv';

dotenv.config();

export const env = (name, defaultValue) => {
  if (process.env[name]) return process.env[name];
  if (defaultValue) return defaultValue;

  throw new Error(`Missing: process.env['${name}'].`);
};
