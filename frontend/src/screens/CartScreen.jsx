import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap';
import { addToCart, removeFromCart } from '../slices/cartSlice'
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap"
import Message from '../components/Message';
import { FaTrash } from 'react-icons/fa'
const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    }

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {
        navigate('/shipping');
    }


    return (
        <Row className='my-2'>
            <Col md={8}>
                <h1 className='mb-6 text-2xl font-semibold'>
                    Shopping Cart
                </h1>
                {cartItems.length === 0 ? (
                    <Message>
                        Your cart is empty <Link to={'/'}>Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item._id}>


                                <Row>
                                    <Col md={1}>
                                        <Image src={item.image} fluid rounded />
                                    </Col>
                                    <Col md={2}>
                                        <Link to={`/product/${item._id}`}>
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control as='select' value={item.qty} onChange={(e) => addToCartHandler(item, Number(e.target.value))}>
                                            {
                                                [...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type='button' variant='light' onClick={() => removeFromCartHandler(item._id)}>

                                            <FaTrash />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))
                        }

                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2 className='text-2xl '>
                                SubTotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                            </h2>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className='bg-slate-400 cursor-pointer' type='button' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen