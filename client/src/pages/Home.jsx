import React from 'react'
import { assets, iconList } from '../assets/assets'
import { useState } from 'react'
import axios from 'axios';
import { useContext } from 'react';
import { Context } from '../context/Context';
import { useEffect } from 'react';

const Home = () => {
    const { url } = useContext(Context);
    const [notices, setNotices] = useState([]);

    const fetchNotices = async () => {
        try {
            const response = await axios.get(url + "/api/notice/get-notices")
            if (response.data.success) {
                setNotices(response.data.notices)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchNotices();
    }, [url])
    return (
        <>
            <div className='mx-5 ring ring-gray-200/50 rounded-lg flex items-start justify-start flex-col px-5 py-8'>
                <div className='flex items-center gap-2'>
                    <i className='bx bx-announcement text-2xl'></i>
                    <p>Latest notices</p>
                </div>

                {notices.map((item) => (
                    <div key={item._id} className='bg-zinc-800 rounded-2xl py-5 px-4 w-full border-l-8 mt-5 border-blue-400'>
                        <span className='text-sm text-gray-200/60'>{item.date}</span>
                        <h2 className='text-xl font-bold'>{item.title}</h2>
                        <p className='text-sm font-semibold text-gray-200/60'>{item.details}</p>
                    </div>
                ))}
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
