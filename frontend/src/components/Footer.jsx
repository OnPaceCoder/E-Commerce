import React from 'react'

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <>
            <div className='w-full'>

                <div className='max-w-[1240px] flex mx-auto'>
                    <p>ShopOn &copy; {currentYear}</p>
                </div>

            </div>

        </>
    )
}

export default Footer