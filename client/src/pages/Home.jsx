import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Context } from '../context/Context'
import Loader from '../components/Loader'

const Home = () => {
    const { url } = useContext(Context)

    const [notices, setNotices] = useState([])
    const [noticesLoading, setNoticesLoading] = useState(true)
    const [noticesError, setNoticesError] = useState(null)

    const [schedule, setSchedule] = useState(null)
    const [scheduleLoading, setScheduleLoading] = useState(true)
    const [scheduleError, setScheduleError] = useState(null)

    const fetchNotices = async () => {
        setNoticesLoading(true)
        setNoticesError(null)
        try {
            const response = await axios.get(url + '/api/notice/get-notices')
            if (response.data.success) {
                setNotices(response.data.notices)
            } else {
                setNoticesError(response.data.message || 'Failed to load notices')
            }
        } catch (error) {
            console.log(error)
            setNoticesError('Error fetching notices')
        } finally {
            setNoticesLoading(false)
        }
    }

    const fetchTodaySchedule = async () => {
        setScheduleLoading(true)
        setScheduleError(null)
        try {
            const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
            const response = await axios.get(url + `/api/routine/day/${today}`)
            if (response.data.success) {
                setSchedule(response.data.data)
            }
        } catch (error) {
            console.log(error)
            if (error.response?.status === 404) {
                setSchedule(null)
            } else {
                setScheduleError('Error fetching schedule')
            }
        } finally {
            setScheduleLoading(false)
        }
    }

    useEffect(() => {
        if (url) {
            fetchNotices()
            fetchTodaySchedule()
        }
    }, [url])

    return (
        <>
            <div className='mx-5 ring ring-gray-200/50 rounded-lg flex items-start justify-start flex-col px-5 py-8'>
                <div className='flex items-center gap-2'>
                    <i className='bx bx-announcement text-2xl'></i>
                    <p>Latest notices</p>
                </div>

                {noticesLoading && <Loader text="Loading notices..." size="text-2xl" />}
                {noticesError && <p className='text-sm text-red-400 mt-4'>{noticesError}</p>}
                {!noticesLoading && !noticesError && notices.length === 0 && (
                    <p className='text-sm text-gray-400 mt-4'>No notices yet.</p>
                )}

                {!noticesLoading && notices.map((item) => (
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
                    <p>Today's schedule</p>
                </div>

                {scheduleLoading && <Loader text="Loading schedule..." size="text-2xl" />}
                {scheduleError && <p className='text-sm text-red-400 mt-4 px-5'>{scheduleError}</p>}
                {!scheduleLoading && !scheduleError && (!schedule || schedule.items?.length === 0) && (
                    <p className='text-sm text-gray-400 mt-4 px-5'>No classes scheduled for today.</p>
                )}

                {!scheduleLoading && !scheduleError && schedule?.items?.length > 0 && (
                    <ul className='w-full mt-5 px-5'>
                        {schedule.items.map((item, idx) => (
                            <li
                                key={item._id || idx}
                                className={`flex items-center justify-between py-3 ${idx !== schedule.items.length - 1 ? 'border-b border-gray-200/40' : ''
                                    }`}
                            >
                                <div>
                                    <p className='text-xl'>{item.subject}</p>
                                    {item.teacher && (
                                        <span className='text-xs text-gray-400'>{item.teacher}</span>
                                    )}
                                </div>
                                <span className='text-sm text-gray-300'>
                                    {item.startTime} - {item.endTime}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}

export default Home