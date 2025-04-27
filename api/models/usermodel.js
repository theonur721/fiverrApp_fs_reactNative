import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a username"],
      unique: [true, "Bu isimle kullanıcı mmevcut lütfen farklı isim deneyin"],
    },

    email: {
      type: String,
      required: [true, "Please enter"],
      unique: [true, "Bu email zaten kullanımda başka email deneyin"],
    },

    password: {
      type: String,
      required: [true, "Please enter a password"],
    },

    photo: {
      type: String,
      default: "https://picsum/photos/200",
    },

    country: {
      type: String,
      required: [true, "Please enter a country"],
    },

    phone: {
      type: Number,
    },

    desc: {
      type: String,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
  },
  //ayarlar
  //timestemps sayesinde oluşan bellgelere otomatik createdAt & updatedAt eklenir
  { timestamps: true }
);

export default model("user", userSchema);
