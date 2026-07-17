import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context';
import toast from 'react-hot-toast';
import Loader from '../components/Loader'

const Fees = () => {
    const { url } = useContext(Context);
    const [students, setStudents] = useState([]);
    const [feesList, setFeesList] = useState([]);
    const [feesData, setFeesData] = useState({
        studentId: "",
        month: "",
        amount: "",
        status: ""
    })
    const [loadingList, setLoadingList] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [updatingId, setUpdatingId] = useState(null);

    const fetchStudents = async () => {
        try {
            const response = await axios.get(url + "/api/student/students");
            if (response.data.success) {
                setStudents(response.data.students || []);
            }
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const fetchFees = async () => {
        setLoadingList(true);
        try {
            const response = await axios.get(url + "/api/fees/get-fees");
            if (response.data.success) {
                setFeesList(response.data.data || []);
            }
        } catch (error) {
            console.log(error.response?.data || error.message);
        } finally {
            setLoadingList(false);
        }
    };

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFeesData(feesData => ({ ...feesData, [name]: value }));
    }

    const saveFees = async (e) => {
        e.preventDefault();

        const { studentId, month, amount, status } = feesData;
        if (!studentId || !month || !amount || !status) {
            toast.error("Please fill in all fields");
            return;
        }

        setSubmitting(true);
        try {
            const response = await axios.post(
                url + "/api/fees/save-fees",
                feesData,
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.data.success) {
                setFeesData({
                    studentId: "",
                    month: "",
                    amount: "",
                    status: ""
                });
                toast.success(response.data.message);
                fetchFees();
            }
        } catch (error) {
            console.log(error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Fees not updated");
        } finally {
            setSubmitting(false);
        }
    }

    const changeStatus = async (id, status) => {
        setUpdatingId(id);
        try {
            const response = await axios.patch(
                url + `/api/fees/${id}/status`,
                { status },
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.data.success) {
                toast.success(response.data.message);
                fetchFees();
            }
        } catch (error) {
            console.log(error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Status not updated");
        } finally {
            setUpdatingId(null);
        }
    }

    useEffect(() => {
        fetchStudents();
        fetchFees();
    }, [])

    return (
        <div className='bg-zinc-800 w-full min-h-screen px-5 py-7 text-white'>
            <div className='ring ring-gray-400/40 bg-[#212529] px-3 py-3 rounded-lg'>
                <div className='flex items-center'>
                    <i className='bx bx-edit'></i>
                    <p>Update fee record</p>
                </div>

                <div>
                    <form onSubmit={saveFees} className='flex items-center justify-center flex-col w-full'>
                        <select name='studentId' value={feesData.studentId} onChange={onChangeHandler} disabled={submitting} className='w-full ring ring-gray-300/30 bg-zinc-800 px-5 py-2 rounded-lg mt-4 text-lg font-semibold tracking-wide cursor-pointer disabled:opacity-50'>
                            <option value="">Select student</option>
                            {students.map((item) => (
                                <option key={item.studentId} value={item.studentId}>{item.studentId}</option>
                            ))}
                        </select>

                        <input name='month' value={feesData.month} onChange={onChangeHandler} disabled={submitting} type="text" placeholder='Month (e.g. June 2026)' className='w-full ring ring-gray-300/30 bg-zinc-800 px-5 py-2 rounded-lg mt-4 text-lg font-semibold tracking-wide disabled:opacity-50' />

                        <input name='amount' value={feesData.amount} onChange={onChangeHandler} disabled={submitting} type="text" placeholder='Amount (₹)' className='w-full ring ring-gray-300/30 bg-zinc-800 px-5 py-2 rounded-lg mt-4 text-lg font-semibold tracking-wide disabled:opacity-50' />

                        <select name='status' value={feesData.status} onChange={onChangeHandler} disabled={submitting} className='w-full ring ring-gray-300/30 bg-zinc-800 px-5 py-2 rounded-lg mt-4 text-lg font-semibold tracking-wide cursor-pointer disabled:opacity-50'>
                            <option value="">Select status</option>
                            <option value="paid">Paid</option>
                            <option value="due">Due</option>
                            <option value="pending">Pending</option>
                        </select>

                        <button
                            type='submit'
                            disabled={submitting}
                            className='w-full ring ring-gray-300/30 bg-zinc-900 hover:bg-zinc-800 px-5 py-2 rounded-lg mt-4 text-sm font-semibold tracking-wide cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                        >
                            {submitting && <i className='bx bx-loader-alt bx-spin'></i>}
                            {submitting ? 'Saving...' : 'Save'}
                        </button>
                    </form>
                </div>
            </div>

            <div className='ring ring-gray-400/40 bg-[#212529] px-3 py-3 rounded-lg mt-5'>
                <div className='flex items-center gap-2'>
                    <i className='bx bx-clipboard-detail text-xl'></i>
                    <p>Fees statements</p>
                </div>

                {loadingList ? (
                    <Loader text="Loading fees..." />
                ) : (
                    <div className='mt-4 overflow-x-auto'>
                        <table className='w-full text-left text-sm'>
                            <thead>
                                <tr className='border-b border-gray-500/40'>
                                    <th className='py-2 px-2'>Student ID</th>
                                    <th className='py-2 px-2'>Month</th>
                                    <th className='py-2 px-2'>Amount</th>
                                    <th className='py-2 px-2'>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feesList.map((item) => (
                                    <tr key={item._id} className='border-b border-gray-700/40'>
                                        <td className='py-2 px-2'>{item.studentId}</td>
                                        <td className='py-2 px-2'>{item.month}</td>
                                        <td className='py-2 px-2'>₹{item.amount}</td>
                                        <td className='py-2 px-2'>
                                            <div className='flex items-center gap-2'>
                                                <select
                                                    value={item.status}
                                                    onChange={(e) => changeStatus(item._id, e.target.value)}
                                                    disabled={updatingId === item._id}
                                                    className='bg-zinc-800 ring ring-gray-300/30 rounded px-2 py-1 cursor-pointer disabled:opacity-50'
                                                >
                                                    <option value="paid">Paid</option>
                                                    <option value="due">Due</option>
                                                    <option value="pending">Pending</option>
                                                </select>
                                                {updatingId === item._id && (
                                                    <i className='bx bx-loader-alt bx-spin text-sm'></i>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {feesList.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className='py-4 text-center text-gray-400'>No fees records yet</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Fees