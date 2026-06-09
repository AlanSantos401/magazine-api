import * as Yup from 'yup';
import Product from '../models/Product.js';

class ProductController {
  async store(request, response) {
    const schema = Yup.object({
      category_id: Yup.number().required(),
      name: Yup.string().required(),
      description: Yup.string(),
      brand: Yup.string().required(),
      product_condition: Yup.string(),
      featured: Yup.boolean(),
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

    const {
      category_id,
      name,
      description,
      brand,
      product_condition,
      featured,
    } = request.body;

    const newProduct = await Product.create({
      category_id,
      name,
      description,
      brand,
      product_condition,
      featured,
    });

    return response.status(201).json(newProduct);
  }

  async index(_request, response) {
    const products = await Product.findAll({
      include: [
        {
          association: 'category',
        },
        {
          association: 'variations',
        },
        {
          association: 'product_images',
        },
        {
          association: 'product_highlights',
        },
        {
          association: 'product_specifications',
        },
      ],
    });

    return response.status(200).json(products);
  }

  async update(request, response) {
    const schema = Yup.object({
      category_id: Yup.number(),
      name: Yup.string(),
      description: Yup.string(),
      brand: Yup.string(),
      product_condition: Yup.string(),
      featured: Yup.boolean(),
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

    const {
      category_id,
      name,
      description,
      brand,
      product_condition,
      featured,
    } = request.body;

    await product.update({
      category_id,
      name,
      description,
      brand,
      product_condition,
      featured,
    });

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
