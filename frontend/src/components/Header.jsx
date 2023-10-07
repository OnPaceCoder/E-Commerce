import React, { useState } from 'react'
import { HiMenu } from "react-icons/hi";
import { RiShoppingCartFill } from 'react-icons/ri'
import { BiSolidShoppingBags } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa'
import SearchBox from './SearchBox';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice'
import { toast } from 'react-toastify'
import { resetCart } from '../slices/cartSlice';
import { Dropdown } from 'react-bootstrap';
const Header = () => {
    const [open, setOpen] = useState(false);

    const { userInfo } = useSelector((state) => state.auth)


    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [logoutApi] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApi().unwrap()
            dispatch(resetCart())
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

            <div className='w-full mb-3'>
                <div className='max-w-[1240px] flex justify-between mx-auto items-center px-5 py-3 relative md:border-b-2  '>
                    <div className='flex items-center justify-evenly  cursor-pointer' onClick={() => navigate("/")}>
                        <BiSolidShoppingBags size={30} />
                        <h1 className='text-2xl font-bold hover:cursor-pointer px-2' >ShopOn</h1>

                    </div>
                    <div className='md:flex hidden items-center gap-3'>
                        <SearchBox />
                        <div className='flex text-lg items-center '>
                            <RiShoppingCartFill size={20} />
                            <Link to={'/cart'}><span>Cart</span> </Link>
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
                                <Dropdown>
                                    <Dropdown.Toggle variant="primary" id="dropdown-basic" className='bg-slate-400'>
                                        {userInfo.name}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => { navigate("/profile"); }} >Profile</Dropdown.Item>
                                        {userInfo.isAdmin &&
                                            <>
                                                <Dropdown.Item onClick={() => { navigate("/admin/userlist"); }}>User List</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { navigate("/admin/productlist"); }}>Product List</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { navigate("/admin/orderlist"); }}>Order List</Dropdown.Item>

                                            </>}
                                        <Dropdown.Item as='div' onClick={() => { navigate("/login"); logoutHandler(); }} >Logout</Dropdown.Item>

                                    </Dropdown.Menu>
                                </Dropdown>


                            )
                        }

                    </div>

                    <div className='md:hidden '>
                        <HiMenu size={25} onClick={() => setOpen(!open)} />
                        {open ? <div className='absolute left-0 top-16 ease-in-out duration-500 h-[100vh] w-full bg-white mx-0 px-5 z-10'>
                            <div className='gap-4 flex flex-col'>
                                <SearchBox />
                                <div className='flex text-lg items-center   gap-2'>
                                    <RiShoppingCartFill size={20} />
                                    <Link to={'/cart'}><span>Cart</span> </Link>
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
                                        <Dropdown>
                                            <Dropdown.Toggle variant="primary" id="dropdown-basic" className='bg-slate-400'>
                                                {userInfo.name}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => { navigate("/profile"); }} >Profile</Dropdown.Item>
                                                {userInfo.isAdmin &&
                                                    <>
                                                        <Dropdown.Item onClick={() => { navigate("/admin/userlist"); }}>User List</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => { navigate("/admin/productlist"); }}>Product List</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => { navigate("/admin/orderlist"); }}>Order List</Dropdown.Item>

                                                    </>}
                                                <Dropdown.Item as='div' onClick={() => { navigate("/login"); logoutHandler(); }} >Logout</Dropdown.Item>

                                            </Dropdown.Menu>
                                        </Dropdown>


                                    )
                                }


                            </div>
                        </div>
                            :
                            <div className='absolute top-16 left-[-100%] ease-in-out duration-500 h-[100vh] w-[35vh] mx-0 px-5 z-10'>
                                <div className=' gap-4 flex flex-col '>
                                    <form action="" className='flex gap-4'>
                                        <input className='bg-gra-200 px-4 py-2 border-gray-400 border rounded-md' type="text" placeholder='Search Products..' />
                                        <button className='px-4 py-1 bg-slate-200 rounded-lg text-lg'>Search</button>
                                    </form>
                                    <div className='flex text-lg items-centergap-2'>
                                        <RiShoppingCartFill size={20} />
                                        <Link to={'/cart'}><span>Cart</span> </Link>
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
                                            <Dropdown>
                                                <Dropdown.Toggle variant="primary" id="dropdown-basic" className='bg-slate-400'>
                                                    {userInfo.name}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => { navigate("/profile"); }} >Profile</Dropdown.Item>
                                                    {userInfo.isAdmin &&
                                                        <>
                                                            <Dropdown.Item onClick={() => { navigate("/admin/userlist"); }}>User List</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => { navigate("/admin/productlist"); }}>Product List</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => { navigate("/admin/orderlist"); }}>Order List</Dropdown.Item>

                                                        </>}
                                                    <Dropdown.Item as='div' onClick={() => { navigate("/login"); logoutHandler(); }} >Logout</Dropdown.Item>

                                                </Dropdown.Menu>
                                            </Dropdown>


                                        )
                                    }
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