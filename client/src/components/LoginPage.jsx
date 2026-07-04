import React from 'react'

const LoginPage = () => {
    return (
        <div className='w-screen min-h-screen bg-gray-950 flex items-center justify-center'>
            <div className='w-[90vw] lg:w-1/4 bg-gray-600/20 text-center rounded-2xl'>
                <div className='w-full bg-blue-500/40 py-10 rounded-t-2xl flex items-center flex-col gap-4'>
                    <span className='bg-gray-100/40 p-3 rounded-2xl font-bold text-2xl'>ILA</span>
                    <div>
                        <h2 className='font-semibold text-2xl -mb-1'>ILA's tuition</h2>
                        <p className='text-sm text-zinc-300 tracking-tight'>Bhavnagar, Gujarat</p>
                    </div>
                </div>

                <div className='w-full flex items-center justify-center gap-4 mb-5 mt-10'>
                    <div className='flex items-center justify-center gap-3 px-10 py-3 ring-2 ring-gray-600 rounded-2xl text-md font-semibold cursor-pointer hover:bg-gray-500/10 transition-all duration-300'>
                        <i className='bx bx-user'></i>
                        <p>Student / Parent</p>
                    </div>
                    <div className='flex items-center justify-center gap-3 px-10 py-3 ring-2 ring-gray-600 rounded-2xl text-md font-semibold cursor-pointer hover:bg-gray-500/10 transition-all duration-300'>
                        <i className='bx bx-whiteboard'></i>
                        <p>Teacher Login</p>
                    </div>
                </div>

                <div className='w-full my-10 px-8'>
                    <form className='w-full flex items-center flex-col justify-center gap-6'>
                        <div className='flex items-start justify-start flex-col w-full px-3'>
                            <label className='text-sm text-gray-100' htmlFor="name">Student ID or Mobile</label>
                            <input type="text" id='name' name='name' placeholder='e.g. ILA-2024-047' className='ring ring-gray-400/70 w-full px-3 py-2 rounded-md bg-gray-500/30 text-md mt-2' />
                        </div>

                        <div className='flex items-start justify-start flex-col w-full px-3'>
                            <label className='text-sm text-gray-100' htmlFor="password">Password</label>
                            <input type="password" id='password' name='password' placeholder='Enter password' className='ring ring-gray-400/70 w-full px-3 py-2 rounded-md bg-gray-500/30 text-md mt-2 accent-white ' />
                        </div>

                        <button className='font-semibold w-1/2 ring ring-gray-400/40 py-3 rounded-lg hover:bg-zinc-700/30 cursor-pointer'>Login</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default LoginPage
