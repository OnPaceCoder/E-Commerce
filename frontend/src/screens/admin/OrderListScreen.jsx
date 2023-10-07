import React, { useEffect } from 'react'
import { useGetOrdersQuery } from '../../slices/orderApiSlice'
import { Button, Table } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';

const OrderListScreen = () => {
    const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();


    useEffect(() => {
        refetch()
    }, [orders])

    return (
        <>
            <h1>Orders</h1>
            {isLoading ? (<Loader />) : error ? (<Message variant='danger'>
                {error?.data?.message || error.error}
            </Message>) :
                (
                    <Table striped bordered hover reponsive className='table-auto'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>USER</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user && order.user.name}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>{order.isPaid ? (
                                        order.paidAt.substring(0, 10)
                                    ) : (
                                        <FaTimes style={{ color: 'red' }} />
                                    )}
                                    </td>
                                    <td>
                                        {order.isDelivered ? (
                                            <FaCheck style={{ color: 'green' }} />
                                        ) : (
                                            <FaTimes style={{ color: 'red' }} />
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button variant='light ' className='btn-sm bg-slate-400'>
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )

            }
        </>
    )
    return (
        <div>OrderListScreen</div>
    )
}

export default OrderListScreen