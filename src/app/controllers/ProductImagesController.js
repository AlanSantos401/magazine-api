import * as Yup from 'yup';
import ProductImages from '../models/ProductImages.js';
import ProductVariation from '../models/ProductVariation.js';

class ProductImagesController {
  async store(request, response) {
    const schema = Yup.object({
      variation_id: Yup.number().required(),
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

    const { variation_id } = request.body;
    const files = request.files;

    // ✔️ valida produto
    const variation = await ProductVariation.findByPk(variation_id);

    if (!variation) {
      return response.status(404).json({
        error: 'Variação não encontrada',
      });
    }

    // ✔️ valida arquivos
    if (!files || files.length < 2 || files.length > 4) {
      return response.status(400).json({
        error: 'O produto deve ter entre 2 e 4 imagens',
      });
    }

    const createdImages = [];
for (const [index, file] of files.entries()) {
  console.log({
    variation_id,
    path: file.filename,
    position: index + 1,
  });

  const image = await ProductImages.create({
    variation_id,
    path: file.filename,
    position: index + 1,
    is_main: index === 0,
  });

  createdImages.push(image);
}

    return response.status(201).json(createdImages);
  }

  async index(_request, response) {
    const images = await ProductImages.findAll({
      include: [
        {
          association: 'variation',
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
