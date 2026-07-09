import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context';
import axios from 'axios';

const Attendence = () => {
    const { url } = useContext(Context);
    const [studentList, setStudentList] = useState([]);
    const [attendence, setAttendence] = useState("");

    const fetchStudents = async () => {
        try {
            const response = await axios.get(url + "/api/student/students");
            if (response.data.success) {
                setStudentList(response.data.students || []);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAttendence = () => {

    }

    useEffect(() => {
        fetchStudents();
    }, [url]);
    return (
        <div className='bg-zinc-800 w-full min-h-screen px-5 py-3'>
            <div className='bg-[#212529] text-white px-5 py-3 ring ring-gray-400/40 rounded-lg'>
                <p className='flex items-center gap-2'>
                    <i className='bx bx-edit text-2xl'></i>
                    <span>Mark today's attendence</span>
                </p>
                {studentList.length > 0 && (
                    studentList.map((student, index)=>(
                        <div key={index} className='ring ring-gray-300/30 mt-3 rounded-md px-3 py-2 flex items-center justify-between'>
                            <div>
                                <p className='text-lg font-semibold'>{student.fullName}</p>
                                <p className='text-sm text-gray-500'>{student.studentId}</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <button onClick={()=>setAttendence("P")} className='w-10 h-10 flex items-center justify-center ring ring-gray-300/30 rounded-full cursor-pointer'>P</button>
                                <button onClick={()=>setAttendence("A")} className='w-10 h-10 flex items-center justify-center ring ring-gray-300/30 rounded-full'>A</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Attendence
