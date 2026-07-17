// components/Loader.jsx
import React from 'react'

const Loader = ({ text = "Loading...", size = "text-3xl", className = "" }) => {
    return (
        <div className={`flex flex-col items-center justify-center gap-3 w-full py-16 ${className}`}>
            <i className={`bx bx-loader-alt bx-spin ${size} text-blue-400`}></i>
            {text && <p className='text-sm text-gray-400'>{text}</p>}
        </div>
    )
}

export default Loader