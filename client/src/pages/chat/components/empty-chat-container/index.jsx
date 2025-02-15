import { animationDefaultOptions } from '@/lib/utils'
import React from 'react'
import Lottie from 'react-lottie'

function EmptyContainer() {
    return (
        <div className='hidden md:flex flex-1 h-screen md:bg-[#121212] md:flex-col justify-center items-center border border-r-1 border-white duration-1000'>
            <h1 className="font-bold text-center text-7xl p-2 pt-4"><span className="text-9xl font-extrabold text-red-900">C</span>ONVO<span className="text-9xl text-red-900">N</span>EST</h1>
            <span className='text-4xl font-semibold'>..MAKE YOUR CHAT EXPERIENCE SMOOTH..</span>
        </div>
    )
}

export default EmptyContainer
