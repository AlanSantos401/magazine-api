import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        admin: Sequelize.BOOLEAN,
        email_code: Sequelize.STRING,
        email_confirmed: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        password_reset_token: Sequelize.STRING,
        password_reset_expires: Sequelize.DATE,
      },
      {
        sequelize,
        tableName: 'users',
      },
    );
  }
}

export default User;
