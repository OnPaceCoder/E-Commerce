import React, { useState } from 'react'
import { HiMenu } from "react-icons/hi";
import { RiShoppingCartFill } from 'react-icons/ri'
import { BiSolidShoppingBags } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa'
import SearchBox from './SearchBox';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice'
import { toast } from 'react-toastify'
const Header = () => {
    const [open, setOpen] = useState(false);

    const { userInfo } = useSelector((state) => state.auth)


    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [logoutApi] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApi().unwrap()
            dispatch(logout())
            toast.success("Successfully logged out")
            navigate('/')
        }
        catch (err) {
            toast.error(`${err?.data?.error}` || `${err.error}`)
        }
    }









    return (

        <>

            <div className='w-full'>
                <div className='max-w-[1240px] flex justify-between mx-auto items-center px-5 py-3 relative md:border-b-2  '>
                    <div className='flex items-center justify-evenly  cursor-pointer' onClick={() => navigate("/")}>
                        <BiSolidShoppingBags size={30} />
                        <h1 className='text-2xl font-bold hover:cursor-pointer px-2' >ShopOn</h1>

                    </div>
                    <div className='md:flex hidden items-center gap-5'>
                        <SearchBox />
                        <div className='flex text-lg items-center   gap-2'>
                            <RiShoppingCartFill size={20} />
                            <span>Cart</span>
                        </div>

                        {
                            !userInfo && (
                                <div className='flex text-lg items-center gap-2 cursor-pointer' onClick={() => navigate("/login")}>
                                    <FaUser size={20} />
                                    <span >SignIn</span>
                                </div>
                            )
                        }

                        {
                            userInfo && (
                                <div className='flex text-lg items-center gap-2 cursor-pointer' onClick={() => { navigate("/login"); logoutHandler(); }}>
                                    <FaUser size={20} />
                                    <span >Logout</span>
                                </div>

                            )
                        }

                    </div>

                    <div className='md:hidden '>
                        <HiMenu size={25} onClick={() => setOpen(!open)} />
                        {open ? <div className='absolute left-0 top-16 ease-in-out duration-500 h-[100vh] w-full bg-white mx-0 px-5'>
                            <div className='gap-5 flex flex-col'>
                                <SearchBox />
                                <div className='flex text-lg items-center   gap-2'>
                                    <RiShoppingCartFill size={20} />
                                    <span>Cart</span>
                                </div>
                                {
                                    !userInfo && (
                                        <div className='flex text-lg items-center gap-2' onClick={() => { navigate("/login"); setOpen(!open) }}>
                                            <FaUser size={20} />
                                            <span>SignIn</span>
                                        </div>
                                    )
                                }
                                {
                                    userInfo && (
                                        <div className='flex text-lg items-center gap-2' onClick={() => { navigate("/"); setOpen(!open); logoutHandler() }}>
                                            <FaUser size={20} />
                                            <span>Logout</span>
                                        </div>

                                    )
                                }


                            </div>
                        </div>
                            :
                            <div className='absolute top-16 left-[-100%] ease-in-out duration-500 h-[100vh] w-[35vh] mx-0 px-5'>
                                <div className=' gap-5 flex flex-col '>
                                    <form action="" className='flex gap-4'>
                                        <input className='bg-gra-200 px-4 py-2 border-gray-400 border rounded-md' type="text" placeholder='Search Products..' />
                                        <button className='px-4 py-1 bg-slate-200 rounded-lg text-lg'>Search</button>
                                    </form>
                                    <div className='flex text-lg items-centergap-2'>
                                        <RiShoppingCartFill size={20} />
                                        <span>Cart</span>
                                    </div>

                                    <div className='flex text-lg items-center gap-2'>
                                        <FaUser size={20} />
                                        <span>SignIn</span>
                                    </div>
                                </div>
                            </div>

                        }

                    </div>


                </div>

            </div>
        </>

    )
}

export default Header