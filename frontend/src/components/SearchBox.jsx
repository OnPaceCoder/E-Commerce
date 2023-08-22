import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const SearchBox = () => {

    const navigate = useNavigate();
    const { keyword: urlKeyword } = useParams();

    const [keyword, setKeyword] = useState(urlKeyword || '');

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword) {
            navigate(`/search/${keyword.trim()}`);
            setKeyword('')
        } else {
            navigate('/')
        }
    }



    return (
        <div>
            <form action="" className='flex gap-4' onSubmit={submitHandler}>
                <input className='bg-gra-200 px-4 py-2 border-gray-400 border rounded-md' type="text" placeholder='Search Products..' onChange={(e) => setKeyword(e.target.value)} />
                <button className='px-4 py-1 bg-slate-200 rounded-lg text-lg'>Search</button>
            </form>
        </div>
    )
}

export default SearchBox