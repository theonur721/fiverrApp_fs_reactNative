import bcrypt from "bcrypt";
import error from "../utils/error.js";
import User from "../models/usermodel.js";
import jwt from "jsonwebtoken";

// KAYIT YAPMA
export const register = async (req, res, next) => {
  try {
    // şifreyi hashle ve saltla
    const hashedPassword = bcrypt.hashSync(req.body.password, 12);

    //todo foto buluta yükle
    req.body.photo = "default.jpg";

    // veritabanına kaydedilecek kullanıcyı oluştur ve kaydet
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    // kullanıcının şifresiz halini oluştur
    newUser.password = null;

    //cliente cevap gönder
    res.status(200).json({
      message: "Kayıt Başarılı",
      user: newUser,
    });
  } catch (err) {
    next(error(400, "Kullanıcı kaydında hata oldu"));
  }
};

// GİRİŞ YAPMA
export const login = async (req, res, next) => {
  try {
    // isminde göre kullnıcıyı ara
    const user = await User.findOne({ username: req.body.username });
    console.log(user);

    // bulunamazsa hata gönder
    if (!user) {
      return next(error(404, "Giriş bilgileri yanlış"));
    }

    // bulunursa şifresi doğrumu kontrol et- hashli şifre ile gelen şifreyi karşılaştır
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    // şifre yanlışsa tekrar hata gönder
    if (!isCorrect) {
      return next(error(401, "Giriş Bilgileri yanlış"));
    }

    // şifre doğruysa jwt token oluştur
    const token = jwt.sign(
      { id: user._id, isSeller: user.isSeller },
      process.env.JWT_KEY,
      {
        expiresIn: "7d",
      }
    );
    // şifreyi sıfırla
    user.password = null;

    // cliente cevap gönder
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
    // cliente cevap gönder
    res.clearCookie("token").status(200).json({
      message: "Çıkış Yapıldı",
    });
  } catch (err) {
    next(error(400, "Hesaptan çıkarken hata meydana geldi"));
  }
};
