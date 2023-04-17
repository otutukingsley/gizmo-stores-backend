import express from "express";
import Product from "../models/productsModel.js";
import cloudinary from "../utils/cloudinary.js";

const router = express.Router();

router.post("/:id", async (req, res) => {
  const { src } = req.body;
  const product = await Product.findByIdAndUpdate(req.params.id);

  if (product && src) {
    const res = await cloudinary.uploader.upload(src, {
      public_id: "gizmo_preset",
    });
    res.json(res);
  } else {
    res.status(404);
    throw new Error("Invalid image format");
  }
});

export default router;
