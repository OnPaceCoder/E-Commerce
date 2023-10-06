import React from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
    useDeleteUserMutation,
    useGetUsersQuery
} from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';



const UserListScreen = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery();

    const [deleteUser] = useDeleteUserMutation();


    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure')) {
            try {
                await deleteUser(id);
                refetch()
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }
    return (
        <>
            <h1>Users</h1>
            {isLoading ? (<Loader />) : error ? (<Message variant='danger'> {error?.data?.message || error.error}</Message>) : (
                <div className='h-[77vh]'>


                    <Table striped bordered hover reponsive className='table-auto'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th>EDIT/DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                    <td>{user.isAdmin ? (
                                        <FaCheck style={{ color: 'green' }} />
                                    ) : (
                                        <FaTimes style={{ color: 'red' }} />
                                    )}
                                    </td>
                                    <td>
                                        {!user.isAdmin && (
                                            <>
                                                <LinkContainer to={`/admin/user/${user._id}/edit`} >
                                                    <Button variant='light' className='btn-sm'>
                                                        <FaEdit />
                                                    </Button>

                                                </LinkContainer>
                                                <Button variant='danger' className='btn-sm bg-red-300 ml-3' onClick={() => deleteHandler(user._id)}>
                                                    <FaTrash style={{ color: 'white' }} />
                                                </Button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </>
    )
}

export default UserListScreen