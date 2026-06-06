import Sequelize, { Model } from 'sequelize';

class Banner extends Model {
  static init(sequelize) {
    super.init(
      {
        path: Sequelize.STRING,
        active: Sequelize.BOOLEAN,
         url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3001/banner-file/${this.path}`;
          },
        },
      },
      {
        sequelize,
        tableName: 'banners',
        underscored: true,
      },
    );

    return this;
  }
}

export default Banner;