import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
   
    const baseFolder = path.join(process.cwd(), "image_files");
    if (!fs.existsSync(baseFolder)) fs.mkdirSync(baseFolder);

    cb(null, baseFolder);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // keep file extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

export const upload_image = multer({ storage: storage });
