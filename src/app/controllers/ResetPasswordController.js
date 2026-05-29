import bcrypt from 'bcrypt';

import User from '../models/User.js';

class ResetPasswordController {
  async update(request, response) {
    const { token, password } = request.body;

    const user = await User.findOne({
      where: {
        password_reset_token: token,
      },
    });

    if (!user) {
      return response.status(400).json({
        error: 'Token inválido',
      });
    }

    if (new Date() > user.password_reset_expires) {
      return response.status(400).json({
        error: 'Token expirado',
      });
    }

    const password_hash = await bcrypt.hash(password, 10);

    user.password_hash = password_hash;

    user.password_reset_token = null;
    user.password_reset_expires = null;

    await user.save();

    return response.json({
      message: 'Senha alterada com sucesso',
    });
  }
}

export default new ResetPasswordController();
