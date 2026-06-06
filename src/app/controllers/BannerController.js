import Banner from '../models/Banner.js';

class BannerController {
  async store(request, response) {
    const { filename: path } = request.file;

    const totalActiveBanners = await Banner.count({
      where: {
        active: true,
      },
    });

    if (totalActiveBanners >= 6) {
      return response.status(400).json({
        error: 'O limite máximo é de 6 banners ativos.',
      });
    }

    const banner = await Banner.create({
      path,
      active: true,
    });

    return response.status(201).json(banner);
  }

  async index(_request, response) {
    const banners = await Banner.findAll();

    return response.json(banners);
  }

  async toggle(request, response) {
  const { id } = request.params;

  const banner = await Banner.findByPk(id);

  if (!banner) {
    return response.status(404).json({
      error: 'Banner não encontrado',
    });
  }

  const totalActiveBanners = await Banner.count({
    where: {
      active: true,
    },
  });

  if (banner.active && totalActiveBanners <= 3) {
    return response.status(400).json({
      error: 'É necessário manter pelo menos 3 banners ativos.',
    });
  }

  if (!banner.active && totalActiveBanners >= 6) {
    return response.status(400).json({
      error: 'O limite máximo é de 6 banners ativos.',
    });
  }

  banner.active = !banner.active;

  await banner.save();

  return response.json(banner);
}

  async delete(request, response) {
    const { id } = request.params;

    const banner = await Banner.findByPk(id);

    if (!banner) {
      return response.status(404).json({
        error: 'Banner não encontrado',
      });
    }

    const totalActiveBanners = await Banner.count({
      where: {
        active: true,
      },
    });

    if (banner.active && totalActiveBanners <= 3) {
      return response.status(400).json({
        error: 'É necessário manter pelo menos 3 banners ativos.',
      });
    }

    await banner.destroy();

    return response.status(200).json({
      message: 'Banner excluído com sucesso.',
    });
  }
}

export default new BannerController();
