import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import authrouter from "./routes/authroutes.js";
import gigrouter from "./routes/gigroutes.js";

dotenv.config();

// express'i oluştur
const app = express();

// mongoose ile veritabanı ile bağlantı kur
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("🍀 veritabanı ile bağlantı kuruldu"))
  .catch((err) => console.log("🍁 veritabanı ile bağlantı kurulamadı", err));

//*** MİDDLEWARES ***
//(a) body/query alanındaki json içeriğinin işlenmesini sağlar
app.use(express.json());

//(b) api isteklerini gösteren morgan middlewaresi
app.use(morgan("dev"));

// (c) cors hatalarını önler
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PATCH"],
  })
);

// (d) istekle gelen çerezleri işler
app.use(cookieParser());

// kontrol route
app.route("health").get((req, res) => {
  res.json("server çalışıyor");
});

// routleri tanımla
app.use("/api/auth", authrouter);
app.use("/api/gigs", gigrouter);

// hatalı yönetimi için
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

// portu tanıt
app.listen(process.env.PORT, (req, res) => {
  console.log(`🏁 APİ ${process.env.PORT} portunu dinlemeye başladı`);
});
