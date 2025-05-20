import error from "../utils/error.js";
import Gig from "../models/gigmodel.js";

export const getAllGigs = (req, res, next) => {
  res.status(200).json({
    message: "success getAllGigs ✅",
  });
};

export const getGig = (req, res, next) => {
  res.status(200).json({
    message: "success getGig ✅",
  });
};

export const createGig = async (req, res, next) => {
  // (1) isteği atan kullanıcının hesabı seller değilse hata gönder
  if (!req.isSeller)
    return next(error(423, "Only Seller Account use Create GİG"));

  try {
    // (2) yeni hizmet oluştur
    const savedGig = await Gig.create({ ...req.body, user: req.userId });

    // (2) cliente cevap gönder

    res.status(200).json({
      message: "success createGig ✅",
      gig: savedGig,
    });
  } catch (err) {
    next(error(400, err.message));
  }
};

export const deleteGig = (req, res, next) => {
  res.status(200).json({
    message: "success deleteGig ✅",
  });
};
