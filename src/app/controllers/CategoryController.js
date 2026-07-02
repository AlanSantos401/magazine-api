import slugify from 'slugify';
import * as Yup from 'yup';
import Category from '../models/Category.js';
import Product from '../models/Product.js';

class CategoryController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
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

    const { name } = request.body;

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

 async show(request, response) {
  const { slug } = request.params;

  const category = await Category.findOne({
    where: { slug },
    include: [
      { association: 'subcategories' },
    ],
  });

  return response.json({ category });
}

async products(request, response) {
  const { slug } = request.params;

  const category = await Category.findOne({
    where: { slug },
    include: [
      { association: 'subcategories' },
    ],
  });

  const subcategoryIds = category.subcategories.map(
  (s) => s.id
);

const products = await Product.findAll({
  where: {
    category_id: subcategoryIds,
  },

  include: [
    // 🔥 subcategory + category pai
    {
      association: "subcategory",
      attributes: ["id", "name", "slug", "parent_id"],
      include: [
        {
          association: "category",
          attributes: ["id", "name"],
        },
      ],
    },

    // 🔥 VARIAÇÕES + IMAGENS
    {
      association: "variations",
      include: [
        {
          association: "images",
        },
      ],
    },

    // 🔥 DESTAQUES
    {
      association: "product_highlights",
    },

    // 🔥 ESPECIFICAÇÕES
    {
      association: "product_specifications",
      separate: true,
      order: [["id", "ASC"]],
    },
  ],
});

return response.json({ products });
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
