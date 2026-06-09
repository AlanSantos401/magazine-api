import * as Yup from 'yup';
import Product from '../models/Product.js';
import ProductVariation from '../models/ProductVariation.js';

class ProductVariationController {
  async store(request, response) {
    const schema = Yup.object({
      product_id: Yup.number().required(),
      sku: Yup.string().required(),
      color: Yup.string(),
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

    const { product_id, sku, color, price, offer_price, stock } =
      request.body;

    // verifica produto
    const product = await Product.findByPk(product_id);

    if (!product) {
      return response.status(404).json({
        error: 'Produto não encontrado',
      });
    }

    // verifica SKU duplicado
    const skuExists = await ProductVariation.findOne({
      where: { sku },
    });

    if (skuExists) {
      return response.status(400).json({
        error: 'SKU já cadastrado',
      });
    }

    const variation = await ProductVariation.create({
      product_id,
      sku,
      color,
      price,
      offer_price,
      stock,
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
      order: [['created_at', 'DESC']],
    });

    return response.status(200).json(variations);
  }

  async update(request, response) {
    const schema = Yup.object({
      sku: Yup.string(),
      color: Yup.string(),
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

    const { sku, color, price, offer_price, stock } = request.body;

    // valida SKU duplicado (exceto ele mesmo)
    if (sku) {
      const skuExists = await ProductVariation.findOne({
        where: { sku },
      });

      if (skuExists && skuExists.id !== variation.id) {
        return response.status(400).json({
          error: 'SKU já cadastrado',
        });
      }
    }

    await variation.update({
      sku,
      color,
      price,
      offer_price,
      stock,
    });

    await variation.reload();

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
