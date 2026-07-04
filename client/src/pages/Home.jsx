import React from 'react'
import { assets, iconList } from '../assets/assets'

const Home = () => {
    return (
        <>
            <div className='grid grid-cols-2 gap-5 text-center my-10 px-5'>
                <div className='bg-zinc-800 rounded-2xl py-5'>
                    <span className='text-3xl text-blue-400 font-semibold'>85%</span>
                    <p className='text-sm'>Attendence</p>
                </div>
                <div className='bg-zinc-800 rounded-2xl py-5'>
                    <span className='text-3xl text-blue-400 font-semibold'>78%</span>
                    <p className='text-sm'>Average Score</p>
                </div>
                <div className='bg-zinc-800 rounded-2xl py-5'>
                    <span className='text-3xl text-blue-400 font-semibold'>3</span>
                    <p className='text-sm'>Pending Homework</p>
                </div>
                <div className='bg-zinc-800 rounded-2xl py-5'>
                    <span className='text-3xl text-blue-400 font-semibold'>₹500</span>
                    <p className='text-sm'>Fees due</p>
                </div>
            </div>

            <div className='mx-5 ring ring-gray-200/50 rounded-lg flex items-start justify-start flex-col px-5 py-8'>
                <div className='flex items-center gap-2'>
                    <i className='bx bx-announcement text-2xl'></i>
                    <p>Latest notices</p>
                </div>

                <div className='bg-zinc-800 rounded-2xl py-5 px-4 w-full border-l-8 mt-5 border-blue-400'>
                    <span className='text-sm text-gray-200/60'>10 jun - 2026</span>
                    <h2 className='text-xl font-bold'>Unit Test - Maths & Science</h2>
                    <p className='text-sm font-semibold text-gray-200/60'>Scheuled for 15 June 2026. Syllabus: ch 1 - 4.</p>
                </div>

                <div className='bg-zinc-800 rounded-2xl py-5 px-4 w-full border-l-8 mt-5 border-blue-400'>
                    <span className='text-sm text-gray-200/60'>08 jun - 2026</span>
                    <h2 className='text-xl font-bold'>Holiday - Monday</h2>
                    <p className='text-sm font-semibold text-gray-200/60'>No classes on 09 June, Batch resumes Tuesday</p>
                </div>
            </div>

            <div className='mx-5 my-5 ring ring-gray-200/50 rounded-lg flex items-start justify-start flex-col px-5 py-8'>
                <div className='flex items-center gap-2'>
                    <i className='bx bx-clock text-2xl'></i>
                    <p>Today' schedule</p>
                </div>

                <ul className='w-full mt-5 px-5'>
                    <li className='flex items-center justify-between py-3 border-b border-gray-200/40'>
                        <p className='text-xl'>Maths</p>
                        <span className='text-sm text-gray-300'>4:00 - 5:00 PM</span>
                    </li>
                    <li className='flex items-center justify-between py-3 border-b border-gray-200/40'>
                        <p className='text-xl'>Science</p>
                        <span className='text-sm text-gray-300'>5:00 - 6:00 PM</span>
                    </li>
                    <li className='flex items-center justify-between py-3'>
                        <p className='text-xl'>English</p>
                        <span className='text-sm text-gray-300'>6:00 - 7:00 PM</span>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Home
