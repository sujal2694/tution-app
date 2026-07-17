import axios from 'axios';
import React, { useContext, useEffect, useState, useMemo } from 'react'
import toast from 'react-hot-toast';
import { Context } from '../context/Context';
import Loader from '../components/Loader'

const HomeWork = () => {
    const { url } = useContext(Context);
    const [homeWork, setHomeWork] = useState([]);
    const [students, setStudents] = useState([]);
    const [homeWorkData, setHomeWorkData] = useState({
        subject: "",
        description: "",
        date: "",
        standard: ""
    })

    const [loadingList, setLoadingList] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    // derive unique standards from the students list, sorted naturally
    const standards = useMemo(() => {
        const unique = [...new Set(students.map((s) => s.standard).filter(Boolean))];
        return unique.sort((a, b) =>
            a.toString().localeCompare(b.toString(), undefined, { numeric: true })
        );
    }, [students]);

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name,value);
        
        setHomeWorkData(homeWorkData => ({ ...homeWorkData, [name]: value }));
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!homeWorkData.standard) {
            toast.error("Please select a standard.");
            return;
        }
        if (!homeWorkData.subject || !homeWorkData.date) {
            toast.error("Please select subject and date.");
            return;
        }

        setSubmitting(true);
        try {
            const response = await axios.post(url + "/api/homework/add-home-work", homeWorkData);
            if (response.data.success) {
                setHomeWorkData({
                    subject: "",
                    description: "",
                    date: "",
                    standard: ""
                });
                toast.success("Homework assigned to standard " + homeWorkData.standard);
                getHomeWork();
            } else {
                toast.error(response.data.message || "Failed to add homework");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to add homework");
        } finally {
            setSubmitting(false);
        }
    }

    const getStudents = async () => {
        try {
            const res = await axios.get(url + "/api/student/students");
            if (res.data.success) {
                setStudents(res.data.students)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getHomeWork = async () => {
        setLoadingList(true);
        try {
            const response = await axios.get(url + "/api/homework/get-home-work");
            if (response.data.success) {
                setHomeWork(response.data.homeWorks || response.data.homework || []);
            } else {
                toast.error("Homework not fetched");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Homework not fetched");
        } finally {
            setLoadingList(false);
        }
    }

    const deleteHomeWork = async (id) => {
        if (deletingId) return;
        const confirmed = window.confirm("Delete this homework? This can't be undone.");
        if (!confirmed) return;

        setDeletingId(id);
        try {
            const response = await axios.post(url + "/api/homework/delete-home-work", { id });
            if (response.data.success) {
                toast.success("Homework deleted.");
                setHomeWork((prev) => prev.filter((hw) => hw._id !== id));
            } else {
                toast.error(response.data.message || "Failed to delete homework");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to delete homework");
        } finally {
            setDeletingId(null);
        }
    }

    useEffect(() => {
        if (url) {
            getHomeWork();
            getStudents();
        }
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
                        name="standard"
                        value={homeWorkData.standard}
                        onChange={onChangeHandler}
                        required
                        disabled={submitting}
                        className='w-full ring ring-gray-300/30 bg-zinc-800 px-5 py-2 rounded-lg mt-4 text-lg font-semibold tracking-wide cursor-pointer disabled:opacity-50'
                    >
                        <option value="">Select standard</option>
                        <option value="lkg">LKG</option>
                        <option value="ukg">UKG</option>
                        <option value="std-1">Std 1</option>
                        <option value="std-2">Std 2</option>
                        <option value="std-3">Std 3</option>
                        <option value="std-4">Std 4</option>
                        <option value="std-5">Std 5</option>
                        <option value="std-6">Std 6</option>
                        <option value="std-7">Std 7</option>
                        <option value="std-8">Std 8</option>
                    </select>
                    <select
                        name='subject'
                        value={homeWorkData.subject}
                        onChange={onChangeHandler}
                        required
                        disabled={submitting}
                        className='w-full ring ring-gray-300/30 bg-zinc-800 px-5 py-2 rounded-lg mt-4 text-lg font-semibold tracking-wide cursor-pointer disabled:opacity-50'
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
                        disabled={submitting}
                        className='w-full ring ring-gray-300/30 px-5 py-2 rounded-lg mt-4 text-lg font-semibold tracking-wide disabled:opacity-50'
                        type="text"
                        placeholder='Homework description'
                    />

                    <input
                        name='date'
                        value={homeWorkData.date}
                        onChange={onChangeHandler}
                        type="date"
                        required
                        disabled={submitting}
                        className='w-full ring ring-gray-300/30 px-5 py-2 rounded-lg mt-4 text-lg font-semibold tracking-wide disabled:opacity-50'
                    />

                    <button
                        type='submit'
                        disabled={submitting}
                        className='w-full ring ring-gray-300/30 bg-zinc-900 hover:bg-transparent px-5 py-2 rounded-lg mt-4 text-lg font-semibold tracking-wide cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                    >
                        {submitting && <i className='bx bx-loader-alt bx-spin text-lg'></i>}
                        {submitting ? 'Assigning...' : 'Assign'}
                    </button>
                </form>
            </div>

            <div className='ring ring-gray-400/40 bg-[#212529] px-3 py-3 rounded-lg mt-5'>
                <div className='flex items-center gap-2'>
                    <i className='bx bx-clipboard text-2xl'></i>
                    <p>Homework List</p>
                </div>
                <div>
                    {loadingList && <Loader text="Loading homework..." />}

                    {!loadingList && homeWork.length === 0 && (
                        <p className='text-gray-400 mt-3'>No homework assigned yet.</p>
                    )}

                    {!loadingList && homeWork.map((item) => {
                        const isDeleting = deletingId === item._id;
                        return (
                            <div key={item._id} className='border-b border-gray-300/30 flex items-center justify-between mt-3'>
                                <div className='leading-5 py-2'>
                                    <div className='flex items-center gap-2'>
                                        <p className='uppercase text-sm bg-blue-300/90 w-fit px-2 py-1 rounded-full text-gray-100 font-semibold tracking-wide'>{item.subject}</p>
                                        {item.standard && (
                                            <p className='text-xs bg-zinc-700 px-2 py-1 rounded-full text-zinc-300'>Std {item.standard}</p>
                                        )}
                                    </div>
                                    <h2 className='mt-3 text-lg font-semibold'>{item.description}</h2>
                                    <span className='text-sm text-zinc-400'>Due: {item.date ? new Date(item.date).toLocaleDateString() : "N/A"}</span>
                                </div>
                                <div
                                    onClick={() => !isDeleting && deleteHomeWork(item._id)}
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
        </div>
    )
}

export default HomeWork