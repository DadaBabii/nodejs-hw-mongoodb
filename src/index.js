import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
// import { initMongoDB } from './db/initMongoDB.js';
// import { startServer } from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';

(async () => {
  await initMongoConnection();
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  await createDirIfNotExists(UPLOAD_DIR);
  setupServer();
})();

// const bootstrap = async () => {
//   await initMongoDB();
//   await createDirIfNotExists(TEMP_UPLOAD_DIR);
//   await createDirIfNotExists(UPLOAD_DIR);
//   startServer();
// };

// void bootstrap();
