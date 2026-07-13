import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Context } from '../context/Context'
import { toast } from 'react-hot-toast'

const Notices = () => {
    const { url } = useContext(Context);
    const [notices, setNotice] = useState([]);
    const [noticeData, setNoticeData] = useState({
        title: "",
        details: "",
        date: ""
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setNoticeData(noticeData => ({ ...noticeData, [name]: value }))
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(url + "/api/notice/add-notice", noticeData)
            if (response.data.success) {
                setNoticeData({
                    title: "",
                    details: "",
                    date: ""
                })
                toast.success("Notice added")
                fetchNotices();
            }
        } catch (error) {
            console.log(error);
        }

    }

    const fetchNotices = async () => {
        try {
            const response = await axios.get(url + "/api/notice/get-notices");
            console.log(response);

            if (response.data.success) {
                setNotice(response.data.notices)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteNotice = async (id) => {
        try {
            const response = await axios.post(url + "/api/notice/delete-notice", { id });
            if (response.data.success) {
                toast.success("Notice deleted.");
                fetchNotices();
            } else {
                toast.error(response.data.message || "Failed to delete notice");
            }
        } catch (error) {
            console.log(error);
            toast.error(response.data.message)
        }
    }

    useEffect(() => {
        fetchNotices();
    }, [])
    return (
        <div className='bg-zinc-800 w-full min-h-screen px-5 py-7 text-white'>
            <div className='ring ring-gray-400/40 bg-[#212529] px-3 py-3 rounded-lg'>
                <div className='flex items-center gap-2'>
                    <i className='bx bx-announcement text-xl'></i>
                    <p>Post a notice</p>
                </div>

                <form onSubmit={onSubmit}>
                    <input type="text" placeholder='Notice title' className='w-full ring ring-gray-300/30 px-5 py-2 rounded-lg mt-4 text-lg font-semibold tracking-wide cursor-pointer' name='title' value={noticeData.title} onChange={onChangeHandler} />

                    <textarea rows={5} placeholder='Notice details' className='w-full ring ring-gray-300/30 px-5 py-2 rounded-lg mt-4 text-lg font-semibold tracking-wide cursor-pointer' name='details' value={noticeData.details} onChange={onChangeHandler} />

                    <input type="date" placeholder='date' className='w-full ring ring-gray-300/30 px-5 py-2 rounded-lg mt-4 text-lg font-semibold tracking-wide cursor-pointer' name='date' value={noticeData.date} onChange={onChangeHandler} />

                    <button type='submit' className='w-full ring ring-gray-300/30 bg-zinc-900 hover:bg-zinc-800 px-5 py-2 rounded-lg mt-4 text-lg font-semibold tracking-wide cursor-pointer'>Post notice</button>
                </form>
            </div>

            <div className='ring ring-gray-400/40 bg-[#212529] px-3 py-3 rounded-lg mt-5'>
                <div className='flex items-center gap-2'>
                    <i className='bx bx-list text-xl'></i>
                    <p>All Notices</p>
                </div>

                {notices.length === 0 && (
                    <p className='text-sm mt-2 text-zinc-300'>No notice from teacher.</p>
                )}
                {notices.map((item) => (
                    <div key={item._id} className='bg-zinc-900 px-5 py-2 rounded-md border-l-2 border-blue-600 flex items-center justify-between mt-3'>
                        <div className='leading-5 py-2'>
                            <span className='text-sm text-zinc-300'>{item.date ? new Date(item.date).toLocaleDateString() : "N/A"}</span>
                            <h2 className='text-lg font-semibold'>{item.title}</h2>
                            <p className='text-sm text-zinc-400'>{item.details}</p>
                        </div>
                        <div onClick={() => deleteNotice(item._id)} className='w-10 h-10 ring ring-gray-300/30 flex items-center justify-center rounded-xl cursor-pointer hover:text-red-500 hover:bg-gray-300/30 transition-all duration-300'>
                            <i className='bx bx-trash'></i>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Notices
