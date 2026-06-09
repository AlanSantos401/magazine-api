import Banner from '../models/Banner.js';

class BannerController {
  async store(request, response) {
    const { filename: path } = request.file;
    const { theme } = request.body;

    if (!theme || !['light', 'dark'].includes(theme)) {
      return response.status(400).json({
        error: 'Theme deve ser light ou dark',
      });
    }

    const totalActiveBanners = await Banner.count({
      where: {
        theme,
        active: true,
      },
    });

    if (totalActiveBanners >= 6) {
      return response.status(400).json({
        error: `O limite máximo é de 6 banners ativos no tema ${theme}`,
      });
    }

    const banner = await Banner.create({
      path,
      active: true,
      theme,
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
        theme,
      },
    });

    if (banner.active) {
      if (totalActiveBanners <= 3) {
        return response.status(400).json({
          error: `É necessário manter pelo menos 3 banners ativos ${theme}`,
        });
      }
      banner.active = false;
      await banner.save();

      return response.json(banner);
    }

    if (totalActiveBanners >= 6) {
      return response.status(400).json({
        error: `O limite máximo é de 6 banners ativos ${theme}`,
      });
    }

    banner.active = true;

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
