import React from 'react'
import { ImSpinner11 } from 'react-icons/im'
const Loader = () => {
    return (
        <>
            <div className='flex justify-center'>

                {
                    <ImSpinner11 className='spinner' />
                }
            </div>
        </>
    )
}

export default Loader