import React, { useContext, useState } from 'react'
import { Context } from '../context/Context';
import axios from 'axios';
import toast from 'react-hot-toast';

const LoginPage = () => {
    const { url, setToken, setSearchParams } = useContext(Context);
    const [data, setData] = useState({
        studentId: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false);

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(url + "/api/user/user-login", data);
            setSearchParams({ studentId: data.studentId })
            if (response.data.success) {
                setToken(response.data.token)
                localStorage.setItem("token", response.data.token)
                setData({
                    studentId: "",
                    password: ""
                });
                toast.success("Login successful");
            } else {
                setIsLogedIn(false);
                toast.error(response.data.message || "Login failed");
            }
        } catch (error) {
            toast(error.response?.data?.message || "Login failed. Please try again.");
        }
    }
    return (
        <div className='w-screen h-screen min-h-screen bg-gray-950 flex items-center justify-center'>
            <div className='w-full h-full lg:w-1/4 bg-gray-600/20 text-center rounded-2xl'>
                <div className='w-full h-1/2 bg-gradient-to-r from-blue-900 to-blue-500 py-10 flex items-center justify-center flex-col gap-4'>
                    <span className='bg-gray-100/40 p-3 rounded-2xl font-bold text-2xl'>ILA</span>
                    <div>
                        <h2 className='font-semibold text-2xl -mb-1'>ILA's tuition</h2>
                        <p className='text-sm text-zinc-300 tracking-tight'>Bhavnagar, Gujarat</p>
                    </div>
                </div>

                <div className='w-full my-10 px-8'>
                    <form onSubmit={onSubmit} className='w-full flex items-center flex-col justify-center gap-6'>
                        <div className='flex items-start justify-start flex-col w-full px-3'>
                            <label className='text-sm text-gray-100' htmlFor="name">Student ID</label>
                            <input onChange={onChangeHandler} value={data.studentId} type="text" id='name' name='studentId' placeholder='e.g. ILA-2024-047' className='ring ring-gray-400/70 w-full px-3 py-2 rounded-md bg-gray-500/30 text-md mt-2' required />
                        </div>

                        <div className='flex items-start justify-start flex-col w-full px-3'>
                            <label className='text-sm text-gray-100' htmlFor="password">Password</label>
                            <div className='relative w-full mt-2'>
                                <input onChange={onChangeHandler} value={data.password} type={showPassword ? 'text' : 'password'} id='password' name='password' placeholder='Enter password' className='ring ring-gray-400/70 w-full px-3 py-2 rounded-md bg-gray-500/30 text-md pr-12 accent-white' required />
                                <button
                                    type='button'
                                    onClick={() => setShowPassword(prev => !prev)}
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-200 hover:text-white'
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        <button type='submit' className='font-semibold w-1/2 ring ring-gray-400/40 py-3 rounded-lg hover:bg-zinc-700/30 cursor-pointer'>Login</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default LoginPage
