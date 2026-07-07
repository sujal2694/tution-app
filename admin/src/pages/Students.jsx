import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { Context } from '../context/Context'
import toast from 'react-hot-toast';

const Students = () => {
    const { url } = useContext(Context);
    const [studentData, setStudentData] = useState({
        fullName: "",
        studentId: "",
        standard: "",
        phone: "",
        password: ""
    })
    const [studentList, setStudentList] = useState([]);

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setStudentData(studentData => ({ ...studentData, [name]: value }))
    }

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

    useEffect(() => {
        fetchStudents();
    }, [url]);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(url + "/api/student/add-student", studentData);
            if (response.data.success) {
                setStudentData({
                    fullName: "",
                    studentId: "",
                    standard: "",
                    phone: "",
                    password: ""
                });
                fetchStudents();
                toast.success("Student added successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error("Student not error")
        }
    }

    const handleRemove = async (studentId) => {
        try {
            const response = await axios.delete(url + "/api/student/students/" + studentId);
            if (response.data.success) {
                fetchStudents();
                toast.success("Student removed successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error("Student not removed");
        }
    }

    return (
        <div className='bg-zinc-800 w-full min-h-screen text-white pt-10 px-3'>
            <div className='ring ring-gray-200/30 rounded-lg p-3 bg-zinc-500/10'>
                <div className='flex items-center justify-between'>
                    <p>Manage students</p>
                    <button className='px-3 py-2 flex items-center gap-1 ring ring-gray-200/40 rounded-2xl'>
                        <i className='bx bx-plus'></i>
                        <span>Add</span>
                    </button>
                </div>
                <div className='mt-5'>
                    <form onSubmit={onSubmit} className='flex items-center gap-3 flex-col'>
                        <input type="text" className='ring ring-gray-100/50 w-full px-2 py-1 rounded-md text-white/80 text-xl bg-zinc-800' placeholder='Full name' name='fullName' value={studentData.fullName} onChange={onChangeHandler} />

                        <input type="text" className='ring ring-gray-100/50 w-full px-2 py-1 rounded-md text-white/80 text-xl bg-zinc-800' placeholder='Student ID' name='studentId' value={studentData.studentId} onChange={onChangeHandler} />

                        <select name='standard' value={studentData.standard} onChange={onChangeHandler} className='ring ring-gray-100/50 w-full px-2 py-1 rounded-md text-xl text-gray-200 bg-zinc-800'>
                            <option value="std-7">Std 7</option>
                            <option value="std-8">Std 8</option>
                            <option value="std-9">Std 9</option>
                            <option value="std-10">Std 10</option>
                        </select>

                        <input type="text" className='ring ring-gray-100/50 w-full px-2 py-1 rounded-md text-white/80 text-xl bg-zinc-800' placeholder='Parent mobile' name='phone' value={studentData.phone} onChange={onChangeHandler} />

                        <input type="password" className='ring ring-gray-100/50 w-full px-2 py-1 rounded-md text-white/80 text-xl bg-zinc-800' placeholder='Password' name='password' value={studentData.password} onChange={onChangeHandler} />

                        <button type='submit' className='ring ring-gray-100/50 w-full px-2 py-2 rounded-md text-white text-md font-semibold tracking-wide hover:bg-slate-200/10 cursor-pointer mt-4'>Add student</button>
                    </form>

                    {studentList.length > 0 ? studentList.map((student) => (
                        <div key={student._id} className='flex items-center justify-between ring ring-gray-200/50 mt-4 rounded-lg py-2 px-3'>
                            <div className='flex items-start justify-start flex-col'>
                                <p className='text-white text-lg font-semibold'>{student.fullName}</p>
                                <span className='flex items-center gap-1 text-sm text-gray-300/80'>
                                    <p>{student.studentId}</p>
                                    <div className='w-1 h-1 rounded-full bg-gray-200/80'></div>
                                    <p>{student.standard}</p>
                                    <div className='w-1 h-1 rounded-full bg-gray-200/80'></div>
                                    <p>{student.phone}</p>
                                </span>
                            </div>
                            <button
                                onClick={() => handleRemove(student.studentId)}
                                className='px-3 py-2 ring ring-zinc-400 rounded-xl font-semibold hover:bg-gray-50/10 cursor-pointer'
                            >
                                Remove
                            </button>
                        </div>
                    )) : (
                        <p className='text-gray-300 mt-4'>No students added yet.</p>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Students
