import React from 'react'

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <>
            <div className='w-full absolute bottom-0 py-5'>

                <div className='max-w-[1240px] mx-auto flex justify-center'>
                    <p>ShopOn &copy; {currentYear}</p>
                </div>

            </div>

        </>
    )
}

export default Footer