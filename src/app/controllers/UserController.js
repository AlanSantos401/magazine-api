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
      admin: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { name, email, password, admin } = request.body;

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
      password_hash,
      admin,
      email_code,
      email_confirmed: false,
    });

    return response.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
    });
  }
}

export default new UserController();
