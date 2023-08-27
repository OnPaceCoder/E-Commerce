import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../slices/usersApiSlice';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/authSlice';



const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    // Getting url params to redirect **
    const { search } = useLocation()
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    // useEffect(() => {
    //     if (userInfo) {
    //         navigate(redirect);
    //     }
    // }, [navigate, redirect, userInfo])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const res = await login({ email, password }).unwrap()
            dispatch(setCredentials({ ...res }))
            toast.success("Login Successfull")
            navigate('/')
        }
        catch (err) {
            toast.error(`${err?.data?.error}` || `${err.error}`)

        }
    }



    return (

        <FormContainer >
            <div className='border rounded-md px-8 py-5'>

                <h1 className='my-4 text-3xl font-bold'>Sign In</h1>
                <form action="" onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    {/* Email */}
                    <div className='flex flex-col gap-4'>
                        <label htmlFor="">Email Address</label>
                        <input type="email" placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='border px-2 py-2 rounded-md'
                        />
                    </div>
                    {/* Password */}
                    <div className='flex flex-col gap-4'>
                        <label htmlFor="">Password</label>
                        <input type="password" placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='border px-2 py-2 rounded-md'
                        />
                    </div>

                    <div>
                        <button type='submit' className='px-4 py-2 border rounded-lg bg-slate-200 hover:bg-slate-400 duration-150 ease-in-out'>Sign In</button>
                    </div>

                </form>

                <p className='py-4 text-sm'>New Customer ? <Link className='underline hover:cursor-pointer' to={"/register"}>Register</Link></p>
            </div>
        </FormContainer>

    )
}

export default LoginScreen