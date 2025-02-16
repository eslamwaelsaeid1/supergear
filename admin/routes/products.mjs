import { Router } from "express";
import { products } from "../constants/index.mjs";

const router = Router();

router.get("/products", (req, res) => {
  res.send(products);
});

router.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id); // req.params.id بيكون نص (string) تلقائيًا، // el ID = number lazem n7wlo l string
  const product = products.find((item) => item._id === productId); //بيرجع أول عنصر بس يطابق الشرط

  if (!productId) {
    return res.status(404).json({ message: "Single Phone was not found" });
  }
  res.send(product);
});

export default router;
