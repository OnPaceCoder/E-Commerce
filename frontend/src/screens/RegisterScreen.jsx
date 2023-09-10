import React, { useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify'
const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');

        } else {
            try {

                const res = await register({ name, email, password }).unwrap()
                dispatch(setCredentials({ ...res }))
                toast.success("User Registered Succesfully")
                navigate('/')
            }
            catch (err) {
                toast.error(`${err?.data?.error}` || `${err.error}`)

            }
        }


    }


    return (

        <FormContainer >
            <div className='border rounded-md px-8 py-5'>

                <h1 className='my-4 text-3xl font-bold'>Register</h1>
                <form action="" onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    {/* Name */}
                    <div className='flex flex-col gap-4'>
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='border px-2 py-2 rounded-md'
                        />
                    </div>
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
                    {/*Confirm Password */}
                    <div className='flex flex-col gap-4'>
                        <label htmlFor="">Confirm Password</label>
                        <input type="password" placeholder='Confirm password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className='border px-2 py-2 rounded-md'
                        />
                    </div>

                    <div>
                        <button type='submit' className='px-4 py-2 border rounded-lg bg-slate-200 hover:bg-slate-400 duration-150 ease-in-out'>Sign In</button>
                    </div>

                </form>

                <p className='py-4 text-sm'>Already have an account? <Link className='underline hover:cursor-pointer' to={"/login"}>SignIn</Link></p>
            </div>
        </FormContainer>
    )
}

export default RegisterScreen