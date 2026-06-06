import Sequelize, { Model } from 'sequelize';

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        nickname: Sequelize.STRING,
        cep: Sequelize.STRING,
        address: Sequelize.STRING,
        number: Sequelize.STRING,
        neighborhood: Sequelize.STRING,
        complement: Sequelize.STRING,
        reference_point: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        is_default: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'addresses',
        underscored: true,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }
}

export default Address;