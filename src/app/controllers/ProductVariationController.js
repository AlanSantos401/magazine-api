import * as Yup from 'yup';
import Product from '../models/Product.js';
import ProductVariation from '../models/ProductVariation.js';

class ProductVariationController {
  async store(request, response) {
    const schema = Yup.object({
      product_id: Yup.number().required(),

      sku: Yup.string().required(),
      color: Yup.string(),

      old_price: Yup.number(),
      price: Yup.number().required(),
      offer_price: Yup.number(),

      stock: Yup.number().required(),
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

    const { product_id, sku, color, old_price, price, offer_price, stock } =
      request.body;

    const product = await Product.findByPk(product_id);

    if (!product) {
      return response.status(404).json({
        error: 'Produto não encontrado',
      });
    }

    const skuExists = await ProductVariation.findOne({
      where: { sku },
    });

    if (skuExists) {
      return response.status(400).json({
        error: 'SKU já cadastrado',
      });
    }

    const filename = request.file?.filename || null;

    const variation = await ProductVariation.create({
      product_id,
      sku,
      color,
      old_price,
      price,
      offer_price,
      stock,
      path: filename,
    });

    return response.status(201).json(variation);
  }

  async index(_request, response) {
    const variations = await ProductVariation.findAll({
      include: [
        {
          association: 'product',
        },
      ],
    });

    return response.status(200).json(variations);
  }

  async update(request, response) {
    const schema = Yup.object({
      sku: Yup.string(),
      color: Yup.string(),

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

    const variation = await ProductVariation.findByPk(id);

    if (!variation) {
      return response.status(404).json({
        error: 'Variação não encontrada',
      });
    }

    const filename = request.file?.filename;

    if (filename) {
      request.body.path = filename;
    }

    await variation.update(request.body);

    return response.json({
      message: 'Variação atualizada com sucesso',
      variation,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    const variation = await ProductVariation.findByPk(id);

    if (!variation) {
      return response.status(404).json({
        error: 'Variação não encontrada',
      });
    }

    await variation.destroy();

    return response.status(200).json({
      message: 'Variação excluída com sucesso',
    });
  }
}

export default new ProductVariationController();
