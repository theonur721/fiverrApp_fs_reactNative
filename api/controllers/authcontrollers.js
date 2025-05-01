import bcrypt from "bcrypt";
import error from "../utils/error.js";
import User from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
import { Readable } from "stream";

// KAYIT OLMA
export const register = async (req, res, next) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 12);

    let photoUrl = "default.jpg"; // Varsayılan fotoğraf

    // Fotoğraf varsa Cloudinary'e yükle
    if (req.file) {
      console.log("Received file:", req.file); // Fotoğrafın geldiğini kontrol et

      const streamUpload = (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "userPhotos",
            },
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );

          const readable = new Readable();
          readable.push(buffer);
          readable.push(null);
          readable.pipe(stream);
        });
      };

      const result = await streamUpload(req.file.buffer);
      // Fotoğrafı Cloudinary'e yükle
      photoUrl = result.secure_url; // Cloudinary'den gelen güvenli URL
    } else {
      console.log("No file received, using default image."); // Fotoğraf yoksa varsayılan resim kullan
    }

    req.body.photo = photoUrl; // Fotoğraf URL'sini body'ye ekliyoruz

    // Yeni kullanıcıyı oluşturuyoruz
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    newUser.password = null; // Şifreyi kullanıcı verisinden çıkarıyoruz

    res.status(200).json({
      message: "Kayıt Başarılı",
      user: newUser,
    });
  } catch (err) {
    console.error(err);
    next(error(400, "Kullanıcı kaydında hata oldu"));
  }
};

// GİRİŞ YAPMA
export const login = async (req, res, next) => {
  console.log("Login request body:", req.body);
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return next(error(404, "Giriş bilgileri yanlış"));
    }

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    if (!isCorrect) {
      return next(error(401, "Giriş bilgileri yanlış"));
    }

    const token = jwt.sign(
      { id: user._id, isSeller: user.isSeller },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );

    user.password = null;

    res.cookie("token", token).status(200).json({
      message: "Giriş Başarılı",
      user,
      token,
    });
  } catch (err) {
    next(error(400, "Giriş yaparken hata meydana geldi"));
  }
};

// ÇIKIŞ YAPMA
export const logout = (req, res, next) => {
  try {
    res.clearCookie("token").status(200).json({
      message: "Çıkış Yapıldı",
    });
  } catch (err) {
    next(error(400, "Hesaptan çıkarken hata meydana geldi"));
  }
};
