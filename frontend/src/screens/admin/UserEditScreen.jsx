import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Button, Form } from 'react-bootstrap';

const UserEditScreen = () => {
    const { id: userId } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);


    const {
        data: user,
        isLoading,
        refetch,
        error,
    } = useGetUserDetailsQuery(userId)

    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateUser({ userId, name, email, isAdmin });
            toast.success('User updated successfully')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);


        }
    }, [user])

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3 bg-slate-200'>
                Go Back
            </Link>
            <div className='h-[69vh]'>
                <h1>Edit User</h1>
                <FormContainer>
                    {loadingUpdate && <Loader />}
                    {isLoading ? (<Loader />) : error ? (<Message variant='danger'>
                        {error?.data.message || error.error}
                    </Message>) : (

                        <Form onSubmit={submitHandler}>
                            <Form.Group className='my-2' controlId='name'>
                                <Form.Label>
                                    Name
                                </Form.Label>
                                <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}>

                                </Form.Control>
                            </Form.Group>

                            <Form.Group className='my-2' controlId='email'>
                                <Form.Label>
                                    Email
                                </Form.Label>
                                <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}>

                                </Form.Control>
                            </Form.Group>

                            <Form.Group className='my-2' controlId='isadmin'>
                                <Form.Check
                                    type='checkbox'
                                    label="Is Admin"
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}

                                >
                                </Form.Check>
                            </Form.Group>

                            <Button type='submit' variant='primary' className='bg-slate-400'>
                                Update
                            </Button>
                        </Form>



                    )}
                </FormContainer>

            </div>
        </>
    )
}

export default UserEditScreen