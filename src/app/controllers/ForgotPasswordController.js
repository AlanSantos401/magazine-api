import crypto from 'crypto';

import User from '../models/User.js';

class ForgotPasswordController {
  async store(request, response) {
    const { email } = request.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return response.status(200).json({
        message: 'Se o email existir, enviaremos instruções',
      });
    }

    const token = crypto.randomBytes(20).toString('hex');

    const now = new Date();

    now.setMinutes(now.getMinutes() + 5);

    user.password_reset_token = token;
    user.password_reset_expires = now;

    await user.save();

    return response.json({
      token,
    });
  }
}

export default new ForgotPasswordController();
