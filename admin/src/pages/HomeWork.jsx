import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Context } from '../context/Context';

const HomeWork = () => {
    const { url } = useContext(Context);
    const [homeWork, setHomeWork] = useState([]);
    const [homeWorkData, setHomeWorkData] = useState({
        subject: "",
        description: "",
        date: "",
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setHomeWorkData(homeWorkData => ({ ...homeWorkData, [name]: value }));
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!homeWorkData.subject || !homeWorkData.date) {
            toast.error("Please select subject and date.");
            return;
        }

        try {
            const response = await axios.post(url + "/api/homework/add-home-work", homeWorkData);
            if (response.data.success) {
                setHomeWorkData({
                    subject: "",
                    description: "",
                    date: ""
                });
                toast.success("Homework added.");
                getHomeWork();
            } else {
                toast.error(response.data.message || "Failed to add homework");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to add homework");
        }
    }

    const getHomeWork = async () => {
        try {
            const response = await axios.get(url + "/api/homework/get-home-work");
            console.log("Homework API response:", response); // keep this for now to verify key name

            if (response.data.success) {
                setHomeWork(response.data.homeWorks || response.data.homework || []);
            } else {
                toast.error("Homework not fetched");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Homework not fetched");
        }
    }

    const deleteHomeWork = async (id) => {
        try {
            const response = await axios.post(url + "/api/homework/delete-home-work", { id });
            if (response.data.success) {
                toast.success("Homework deleted.");
                getHomeWork(); // refresh list
            } else {
                toast.error(response.data.message || "Failed to delete homework");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to delete homework");
        }
    }

    useEffect(() => {
        getHomeWork();
    }, [url])

    return (
        <div className='bg-zinc-800 w-full min-h-screen px-5 py-7 text-white'>
            <div className='ring ring-gray-400/40 bg-[#212529] px-3 py-3 rounded-lg'>
                <div className='flex items-center gap-2'>
                    <i className='bx bx-plus text-xl'></i>
                    <p>Assign Homework</p>
                </div>
                <form onSubmit={onSubmit} className='flex items-center justify-center flex-col w-full'>
                    <select
                        name='subject'
                        value={homeWorkData.subject}
                        onChange={onChangeHandler}
                        required
                        className='w-full ring ring-gray-300/30 bg-zinc-800 px-5 py-2 rounded-lg mt-4 text-lg font-semibold tracking-wide cursor-pointer'
                    >
                        <option value="" disabled>Select subject</option>
                        <option value="maths">Maths</option>
                        <option value="science">Science</option>
                        <option value="english">English</option>
                        <option value="gujarati">Gujarati</option>
                        <option value="social-science">Social Science</option>
                    </select>

                    <input
                        name='description'
                        value={homeWorkData.description}
                        onChange={onChangeHandler}
                        className='w-full ring ring-gray-300/30 px-5 py-2 rounded-lg mt-4 text-lg font-semibold tracking-wide cursor-pointer'
                        type="text"
                        placeholder='Homework description'
                    />

                    <input
                        name='date'
                        value={homeWorkData.date}
                        onChange={onChangeHandler}
                        type="date"
                        required
                        className='w-full ring ring-gray-300/30 px-5 py-2 rounded-lg mt-4 text-lg font-semibold tracking-wide cursor-pointer'
                    />

                    <button type='submit' className='w-full ring ring-gray-300/30 bg-zinc-900 hover:bg-transparent px-5 py-2 rounded-lg mt-4 text-lg font-semibold tracking-wide cursor-pointer'>Assign</button>
                </form>
            </div>

            <div className='ring ring-gray-400/40 bg-[#212529] px-3 py-3 rounded-lg mt-5'>
                <div className='flex items-center gap-2'>
                    <i className='bx bx-clipboard text-2xl'></i>
                    <p>Homework List</p>
                </div>
                <div>
                    {homeWork.length === 0 && (
                        <p className='text-gray-400 mt-3'>No homework assigned yet.</p>
                    )}
                    {homeWork.map((item) => (
                        <div key={item._id} className='border-b border-gray-300/30 flex items-center justify-between mt-3'>
                            <div className='leading-5 py-2'>
                                <p className='uppercase text-sm bg-blue-300/90 w-fit px-2 py-1 rounded-full text-gray-100 font-semibold tracking-wide'>{item.subject}</p>
                                <h2 className='mt-3 text-lg font-semibold'>{item.description}</h2>
                                <span className='text-sm text-zinc-400'>Due: {item.date ? new Date(item.date).toLocaleDateString() : "N/A"}</span>
                            </div>
                            <div onClick={()=>deleteHomeWork(item._id)} className='w-10 h-10 ring ring-gray-300/30 flex items-center justify-center rounded-xl cursor-pointer hover:text-red-500 hover:bg-gray-300/30 transition-all duration-300'>
                                <i className='bx bx-trash'></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomeWork