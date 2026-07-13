import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { Context } from '../context/Context'

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
    const { url } = useContext(Context);
    const percentage = 30;
    const days = Math.floor(365 * (percentage / 100));

    return (
        <div className='overflow-scroll scrollbar-none py-5'>
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
                    <li className='flex items-center justify-between border-b border-gray-300/30 pb-1'>
                        <p>10 Jun, Tue</p>
                        <span className='flex items-center gap-1 text-green-500 text-sm'>
                            <i className='bx bx-check'></i>
                            <p>Present</p>
                        </span>
                    </li>
                    <li className='flex items-center justify-between border-b border-gray-300/30 pb-1 mt-2'>
                        <p>9 Jun, Mon</p>
                        <span className='flex items-center gap-1 text-red-500 text-sm'>
                            <i className='bx bx-x'></i>
                            <p>Present</p>
                        </span>
                    </li>
                    <li className='flex items-center justify-between pb-1 mt-2'>
                        <p>7 Jun, Sat</p>
                        <span className='flex items-center gap-1 text-gray-500 text-sm'>
                            <p>Holiday</p>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Attedence
