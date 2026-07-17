import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../components/Loader'

const Attendence = () => {
    const { url } = useContext(Context);
    const [studentList, setStudentList] = useState([]);
    const [attendence, setAttendence] = useState({});
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [loadingStudents, setLoadingStudents] = useState(true);
    const [loadingAttendence, setLoadingAttendence] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const fetchStudents = async () => {
        setLoadingStudents(true);
        try {
            const response = await axios.get(url + "/api/student/students");
            if (response.data.success) {
                setStudentList(response.data.students || []);
            }
        } catch (error) {
            console.log(error.response?.data || error.message);
        } finally {
            setLoadingStudents(false);
        }
    };

    const fetchAttendenceForDate = async (selectedDate) => {
        setLoadingAttendence(true);
        try {
            const response = await axios.get(url + `/api/attendence/date/${selectedDate}`);
            if (response.data.success) {
                const map = {};
                response.data.data.forEach((record) => {
                    map[record.studentId] = record.status;
                });
                setAttendence(map);
            }
        } catch (error) {
            console.log(error.response?.data || error.message);
        } finally {
            setLoadingAttendence(false);
        }
    };

    const handleAttendence = (studentId, status) => {
        setAttendence((prev) => ({ ...prev, [studentId]: status }));
    }

    const submitAttendence = async () => {
        const records = Object.entries(attendence).map(([studentId, status]) => ({ studentId, status }));

        if (records.length === 0) {
            toast.error("Mark at least one student's attendence");
            return;
        }

        setSubmitting(true);
        try {
            const response = await axios.post(
                url + "/api/attendence/mark-bulk",
                { date, records },
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.data.success) {
                toast.success(response.data.message);
            }
        } catch (error) {
            console.log(error.response?.data || error.message);
            toast.error(error.response?.data?.message || "attendence not saved");
        } finally {
            setSubmitting(false);
        }
    }

    useEffect(() => {
        fetchStudents();
    }, [url]);

    useEffect(() => {
        if (date) fetchAttendenceForDate(date);
    }, [date]);

    const isLoading = loadingStudents || loadingAttendence;

    return (
        <div className='bg-zinc-800 w-full min-h-screen px-5 py-3'>
            <div className='bg-[#212529] text-white px-5 py-3 ring ring-gray-400/40 rounded-lg'>
                <div className='flex items-center justify-between'>
                    <p className='flex items-center gap-2'>
                        <i className='bx bx-edit text-2xl'></i>
                        <span>Mark today's attendence</span>
                    </p>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        disabled={isLoading}
                        className='ring ring-gray-300/30 bg-zinc-800 px-3 py-1 rounded-lg text-sm disabled:opacity-50'
                    />
                </div>

                {isLoading && <Loader text="Loading students..." />}

                {!isLoading && studentList.length > 0 && (
                    studentList.map((student, index) => (
                        <div key={index} className='ring ring-gray-300/30 mt-3 rounded-md px-3 py-2 flex items-center justify-between'>
                            <div>
                                <p className='text-lg font-semibold'>{student.fullName}</p>
                                <p className='text-sm text-gray-500'>{student.studentId}</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <button
                                    onClick={() => handleAttendence(student.studentId, "P")}
                                    disabled={submitting}
                                    className={`w-10 h-10 flex items-center justify-center ring rounded-full cursor-pointer disabled:opacity-50 ${
                                        attendence[student.studentId] === "P"
                                            ? "bg-green-600 ring-green-500"
                                            : "ring-gray-300/30"
                                    }`}
                                >
                                    P
                                </button>
                                <button
                                    onClick={() => handleAttendence(student.studentId, "A")}
                                    disabled={submitting}
                                    className={`w-10 h-10 flex items-center justify-center ring rounded-full cursor-pointer disabled:opacity-50 ${
                                        attendence[student.studentId] === "A"
                                            ? "bg-red-600 ring-red-500"
                                            : "ring-gray-300/30"
                                    }`}
                                >
                                    A
                                </button>
                            </div>
                        </div>
                    ))
                )}

                {!isLoading && studentList.length === 0 && (
                    <p className='text-gray-400 mt-3'>No students found.</p>
                )}

                {!isLoading && studentList.length > 0 && (
                    <button
                        onClick={submitAttendence}
                        disabled={submitting}
                        className='w-full ring ring-gray-300/30 bg-zinc-900 hover:bg-zinc-700 px-5 py-2 rounded-lg mt-5 text-sm font-semibold tracking-wide cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                    >
                        {submitting && <i className='bx bx-loader-alt bx-spin'></i>}
                        {submitting ? 'Saving...' : 'Save attendence'}
                    </button>
                )}
            </div>
        </div>
    )
}

export default Attendence