import * as Yup from 'yup';
import Product from '../models/Product.js';
import ProductImages from '../models/ProductImages.js';

class ProductImagesController {
  async store(request, response) {
    const schema = Yup.object({
      product_id: Yup.number().required(),
      images: Yup.array()
        .of(
          Yup.object({
            path: Yup.string().required(),
          }),
        )
        .min(2)
        .max(4)
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

    const { product_id, images } = request.body;

    const product = await Product.findByPk(product_id);

    if (!product) {
      return response.status(404).json({
        error: 'Produto não encontrado',
      });
    }

    // regra: máximo 4 imagens
    if (images.length < 2 || images.length > 4) {
      return response.status(400).json({
        error: 'O produto deve ter entre 2 e 4 imagens',
      });
    }

    const createdImages = [];

    for (let i = 0; i < images.length; i++) {
      const image = await ProductImages.create({
        product_id,
        path: images[i].path,
        position: i + 1,
        is_main: i === 0, // primeira é principal
      });

      createdImages.push(image);
    }

    return response.status(201).json(createdImages);
  }

  async index(_request, response) {
    const images = await ProductImages.findAll({
      include: [
        {
          association: 'product',
        },
      ],
      order: [['position', 'ASC']],
    });

    return response.status(200).json(images);
  }

  async delete(request, response) {
    const { id } = request.params;

    const image = await ProductImages.findByPk(id);

    if (!image) {
      return response.status(404).json({
        error: 'Imagem não encontrada',
      });
    }

    await image.destroy();

    return response.status(200).json({
      message: 'Imagem deletada com sucesso',
    });
  }
}

export default new ProductImagesController();