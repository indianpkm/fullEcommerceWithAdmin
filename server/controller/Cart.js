import CartModel from "../model/CartModel.js";


export const addToCart = async (req, res) => {
  // const {id} = req.user;
  const cart = new CartModel(req.body);
  try {
    const doc = await cart.save();
    const result = await doc.populate('product');
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const fetchCartByUser = async (req, res) => {
  const { user } = req.query;
  try {
    const cartItems = await CartModel.find({ user: user }).populate('product');
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(400).json(err);
  }
};


export const deleteFromCart = async (req, res) => {
    const { id } = req.params;
    try {
    const doc = await CartModel.findByIdAndDelete(id);
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const updateCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await CartModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const result = await cart.populate('product');

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};
