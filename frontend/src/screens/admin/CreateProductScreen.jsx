import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
    useCreateProductMutation,
} from '../../slices/productsApiSlice';
import upload from '../../utils/upload';

const CreateProductScreen = () => {
    const { id: productId } = useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState();
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [singleFile, setSingleFile] = useState(undefined);


    const [createProduct, { isLoading: loadingCreateProduct }] = useCreateProductMutation()


    const navigate = useNavigate();
    const createProductHandler = async (e) => {
        e.preventDefault()
        if (window.confirm('Are you sure you want to creat a new Product?')) {
            try {
                const res = await upload(singleFile)
                setImage((prev) => res)
                await createProduct({
                    name,
                    image: res || image,
                    brand,
                    category,
                    description,
                    countInStock,
                    price
                });
                toast.success("Product created");
                navigate('/admin/productlist')
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }

    }
    return (

        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Create Product</h1>
                {loadingCreateProduct ? (
                    <Loader />
                ) : (
                    <Form onSubmit={createProductHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image url'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                            <Form.Control
                                label='Choose File'
                                onChange={(e) => setSingleFile(e.target.files[0])}
                                type='file'
                            ></Form.Control>

                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter brand'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter countInStock'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button
                            type='submit'
                            variant='primary'
                            style={{ marginTop: '1rem' }}
                            className='bg-slate-400'

                        >
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default CreateProductScreen