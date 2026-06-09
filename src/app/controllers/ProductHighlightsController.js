import * as Yup from 'yup';
import Product from '../models/Product.js';
import ProductHighlights from '../models/ProductHighlights.js';

class ProductHighlightsController {
  async store(request, response) {
    const schema = Yup.object({
      product_id: Yup.number().required(),
      highlights: Yup.array()
        .of(
          Yup.object({
            title: Yup.string().required(),
          }),
        )
        .min(1)
        .max(5)
        .required(),
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

    const { product_id, highlights } = request.body;

    const product = await Product.findByPk(product_id);

    if (!product) {
      return response.status(404).json({
        error: 'Produto não encontrado',
      });
    }

    // regra: máximo 5 destaques
    if (highlights.length > 5) {
      return response.status(400).json({
        error: 'Máximo de 5 destaques permitidos',
      });
    }

    const createdHighlights = [];

    for (let i = 0; i < highlights.length; i++) {
      const highlight = await ProductHighlights.create({
        product_id,
        title: highlights[i].title,
        position: i + 1,
      });

      createdHighlights.push(highlight);
    }

    return response.status(201).json(createdHighlights);
  }

  async index(_request, response) {
    const highlights = await ProductHighlights.findAll({
      include: [
        {
          association: 'product',
        },
      ],
      order: [['position', 'ASC']],
    });

    return response.status(200).json(highlights);
  }

  async delete(request, response) {
    const { id } = request.params;

    const highlight = await ProductHighlights.findByPk(id);

    if (!highlight) {
      return response.status(404).json({
        error: 'Destaque não encontrado',
      });
    }

    await highlight.destroy();

    return response.status(200).json({
      message: 'Destaque removido com sucesso',
    });
  }
}

export default new ProductHighlightsController();