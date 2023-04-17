import express from "express";
import Product from "../models/productsModel.js";
import cloudinary from "../utils/cloudinary.js"
const router = express.Router();

router.post("/:id", async (req, res) => {
  const { imgUrl } = req.body;
  const product = await Product.findByIdAndUpdate(req.params.id);

  if (product && imgUrl) {
    const imgUrl = await cloudinary.uploader.upload(`${imgSrc}`, { public_id: "gizmo_preset" })
    res.json(imgUrl);
  } else {
    res.status(404);
    throw new Error("Invalid image format");
  }

});

export default router;
