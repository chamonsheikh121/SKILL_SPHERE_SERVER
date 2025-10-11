import multer from "multer";
import path from "path";
import fs from "fs";

const sanitizeTitle = (title: string) => title.replace(/\s+/g, "_");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const data = JSON.parse(req.body.data); // metadata from frontend
    const courseId = data?.courseId;
    const courseTitle = data?.courseTitle || "unknown_course";

    const sanitizedTitle = sanitizeTitle(courseTitle);
    const baseFolder = path.join(process.cwd(), "course_videos");

    if (!fs.existsSync(baseFolder)) fs.mkdirSync(baseFolder);

    // Determine folderName
    let folderName = `${sanitizedTitle}+${courseId}`;

    // Check existing folders
    const existingFolders = fs.readdirSync(baseFolder);

    let foundFolder = false;

    existingFolders.forEach((folder) => {
      const [existingTitle, existingId] = folder.split("+");
      if (existingId === courseId) {
        foundFolder = true;

        // If title changed, rename folder
        if (existingTitle !== sanitizedTitle) {
          const oldPath = path.join(baseFolder, folder);
          const newPath = path.join(baseFolder, folderName);
          fs.renameSync(oldPath, newPath);
        } else {
          // Folder exists and title is same
          folderName = folder;
        }
      }
    });

    // If no folder found for this courseId, folderName remains as new
    const uploadPath = path.join(baseFolder, folderName);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // keep file extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

export const upload = multer({ storage: storage });
