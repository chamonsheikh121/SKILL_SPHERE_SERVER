import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const data = JSON.parse(req?.body?.data)
    const courseId = data?.courseId as string;
    const lessonId = data?.lessonId as string;

    if(!(courseId && lessonId)){
throw new Error("Please provide an course Id and LessonId")
    }

    // step 1 :  main folder making if not exists
    const baseFolder = path.join(process.cwd(), "course_videos");
    if (!fs.existsSync(baseFolder)) fs.mkdirSync(baseFolder);

    // step 2: specific course videos folder by course id
    const uploadPath = path.join(baseFolder, courseId, lessonId);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // step 3: uploading video to specific course folder
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // keep file extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

export const upload_video = multer({ storage: storage });
