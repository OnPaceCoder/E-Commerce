import React from 'react'
import '../index.css'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';

const HomeScreen = () => {

    const { pageNumber, keyword } = useParams();
    const { data, isLoading, error } = useGetProductsQuery({
        keyword, pageNumber
    })

    return (
        < div >
            {!keyword ? (<ProductCarousel />) : (<Link to="/" ><button className='px-3 py-2 bg-light rounded my-2'>Go Back</button></Link>)
            }

            {
                isLoading ? (<Loader />) : error ? (toast.error(`Error: ${error?.data?.message || error.error}`, { position: toast.POSITION.TOP_RIGHT })) :
                    (<>

                        <h1>Latest Products</h1>
                        <Row>
                            {data.products.map((product) => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>


                    </>)
            }


            <Paginate
                pages={data?.pages}
                page={data?.page}
                keyword={keyword ? keyword : ''}
            />

        </div >
    )
}

export default HomeScreen