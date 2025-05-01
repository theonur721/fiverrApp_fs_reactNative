import multer from "multer";

// Fotoğrafı hafızaya almak için Multer konfigürasyonu
const storage = multer.memoryStorage(); // Hafızaya yükleyecek şekilde ayarlandı

const upload = multer({ storage: storage });

export default upload;
