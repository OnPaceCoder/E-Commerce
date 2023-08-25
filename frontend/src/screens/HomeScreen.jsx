import React from 'react'
import '../index.css'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

const HomeScreen = () => {

    const { pageNumber, keyword } = useParams();
    const { data, isLoading, error } = useGetProductsQuery({
        keyword, pageNumber
    })

    return (
        <div>
            {!keyword ? (<>Produce</>) : (<Link to="/" ><button className='px-3 py-2 bg-slate-500 rounded mx-2'>Go Back</button></Link>)}

            {isLoading ? (<Loader />) : error ? (toast.error(`Error: ${error?.data?.message || error.error}`, { position: toast.POSITION.TOP_RIGHT })) :
                (<>
                    <div className='container'>
                        <h1>Latest Products</h1>
                        {data.products.map((product) => {
                            // console.log(product)
                        })}
                    </div>

                </>)}



        </div>
    )
}

export default HomeScreen