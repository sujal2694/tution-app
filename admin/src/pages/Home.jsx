import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context';
import axios from 'axios';

const Home = () => {
  const { url } = useContext(Context);
  const [notice, setNotice] = useState([]);

  const fetchNotices = async () => {
    try {
      const response = await axios.get(url + "/api/notice/get-notices");
      if (response.data.success) {
        setNotice(response.data.notices)
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchNotices()
  }, [url])

  return (
    <div className='bg-zinc-800 text-white w-full min-h-screen px-5 py-7'>
      <div className='ring ring-gray-400/40 bg-[#212529] px-3 py-3 rounded-lg mt-5'>
        <div className='flex items-center gap-2'>
          <i className='bx bx-list text-xl'></i>
          <p>All Notices</p>
        </div>

        {notice.length === 0 && (
          <p className='text-sm mt-2 text-zinc-300'>No notice from teacher.</p>
        )}
        {notice.map((item) => (
          <div key={item._id} className='bg-zinc-900 px-5 py-2 rounded-md border-l-2 border-blue-600 flex items-center justify-between mt-3'>
            <div className='leading-5 py-2'>
              <span className='text-sm text-zinc-300'>{item.date ? new Date(item.date).toLocaleDateString() : "N/A"}</span>
              <h2 className='text-lg font-semibold'>{item.title}</h2>
              <p className='text-sm text-zinc-400'>{item.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
