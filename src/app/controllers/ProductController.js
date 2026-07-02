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
      product_type: Yup.string().required(),
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
      product_type,
      product_condition,
      featured,
    } = request.body;

    const newProduct = await Product.create({
      category_id,
      name,
      description,
      brand,
      product_type,
      product_condition,
      featured,
    });

    return response.status(201).json(newProduct);
  }

  async index(_request, response) {
    try {
      const products = await Product.findAll({
        include: [
          // 🔥 SubCategory do produto
          {
            association: 'subcategory',
            attributes: ['id', 'name', 'slug', 'parent_id'],
            include: [
              // 🔥 Category da subcategoria
              {
                association: 'category',
                attributes: ['id', 'name'],
              },
            ],
          },

          // 🔥 Variações do produto
          {
            association: 'variations',
            include: [
              {
                association: 'images',
              },
            ],
          },

          // 🔥 Destaques
          {
            association: 'product_highlights',
          },

          // 🔥 Especificações
          {
            association: 'product_specifications',
            separate: true,
            order: [['id', 'ASC']],
          },
        ],
      });

      return response.status(200).json(products);
    } catch (error) {
      return response.status(500).json({
        error: error.message,
        parent: error.parent?.message,
      });
    }
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

    await ProductVariation.destroy({
      where: { product_id: id },
    });

    await ProductImages.destroy({
      where: { product_id: id },
    });

    await ProductHighlights.destroy({
      where: { product_id: id },
    });

    await ProductSpecifications.destroy({
      where: { product_id: id },
    });

    await product.destroy();

    return response.status(200).json({
      message: 'Produto excluído com sucesso',
    });
  }
}

export default new ProductController();
