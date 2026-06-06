import mongoose from 'mongoose';

const OrderShema = new mongoose.Schema(
  {
    user: {
      id: {
        type: String,
        require: true,
      },
      name: {
        type: String,
        require: true,
      },
    },

    products: [
      {
        id: {
          type: Number,
          require: true,
        },
        name: {
          type: String,
          require: true,
        },
        price: {
          type: String,
          require: true,
        },
        category: {
          type: String,
          require: true,
        },
        qantity: {
          type: Number,
          require: true,
        },
        url: {
          type: String,
          require: true,
        },
      },
    ],
    status: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Order', OrderShema)