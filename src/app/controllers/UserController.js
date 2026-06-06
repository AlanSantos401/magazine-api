import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import * as Yup from 'yup';

import User from '../models/User.js';

class UserController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string()
        .matches(/^[A-Za-zÀ-ÿ\s]+$/)
        .required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      phone: Yup.string()
        .required()
        .min(10)
        .max(11)
        .matches(/^\d+$/, 'Telefone inválido'),
      gender: Yup.string().oneOf([
        'male',
        'female',
        'other',
        'prefer_not_to_say',
      ]),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { name, email, password, phone, gender } = request.body;

    const existingUser = await User.findOne({
      where: {
        email,
      },
    });

    const password_hash = await bcrypt.hash(password, 10);

    if (existingUser) {
      return response
        .status(400)
        .json({ message: 'Este e-mail já está cadastrado!' });
    }

    const email_code = v4();

    const user = await User.create({
      id: v4(),
      name,
      email,
      phone,
      gender,
      password_hash,
      email_code,
      email_confirmed: false,
    });

    return response.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
    });
  }

  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string().matches(/^[A-Za-zÀ-ÿ\s]+$/),

      phone: Yup.string().min(10).max(11).matches(/^\d+$/, 'Telefone inválido'),

      gender: Yup.string().oneOf([
        'male',
        'female',
        'other',
        'prefer_not_to_say',
      ]),
    });

    try {
      await schema.validate(request.body, {
        abortEarly: false,
      });
    } catch (err) {
      return response.status(400).json({
        error: err.errors,
      });
    }

    const user = await User.findByPk(request.userId);

    if (!user) {
      return response.status(404).json({
        error: 'Usuário não encontrado',
      });
    }

    const {
      email,
      admin,
      password_hash,
      email_code,
      email_confirmed,
      password_reset_token,
      password_reset_expires,
      ...data
    } = request.body;

    await user.update(data);

    return response.status(200).json({
      message: 'Perfil atualizado com sucesso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
      },
    });
  }

  async delete(request, response) {
    const user = await User.findByPk(request.userId);

    if (!user) {
      return response.status(404).json({
        error: 'Usuário não encontrado',
      });
    }

    await user.destroy();

    return response.status(200).json({
      message: 'Conta excluída com sucesso',
    });
  }
}

export default new UserController();
