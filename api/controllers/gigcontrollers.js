import error from "../utils/error.js";
import Gig from "../models/gigmodel.js";
import cloudinary from "../utils/cloudinary.js"; // doğru yolu kullan

// GİGLERİ AL - filtreleme ayarlarını oluşturan method
const buildFilter = (query) => {
  //filtreleme
  const filters = {};

  if (query.userId) {
    filters.user = query.userId;
  }
  if (query.category) {
    filters.category = query.category;
  }
  if (query.min || query.max) {
    filters.price = {};
    if (query.min) {
      filters.price.$gte = query.min; // min fiyat
    }
    if (query.max) {
      filters.price.$lte = query.max; // max fiyat
    }
  }
  if (query.search) {
    filters.title = { $regex: query.search, $options: "i" }; // arama terimi
  }

  // fonksiyonun çağrıldığı yerde nesneyi döndür
  return filters;
};

// GİGLERİ AL
export const getAllGigs = async (req, res, next) => {
  const filters = buildFilter(req.query);
  try {
    // (1) tüm hizmetleri veritabanından al
    const gigs = await Gig.find(filters).populate({
      path: "user",
      select: "username photo",
    });

    // (2) eğer hizmet yoksa hata gönder
    if (gigs.length === 0) return next(error(404, "No Gigs Found"));

    // (3) hizmetleri cliente gönder
    res.status(200).json({
      message: "success getAllGigs ✅",
      gigs: gigs,
    });
  } catch (err) {
    return next(error(500, err.message));
  }
};

// GİG AL
export const getGig = async (req, res, next) => {
  try {
    // (1) url-e param olarak eklenen id den yola çıkarak himeti al
    const gig = await Gig.findById(req.params.id).populate("user");

    res.status(200).json({
      message: "success getGig ✅",
      gig,
    });
  } catch (err) {
    return next(error(500, err.message));
  }
};

// GİG OLUŞTUR
export const createGig = async (req, res, next) => {
  if (!req.isSeller)
    return next(error(423, "Only Seller Account can create GIG"));

  try {
    let imageUrl = "";

    // (1) Eğer kullanıcı bir dosya yolladıysa Cloudinary'e yükle
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "fiverrClone/gigs", // klasör tercihin
        },
        async (error, result) => {
          if (error) return next(error(400, error.message));

          // (2) Cloudinary'den gelen görsel URL’si
          imageUrl = result.secure_url;

          // (3) gig oluştur
          const savedGig = await Gig.create({
            ...req.body,
            user: req.userId,
            cover: imageUrl, // modelin cover alanı varsa
          });

          res.status(200).json({
            message: "success createGig ✅",
            gig: savedGig,
          });
        }
      );

      // (4) Multer'den gelen buffer'ı yazdır
      uploadResult.end(req.file.buffer);
    } else {
      // (5) Dosya yoksa varsayılan şekilde gig oluştur
      const savedGig = await Gig.create({
        ...req.body,
        user: req.userId,
      });

      res.status(200).json({
        message: "success createGig ✅ (no image)",
        gig: savedGig,
      });
    }
  } catch (err) {
    next(error(400, err.message));
  }
};

// GİG SİL
export const deleteGig = async (req, res, next) => {
  try {
    // (1) silinecek hizmeti veritabanından al
    const gig = await Gig.findById(req.params.id);
    // (2) hizmeti oluşturanla silmek isteyen kişi aynı değilse hata gönder
    if (gig.user != req.userId) {
      return next(error(403, "You can only delete your own gigs"));
    }
    // (3) hizmeti veritabanından sil
    await Gig.findByIdAndDelete(req.params.id);
    // (4) silme işlemi başarılıysa cliente cevap gönder
    res.status(200).json({
      message: "success deleteGig ✅",
    });
  } catch (err) {
    return next(error(500, err.message));
  }
};
