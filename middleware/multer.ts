import multer from "multer";
import { Request } from "express";

const fileFilter = (
  _: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = ["text/csv", "text/plain"];
  const allowedExtensions = [".csv", ".txt"];

  const isMimeTypeValid = allowedMimeTypes.includes(file.mimetype);

  const fileExt = file.originalname
    .toLowerCase()
    .slice(file.originalname.lastIndexOf("."));
  const isExtensionValid = allowedExtensions.includes(fileExt);

  if (isMimeTypeValid && isExtensionValid) {
    cb(null, true);
  } else {
    cb(new Error(`Файл ${file.originalname} не является .csv или .txt`));
  }
};

export const uploadMiddleware = multer({
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // Макс. размер файла 10MB
  },
});
