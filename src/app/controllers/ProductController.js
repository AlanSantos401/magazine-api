import * as Yup from 'yup';
import Product from '../models/Product.js';

class ProductController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      description: Yup.string(),
      brand: Yup.string().required(),

      installments: Yup.number(),
      product_condition: Yup.string(),

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

      installments,
      product_condition,

      featured,
      warranty,
      category_id,
    } = request.body;

    const newProduct = await Product.create({
      name,
      description,
      brand,

      installments,
      product_condition,

      featured,
      warranty,
      category_id,
    });

    return response.status(201).json(newProduct);
  }

  async index(_request, response) {
    const products = await Product.findAll({
      include: [
        {
          association: 'variations',
        },
        {
          association: 'category',
        },
      ],
    });

    return response.status(200).json(products);
  }

  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string(),
      description: Yup.string(),
      brand: Yup.string(),

      installments: Yup.number(),
      product_condition: Yup.string(),

      featured: Yup.boolean(),
      warranty: Yup.number(),
      category_id: Yup.number(),
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

    return response.json({
      message: 'Produto atualizado com sucesso',
      product,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return response.status(404).json({ error: 'Produto não encontrado' });
    }

    await product.destroy();

    return response
      .status(200)
      .json({ message: 'Produto excluído com sucesso' });
  }
}

export default new ProductController();
