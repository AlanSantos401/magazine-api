import * as Yup from 'yup';
import Address from '../models/Address.js';

class AddressController {
  async store(request, response) {
    const schema = Yup.object({
      nickname: Yup.string().required(),
      cep: Yup.string()
        .matches(/^\d{8}$/, 'CEP inválido')
        .required(),
      address: Yup.string().required(),
      number: Yup.string().required(),
      neighborhood: Yup.string().required(),
      complement: Yup.string(),
      reference_point: Yup.string(),
      city: Yup.string().required(),
      state: Yup.string().length(2).required(),
      is_default: Yup.boolean(),
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

    const count = await Address.count({
      where: {
        user_id: request.userId,
      },
    });

    if (count >= 3) {
      return response.status(400).json({
        error: 'Você pode cadastrar no máximo 3 endereços',
      });
    }

    if (request.body.is_default) {
      await Address.update(
        { is_default: false },
        {
          where: {
            user_id: request.userId,
          },
        },
      );
    }

    const address = await Address.create({
      ...request.body,
      user_id: request.userId,
    });

    return response.status(201).json({
      message: 'Endereço cadastrado com sucesso',
      address: {
        id: address.id,
        nickname: address.nickname,
        cep: address.cep,
        address: address.address,
        number: address.number,
        neighborhood: address.neighborhood,
        complement: address.complement,
        reference_point: address.reference_point,
        city: address.city,
        state: address.state,
        is_default: address.is_default,
      },
    });
  }

  async index(request, response) {
    const addresses = await Address.findAll({
      where: {
        user_id: request.userId,
      },
      attributes: [
        'id',
        'nickname',
        'cep',
        'address',
        'number',
        'neighborhood',
        'complement',
        'reference_point',
        'city',
        'state',
        'is_default',
      ],
    });

    return response.json(addresses);
  }

  async update(request, response) {
    const { id } = request.params;

    const address = await Address.findOne({
      where: {
        id,
        user_id: request.userId,
      },
    });

    if (!address) {
      return response.status(404).json({
        error: 'Endereço não encontrado',
      });
    }

    if (request.body.is_default) {
      await Address.update(
        { is_default: false },
        {
          where: {
            user_id: request.userId,
          },
        },
      );
    }

    await address.update(request.body);

    return response.json({
      message: 'Endereço atualizado com sucesso',
      address: {
        id: address.id,
        nickname: address.nickname,
        cep: address.cep,
        address: address.address,
        number: address.number,
        neighborhood: address.neighborhood,
        complement: address.complement,
        reference_point: address.reference_point,
        city: address.city,
        state: address.state,
        is_default: address.is_default,
      },
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    const address = await Address.findOne({
      where: {
        id,
        user_id: request.userId,
      },
    });

    if (!address) {
      return response.status(404).json({
        error: 'Endereço não encontrado',
      });
    }

    await address.destroy();

    return response.json({
      message: 'Endereço excluído com sucesso',
    });
  }
}

export default new AddressController();
