import * as Yup from 'yup';
import Product from '../models/Product.js';

class ProductController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      description: Yup.string(),
      brand: Yup.string().required(),

      old_price: Yup.number(),
      price: Yup.number().required(),
      offer_price: Yup.number(),

      installments: Yup.number(),
      product_condition: Yup.string(),

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

      old_price,
      price,
      offer_price,

      installments,
      product_condition,

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

      old_price,
      price,
      offer_price,

      installments,
      product_condition,

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

  async update(request, response) {
    const schema = Yup.object({
      old_price: Yup.number(),
      price: Yup.number(),
      offer_price: Yup.number(),
      stock: Yup.number(),
    });

    try {
      await schema.validate(request.body, {
        abortEarly: false,
      });
    } catch (err) {
      return response.status(400).json({
        error: err.errors,
      });
    }

    const { id } = request.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return response.status(404).json({
        error: 'Produto não encontrado',
      });
    }

    await product.update(request.body);

    return response.json({message: "Produto atualizado com sucesso", product});
  }

  async delete(request, response) {
    const {id} = request.params

    const product = await Product.findByPk(id)

    if(!product) {
      return response.status(404).json({error: 'Produto não encontrado'})
    }

    await product.destroy()

    return response.status(200).json({message: "Produto excluído com sucesso"})
  }
}

export default new ProductController();
