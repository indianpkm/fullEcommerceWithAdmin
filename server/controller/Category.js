import CategoryModel from '../model/CategoryModel.js';


export const fetchCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find({}).exec();
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json(err);
  }
};

export  const createCategory = async (req, res) => {
  const category = new CategoryModel(req.body);
  try {
    const doc = await category.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};



