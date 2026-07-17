import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'
import Loader from '../components/Loader'

const CircularProgress = ({ percentage = 75, size = 160, stroke = 14, color = '#48cae4', bg = '#495057' }) => {
    const radius = (size - stroke) / 2
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (percentage / 100) * circumference
    const center = size / 2

    return (
        <div className='flex items-center justify-center' style={{ width: size, height: size }}>
            <svg width={size} height={size}>
                <circle cx={center} cy={center} r={radius} stroke={bg} strokeWidth={stroke} fill="none" />
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke={color}
                    strokeWidth={stroke}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={offset}
                    transform={`rotate(-90 ${center} ${center})`}
                />
                <text x={center} y={center} textAnchor="middle" dy="0.35em" fontSize={size * 0.2} fontWeight="600" fill="#fff">
                    {`${percentage}%`}
                </text>
            </svg>
        </div>
    )
}

const Attedence = () => {
    const { url, searchParams } = useContext(Context);
    const studentId = searchParams.get("studentId");
    const [attendence, setAttendence] = useState([]);
    const [absentDays, setAbsentDays] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    const fetchAttendence = async (isRefresh = false) => {
        isRefresh ? setRefreshing(true) : setLoading(true);
        setError(null);
        try {
            const response = await axios.get(url + `/api/attendence/get-attendence`);
            if (response.data.success) {
                const students = response.data.data;
                setAttendence(students);

                const studentRecords = students.filter(
                    (student) => student.studentId === studentId
                );

                const presentDays = studentRecords.filter(
                    (student) => student.status === "P"
                ).length;
                setCount(presentDays);

                const absent = studentRecords
                    .filter((student) => student.status === "A")
                    .map((student) => ({
                        status: student.status,
                        date: student.date,
                    }));
                setAbsentDays(absent);
            } else {
                setError(response.data.message || 'Failed to load attendance');
            }
        } catch (error) {
            console.log(error);
            setError('Error fetching attendance');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        if (url && studentId) fetchAttendence();
    }, [url, studentId]);

    const percentage = ((count / 365) * 100).toFixed(1);
    const days = Math.floor(365 * (percentage / 100));

    if (loading) return <Loader text="Loading attendance..." />;

    return (
        <div className='overflow-scroll scrollbar-none py-5'>
            <div className='w-full flex items-center justify-end px-10'>
                <button
                    onClick={() => fetchAttendence(true)}
                    disabled={refreshing}
                    className={`flex items-center gap-3 ring ring-gray-200/40 px-7 py-2 rounded-lg transition-all duration-200
                        ${refreshing ? 'opacity-60 cursor-not-allowed' : 'hover:bg-zinc-400/30 cursor-pointer'}`}
                >
                    <i className={`bx ${refreshing ? 'bx-loader-alt bx-spin' : 'bx-refresh-cw'} text-xl`}></i>
                    {refreshing ? 'Refreshing...' : 'Refresh'}
                </button>
            </div>

            {error && <p className='text-sm text-red-400 text-center mt-3'>{error}</p>}

            <div className='flex items-center justify-center ring ring-gray-300/40 w-[90vw] m-auto my-10 py-7 rounded-2xl flex-col gap-5'>
                <div className='text-center'>
                    <h2 className='mb-5 flex items-center gap-1'>
                        <i className='bx bx-doughnut-chart text-2xl'></i>
                        <p>Overall attendence</p>
                    </h2>
                    <CircularProgress percentage={percentage} />
                </div>

                <div className='flex flex-row gap-4'>
                    <div className='flex items-center gap-1'>
                        <div className='rounded-full w-3 h-3 bg-green-500'></div>
                        <p>Present: {`${days}`}</p>
                    </div>

                    <div className='flex items-center gap-1'>
                        <div className='rounded-full w-3 h-3 bg-red-500'></div>
                        <p>Absent: {`${365 - days}`}</p>
                    </div>
                </div>
            </div>

            <div className='ring ring-gray-300/40 w-[90vw] m-auto rounded-2xl px-8 py-9'>
                <div className='flex items-center gap-2'>
                    <i className='bx bx-calendar-event text-2xl'></i>
                    <p>Recent Records</p>
                </div>
                <ul className='mt-5'>
                    {absentDays.length === 0 && (
                        <p className='text-sm text-gray-400 mt-3'>No absences recorded 🎉</p>
                    )}
                    {absentDays.map((day, index) => (
                        <li key={index} className='flex items-center justify-between border-b border-gray-300/30 pb-1'>
                            <p>{day.date}</p>
                            <span className='flex items-center gap-1 text-red-500 text-sm'>
                                <i className='bx bx-x'></i>
                                <p>Absent</p>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Attedence