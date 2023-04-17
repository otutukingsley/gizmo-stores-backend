import express from "express";
import Product from "../models/productsModel.js";
import cloudinary from "../utils/cloudinary.js"
const router = express.Router();

router.post("/:id", async (req, res) => {
  const { imgUrl } = req.body;
  const product = await Product.findByIdAndUpdate(req.params.id);
  console.log(req.body)

  if (product && imgUrl) {
    const imgSrc = await cloudinary.uploader.upload(`${imgUrl}`, { public_id: "gizmo_preset" })
    res.json(imgSrc);
  } else {
    res.status(404);
    throw new Error("Invalid image format");
  }

});

export default router;
