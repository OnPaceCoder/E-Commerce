import Order from "../models/order.model";
import Product from "../models/product.model";
import { calcPrices } from "../utils/calcPrices";

import { verifyPayPalPayment, checkIfNewTransaction } from "../utils/paypal";

//@desc   Create new order
//@route  POST  /api/orders
//@access Private

const addOrderItems = async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (orderItems && orderItems.lenght === 0) {
        res.status(400);
        throw new Error("No order items");
    }
    else {

        //Retrieve ordered items from database.
        const itemsFromDB = await Product.find({
            _id: { $in: orderItems.map((x) => x._id) }
        })

        //Mapping over items from client and from database to retrieve price from db and by client
        //in case client manipulate the price we retireve price of product from db
        const dbOverItems = orderItems.map((itemFromClient) => {
            const matchingItemFromDB = itemsFromDB.find((itemFoundDB) => {
                itemFoundDB._id.toString() === itemFromClient._id
            });
            return {
                ...itemFromClient,
                product: itemFromClient._id,
                price: matchingItemFromDB.price,
                _id: undefined
            }
        })

        //calculate prices
        const { itemsPrice, taxPrice, shippingPrice, totalPrice } = calcPrices(dbOverItems);

        const order = new Order({
            orderItems: dbOverItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })


        const createdOrder = await order.save();

        res.status(201).json(createdOrder)

    }

}




//@desc   Get orders of logged in user
//route   GET  /api/orders/myorder
//@access Private


const getMyOrders = async (req, res) => {
    const order = await Order.find({ user: req.user._id });

    res.status(200).json(order);

}


//@desc   Get order by ID
//@route  GET  /api/orders/:id
//@access Private

const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (order) {
        res.status(200).json(order)
    }
    else {
        res.status(404);
        throw new Error('Order not found')
    }
}


//@desc   Update order to paid
//@route  GET  /api/orders/:id/pay
//@access Private
const updateOrderToPaid = async (req, res) => {
    const { verified, value } = await verifyPayPalPayment(req.body.id)
    if (!verified) {
        throw new Error('Payment not verified');
    }
    // check if this transaction has been used before
    const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
    if (!isNewTransaction) {
        throw new Error('Transaction has been used before');
    }
    const order = await Order.findById(req.params.id);

    if (order) {
        const paidCorrectAmount = order.totalPrice.toString() === value;
        if (!paidCorrectAmount) throw new Error('Incorrect amount paid');
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        }
        const updatedOrder = await order.save();

        res.json(updatedOrder);
    }
    else {
        res.status(404);
        throw new Error('Order not found')
    }


}


//@desc    Update order to delivered 
//@route   GET  /api/orders/:id/deliver
//@access  Private/Admin

const updateOrderToDelivered = async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();

        res.json(updatedOrder);

    } else {
        res.status(404);
        throw new Error('Order not found');
    }



}

//@desc   Get all orders
//@route  GET /api/orders
//@access Private/Admin

const getOrders = async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.status(200).json(orders);
}


export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
}