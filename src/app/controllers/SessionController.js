import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import authConfig from '../../config/auth.js';
import User from '../models/User.js';

class SessionController {
  async store(request, response) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    const isValid = await schema.isValid(request.body, {
      abortEarly: false,
      strict: true,
    });

    const emailOrPasswordIncorrect = () => {
      return response.status(400).json({
        error: 'Email ou senha incorreta!',
      });
    };

    if (!isValid) {
      return emailOrPasswordIncorrect();
    }

    const { email, password } = request.body;

    const existingUser = await User.findOne({
      where: {
        email,
      },
    });

    if (!existingUser) {
      return emailOrPasswordIncorrect();
    }

    if (!existingUser.email_confirmed) {
      return response.status(401).json({
        error: 'Confirme seu email antes de fazer login',
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password_hash,
    );

    if (!isPasswordCorrect) {
      return emailOrPasswordIncorrect();
    }

    const token = jwt.sign(
      { id: existingUser.id, admin: existingUser.admin },
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn,
      },
    );

    return response.status(200).json({
      user: {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        phone: existingUser.phone,
        gender: existingUser.gender,
        admin: existingUser.admin,
      },
      token,
    });
  }
}

export default new SessionController();
