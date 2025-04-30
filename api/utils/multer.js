import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    console.log("GELEN DOSYA", file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export default upload;
