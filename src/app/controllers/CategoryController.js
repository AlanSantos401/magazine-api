import slugify from 'slugify';
import * as Yup from 'yup';
import Category from '../models/Category.js';

class CategoryController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      parent_id: Yup.number().nullable(),
       path: Yup.string().nullable(),
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

    const categoryExists = await Category.findOne({
      where: {
        name,
      },
    });

    if (categoryExists) {
      return response.status(400).json({
        error: 'Categoria já existe',
      });
    }

    const newCategory = await Category.create({
      name,
      parent_id,
      slug: slugify(name, {
        lower: true,
      }),
    });

    return response.status(201).json(newCategory);
  }

  async index(_request, response) {
    const categories = await Category.findAll();

    return response.status(200).json(categories);
  }

  async updateImage(request, response) {
  const { id } = request.params;

  const category = await Category.findByPk(id);

  if (!category) {
    return response.status(404).json({ error: 'Categoria não encontrada' });
  }

  category.path = request.file.filename;

  await category.save();

  return response.json(category);
}

}

export default new CategoryController();
