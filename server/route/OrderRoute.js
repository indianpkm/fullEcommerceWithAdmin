import express from 'express'
import { createOrder, deleteOrder, fetchAllOrders, fetchOrdersByUser, updateOrder } from '../controller/Order.js';

const router = express.Router();
//  /orders is already added in base path
router.post('/', createOrder)
      .get('/user/:userId', fetchOrdersByUser)
      .delete('/:id', deleteOrder)
      .patch('/:id', updateOrder)
      .get('/',fetchAllOrders)


export default router;
