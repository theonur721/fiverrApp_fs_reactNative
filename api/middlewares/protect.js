// clientten çerezler / header ile gönderilen jwt token'in geçerliliğini kontrol edip,
// geçersizse hata gönderip kullanıcı bilgilerini req nesnesine kaydet

import error from "../utils/error.js";
import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  // "1" çerezler veya headers ile gelen token'a eriş
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  // "2" token yoksa hata gönder
  if (!token) return next(error(423, "Yetkiniz yok"));

  // "3" token geçerli mi?
  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    // "4" token geçersizse hata gönder
    if (err) return next(error(423, "Token geçersiz veya süresi dolmuş"));

    // "5" token geçerliyse req nesnesine kullanıcı bilgilerini ekle
    req.userId = payload.id;
    req.isSeller = payload.isSeller;

    // sonraki adıma geç
    next();
  });
};

export default protect;
