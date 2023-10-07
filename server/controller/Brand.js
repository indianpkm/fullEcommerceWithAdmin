import BrandModel from "../model/BrandModel.js";

export const fetchBrands = async (req, res) => {
  try {
    const brands = await BrandModel.find({}).exec();
    res.status(200).json(brands);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const createBrand = async (req, res) => {
  const brand = new BrandModel(req.body);
  try {
    const doc = await brand.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};
