import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { Button, Form } from 'react-bootstrap';
const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart);

    const { shippingAddress } = cart;
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');

    }



    return (
        <FormContainer>
            <div className='flex justify-center items-center'>

                <CheckoutSteps step1 step2 />
            </div>
            <h1 className='text-2xl font-semibold'> Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type='text' placeholder='Enter address' value={address} required onChange={(e) => setAddress(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type='text' placeholder='Enter city' value={city} required onChange={(e) => setCity(e.target.value)}>
                    </Form.Control>
                </Form.Group>


                <Form.Group className='my-2' controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type='text' placeholder='Enter postal code' value={postalCode} required onChange={(e) => setPostalCode(e.target.value)}>
                    </Form.Control>
                </Form.Group>


                <Form.Group className='my-2' controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control type='text' placeholder='Enter country' value={country} required onChange={(e) => setCountry(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='bg-slate-400'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen