import OrderModel from "../model/OrderModel.js";
import ProductModel from "../model/ProductModel.js";
import UserModel from "../model/UserModel.js";


export const fetchOrdersByUser = async (req, res) => {
    const { userId } = req.params;
    try {
      const orders = await OrderModel.find({ user: userId });
  
      res.status(200).json(orders);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
  export const createOrder = async (req, res) => {
    const order = new OrderModel(req.body);

    try {
      const doc = await order.save();
             
      res.status(201).json(doc);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
  export const deleteOrder = async (req, res) => {
      const { id } = req.params;
      try {
      const order = await OrderModel.findByIdAndDelete(id);
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
  export const updateOrder = async (req, res) => {
    const { id } = req.params;
    try {
      const order = await OrderModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  export const fetchAllOrders = async (req, res) => {
    // sort = {_sort:"price",_order="desc"}
    // pagination = {_page:1,_limit=10}
    let query = OrderModel.find({deleted:{$ne:true}});
    let totalOrdersQuery = OrderModel.find({deleted:{$ne:true}});
  
    
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }
  
    const totalDocs = await totalOrdersQuery.count().exec();
  
    if (req.query._page && req.query._limit) {
      const pageSize = req.query._limit;
      const page = req.query._page;
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }
  
    try {
      const docs = await query.exec();
      res.set('X-Total-Count', totalDocs);
      res.status(200).json(docs);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  