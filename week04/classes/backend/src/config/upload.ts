import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const dirPath = path.resolve(__dirname, '..', '..', 'temp');

export default {
  dir: dirPath,
  storage: multer.diskStorage({
    destination: dirPath,
    filename: (req, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
