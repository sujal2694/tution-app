import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Context } from '../context/Context'
import { toast } from 'react-hot-toast'
import Loader from '../components/Loader'

const Notices = () => {
    const { url } = useContext(Context);
    const [notices, setNotice] = useState([]);
    const [noticeData, setNoticeData] = useState({
        title: "",
        details: "",
        date: ""
    })
    const [loadingList, setLoadingList] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setNoticeData(noticeData => ({ ...noticeData, [name]: value }))
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
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
            toast.error("Failed to add notice");
        } finally {
            setSubmitting(false);
        }
    }

    const fetchNotices = async () => {
        setLoadingList(true);
        try {
            const response = await axios.get(url + "/api/notice/get-notices");
            if (response.data.success) {
                setNotice(response.data.notices)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingList(false);
        }
    }

    const deleteNotice = async (id) => {
        if (deletingId) return;
        setDeletingId(id);
        try {
            const response = await axios.post(url + "/api/notice/delete-notice", { id });
            if (response.data.success) {
                toast.success("Notice deleted.");
                setNotice((prev) => prev.filter((n) => n._id !== id));
            } else {
                toast.error(response.data.message || "Failed to delete notice");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to delete notice");
        } finally {
            setDeletingId(null);
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
                    <input type="text" placeholder='Notice title' disabled={submitting} className='w-full ring ring-gray-300/30 px-5 py-2 rounded-lg mt-4 text-lg font-semibold tracking-wide disabled:opacity-50' name='title' value={noticeData.title} onChange={onChangeHandler} />

                    <textarea rows={5} placeholder='Notice details' disabled={submitting} className='w-full ring ring-gray-300/30 px-5 py-2 rounded-lg mt-4 text-lg font-semibold tracking-wide disabled:opacity-50' name='details' value={noticeData.details} onChange={onChangeHandler} />

                    <input type="date" placeholder='date' disabled={submitting} className='w-full ring ring-gray-300/30 px-5 py-2 rounded-lg mt-4 text-lg font-semibold tracking-wide disabled:opacity-50' name='date' value={noticeData.date} onChange={onChangeHandler} />

                    <button
                        type='submit'
                        disabled={submitting}
                        className='w-full ring ring-gray-300/30 bg-zinc-900 hover:bg-zinc-800 px-5 py-2 rounded-lg mt-4 text-lg font-semibold tracking-wide cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                    >
                        {submitting && <i className='bx bx-loader-alt bx-spin'></i>}
                        {submitting ? 'Posting...' : 'Post notice'}
                    </button>
                </form>
            </div>

            <div className='ring ring-gray-400/40 bg-[#212529] px-3 py-3 rounded-lg mt-5'>
                <div className='flex items-center gap-2'>
                    <i className='bx bx-list text-xl'></i>
                    <p>All Notices</p>
                </div>

                {loadingList && <Loader text="Loading notices..." />}

                {!loadingList && notices.length === 0 && (
                    <p className='text-sm mt-2 text-zinc-300'>No notice from teacher.</p>
                )}
                {!loadingList && notices.map((item) => {
                    const isDeleting = deletingId === item._id;
                    return (
                        <div key={item._id} className='bg-zinc-900 px-5 py-2 rounded-md border-l-2 border-blue-600 flex items-center justify-between mt-3'>
                            <div className='leading-5 py-2'>
                                <span className='text-sm text-zinc-300'>{item.date ? new Date(item.date).toLocaleDateString() : "N/A"}</span>
                                <h2 className='text-lg font-semibold'>{item.title}</h2>
                                <p className='text-sm text-zinc-400'>{item.details}</p>
                            </div>
                            <div
                                onClick={() => !isDeleting && deleteNotice(item._id)}
                                className={`w-10 h-10 ring ring-gray-300/30 flex items-center justify-center rounded-xl transition-all duration-300
                                    ${isDeleting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:text-red-500 hover:bg-gray-300/30'}`}
                            >
                                {isDeleting
                                    ? <i className='bx bx-loader-alt bx-spin'></i>
                                    : <i className='bx bx-trash'></i>
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Notices