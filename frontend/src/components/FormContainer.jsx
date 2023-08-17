import React from 'react'

const FormContainer = ({ children }) => {
    return (
        <div className='w-full '>

            <div className='max-w-xl  flex flex-col   mx-auto  px-4 '>

                {children}
            </div>
        </div>
    )
}

export default FormContainer