import * as multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const d = new Date();
    const ymd = [
      d.getFullYear(),
      ('' + (d.getMonth() + 1)).padStart(2, '0'),
      ('' + d.getDate()).padStart(2, '0'),
    ];
    const dir = 'uploads/' + ymd.join('');
    try {
      fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
    } catch (e) {}

    cb(null, path.join(__dirname, dir));
  },
  filename: function (req, file, cb) {
    const name = Date.now();
    const ext = file.originalname.split('.').pop();
    cb(null, name.toString() + '.' + ext);
  },
});

export { storage };
