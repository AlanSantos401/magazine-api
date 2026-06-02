import * as Yup from 'yup';
import Product from '../models/Product.js';

class ProductController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      description: Yup.string(),
      brand: Yup.string().required(),
      price: Yup.number().required(),
      offer_price: Yup.number(),
      stock: Yup.number().required(),
      featured: Yup.boolean(),
      warranty: Yup.number(),
      category_id: Yup.number().required(),
    });

    try {
      schema.validateSync(request.body, {
        abortEarly: false,
      });
    } catch (err) {
      return response.status(400).json({
        error: err.errors,
      });
    }

    const {
      name,
      description,
      brand,
      price,
      offer_price,
      stock,
      featured,
      warranty,
      category_id,
    } = request.body;

    const filename = request.file?.filename || null;

    const newProduct = await Product.create({
      name,
      description,
      brand,
      price,
      offer_price,
      stock,
      featured,
      warranty,
      category_id,
      path: filename,
    });

    return response.status(201).json(newProduct);
  }

  async index(_request, response) {
    const products = await Product.findAll();

    return response.status(200).json(products);
  }
}

export default new ProductController();
