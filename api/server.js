import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/authroutes.js";
import morgan from "morgan";
import cors from "cors";

//.env dosyasından verileri oku
dotenv.config();

// veritabanı ile bağlantı kur
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("🍀 Veritabanı bağlantısı başarılı"))
  .catch((err) => console.log("Veritabanına bağlanılamadı", err));

// express oluştur
const app = express();

// route tanımla
app.route("/health").get((req, res) => {
  res.json("Server çalıışıyor");
});

//* MİDLLEWARES
// (a) body-query alanında json içeriğinin işlenmesini sağlar
app.use(express.json());
// (b) konsola istek bilgilerini yazar
app.use(morgan("dev"));
// (c) cors hatalarını önler
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// (c) hatalı yönetimi için
// - controllerden yapılan yönlendirmeler için bu middleware çalışacak
app.use((err, req, res, next) => {
  console.log("😡 HATA MEYDANA GELDİ 😡");
  console.log(err);

  const errStatus = err.status || 500;
  const errMessage = err.message || "Üzgünüz bir şeyler ters gitti";

  return res.status(errStatus).json({
    message: errMessage,
  });
});

// routeri tanımla
app.use("/api/auth", authRouter);

// port belirle
app.listen(process.env.PORT, (req, res) =>
  console.log(`🏁 Server ${process.env.PORT} portunu dinlemeye başladı`)
);
