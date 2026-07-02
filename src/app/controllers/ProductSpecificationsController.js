import * as Yup from 'yup';
import Product from '../models/Product.js';
import ProductSpecifications from '../models/ProductSpecifications.js';

class ProductSpecificationsController {
  async store(request, response) {
    const schema = Yup.object({
      product_id: Yup.number().required(),
      specifications: Yup.array()
        .of(
          Yup.object({
            key: Yup.string().required(),
            value: Yup.string().required(),
          }),
        )
        .min(5)
        .max(20)
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

    const { product_id, specifications } = request.body;

    const product = await Product.findByPk(product_id);

    if (!product) {
      return response.status(404).json({
        error: 'Produto não encontrado',
      });
    }

    // regra extra de segurança
    if (specifications.length < 5 || specifications.length > 20) {
      return response.status(400).json({
        error: 'As especificações devem ter entre 5 e 20 itens',
      });
    }

    const createdSpecs = [];

    for (const spec of specifications) {
      const newSpec = await ProductSpecifications.create({
        product_id,
        key: spec.key,
        value: spec.value,
      });

      createdSpecs.push(newSpec);
    }

    return response.status(201).json(createdSpecs);
  }

  async index(_request, response) {
    const specs = await ProductSpecifications.findAll({
      include: [
        {
          association: 'product',
        },
      ],
      order: [['created_at', 'ASC']],
    });

    return response.status(200).json(specs);
  }

  async delete(request, response) {
    const { id } = request.params;

    const spec = await ProductSpecifications.findByPk(id);

    if (!spec) {
      return response.status(404).json({
        error: 'Especificação não encontrada',
      });
    }

    await spec.destroy();

    return response.status(200).json({
      message: 'Especificação removida com sucesso',
    });
  }
}

export default new ProductSpecificationsController();