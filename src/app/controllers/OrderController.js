import * as Yup from 'yup';
import Product from '../models/Product.js';
import ProductVariation from '../models/ProductVariation.js';

class OrderController {
  async store(request, response) {
    const schema = Yup.object({
      products: Yup.array()
        .required()
        .of(
          Yup.object({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
          }),
        ),
    });

    try {
      schema.validateSync(request.body, {
        abortEarly: false,
        strict: true,
      });
    } catch (err) {
      return response.status(400).json({
        error: err.errors,
      });
    }

    const { userId, userName } = request;
    const { products } = request.body;

    const variationIds = products.map((product) => product.id);

    const findedVariations = await ProductVariation.findAll({
      where: {
        id: variationIds,
      },
      include: [
        {
          model: Product,
          as: 'product',
          attributes: ['name'],
        },
      ],
    });

    const formatedProducts = findedVariations.map((product) => {
      const quantity = products.find((p) => p.id === product.id).quantity;

      const newProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        url: product.url,
        categoy: product.product.name,
        quantity: quantity,
      };

      return newProduct;
    });

    const order = {
      user: {
        id: userId,
        name: userName,
      },
      products: formatedProducts,
      status: "Pedido realizado"
    };

    return response.status(201).json(order);
  }
}

export default new OrderController();
