import { Request, Response, Router } from "express";
import ProductService from "../service/products.service";
import { permissionMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/",
  permissionMiddleware(["ADM", "COLAB"]),
  async (req: Request, res: Response) => {
    const products = await ProductService.getAll();

    if (!products) {
      return res
        .status(404)
        .send({ message: "Não foi encontrado produtos cadastrados!" });
    }
    res.status(200).send(products);
  }
);
router.get(
  "/:id",
  permissionMiddleware(["ADM", "COLAB"]),
  async (req: Request, res: Response) => {
    const product = await ProductService.getByID(req.params.id);
    if (!product) {
      return res.status(404).send({ message: "Produto não encontrado!" });
    }
    res.status(200).send(product);
  }
);

router.post(
  "/search",
  permissionMiddleware(["ADM", "COLAB"]),
  async (req: Request, res: Response) => {
    console.log(req.headers);
    const allProducts = await ProductService.getAll();
    const products = allProducts.filter((product) =>
      product.name.toLowerCase().includes(req.body.name.toLowerCase())
    );
    res.send(products);
  }
);
router.post(
  "/",
  permissionMiddleware(["ADM", "COLAB"]),
  async (req: Request, res: Response) => {
    try {
      await ProductService.create(req.body);
      res.status(201).send({ message: "Produto cadastrado com sucesso!" });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }
);
router.put(
  "/:id",
  permissionMiddleware(["ADM", "COLAB"]),
  async (req: Request, res: Response) => {
    try {
      const product = await ProductService.getByID(req.params.id);
      if (!product) {
        return res.status(404).send({ message: "Produto não entrado!" });
      }
      await ProductService.updateUser(req.params.id, req.body);
      res.status(200).send({ message: "Produto atualizado com sucesso!" });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }
);
router.delete(
  "/:id",
  permissionMiddleware(["ADM"]),
  async (req: Request, res: Response) => {
    try {
      const product = await ProductService.getByID(req.params.id);
      if (!product) {
        return res.status(404).send({ message: "Produto não entrado!" });
      }
      await ProductService.deleteUser(req.params.id);
      res.status(200).send({ message: "Produto excluído com sucesso!" });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }
);

export default router;
