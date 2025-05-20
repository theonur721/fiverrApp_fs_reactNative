import { model, Schema } from "mongoose";

const gigSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    desc: {
      type: String,
      required: [true, "Description is required"],
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    starCount: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    cover: {
      type: String,
      required: [true, "Cover image is required"],
    },
    images: {
      type: [String],
    },
    shortTitle: {
      type: String,
      required: [true, "Short title is required"],
    },
    shortDes: {
      type: String,
      required: [true, "Short description is required"],
    },
    deliveryTime: {
      type: Number,
      required: [true, "Delivery time is required"],
    },
    revisionNumber: {
      type: Number,
      required: [true, "Revision number is required"],
    },
    features: {
      type: [String],
    },
    sales: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default model("Gig", gigSchema);
