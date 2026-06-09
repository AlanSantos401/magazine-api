import slugify from 'slugify';
import * as Yup from 'yup';

import Category from '../models/Category.js';
import Subcategory from '../models/Subcategory.js';

class SubcategoryController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      parent_id: Yup.number().required(),
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

    const { name, parent_id } = request.body;

    const categoryExists = await Category.findByPk(parent_id);

    if (!categoryExists) {
      return response.status(400).json({
        error: 'Categoria não encontrada',
      });
    }

    const subcategoryExists = await Subcategory.findOne({
      where: {
        name,
        parent_id,
      },
    });

    if (subcategoryExists) {
      return response.status(400).json({
        error: 'Subcategoria já existe',
      });
    }

    const subcategory = await Subcategory.create({
      name,
      parent_id,
      slug: slugify(name, {
        lower: true,
      }),
    });

    return response.status(201).json(subcategory);
  }

  async index(_request, response) {
    const subcategories = await Subcategory.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    });

    return response.json(subcategories);
  }

  async delete(request, response) {
  const { id } = request.params;

  const subcategory = await Subcategory.findByPk(id);

  if (!subcategory) {
    return response.status(404).json({
      error: 'Subcategoria não encontrada',
    });
  }

  await subcategory.destroy();

  return response.status(200).json({
    message: 'Subcategoria removida com sucesso',
  });
}
}

export default new SubcategoryController();