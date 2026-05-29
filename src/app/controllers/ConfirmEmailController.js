import User from '../models/User.js';

class ConfirmEmailController {
  async update(request, response) {
    const { code } = request.query;

    const user = await User.findOne({
      where: {
        email_code: code,
      },
    });

    if (!user) {
      return response.status(400).json({ error: 'Código inválido' });
    }

    user.email_confirmed = true;
    user.email_code = null;

    await user.save();

    return response.json({ message: 'Email confirmado com sucesso' });
  }
}

export default new ConfirmEmailController();
