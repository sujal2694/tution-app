import React, { useState } from 'react'
import LoginPage from './components/LoginPage'
import { assets, iconList } from './assets/assets'
import Home from './pages/Home';
import Attedence from './pages/Attedence';
import Homework from './pages/Homework';
import Fees from './pages/Fees';
import { Toaster, toast } from 'react-hot-toast'
import { useContext, useEffect } from 'react';
import { Context } from './context/Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const { token, setToken, searchParams, url, clearSearchParams } = useContext(Context);
  const [menu, setMenu] = useState("home");
  const [student, setStudent] = useState([]);
  const [loggingOut, setLoggingOut] = useState(false);
  const studentId = searchParams.get("studentId");
  const navigate = useNavigate();

  const fetchUser = () => {
    let newToken = localStorage.getItem("token");
    setToken(newToken);
  }

  const logOut = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      localStorage.removeItem("token");
      setToken(null);
      clearSearchParams();      // 👈 strips ?studentId=... etc from the URL
      toast.success("Logged out successfully");
      navigate("/");            // ensures path also resets to "/"
    } catch (error) {
      toast.error("Something went wrong while logging out");
    } finally {
      setLoggingOut(false);
    }
  }

  const fetchStudents = async () => {
    try {
      const response = await axios.get(url + "/api/student/students");
      if (response.data.success) {
        setStudent(response.data.students);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
    fetchStudents()
  }, [])

  return (
    <div className='min-h-screen w-screen bg-zinc-900/85 overflow-scroll scrollbar-none'>
      {token
        ? <>
          <div className=' bg-gradient-to-r from-blue-950 to-blue-400 py-8'>
            <div className='w-full flex items-center justify-between px-5'>
              <div className='py-10 flex items-center gap-4 px-5'>
                <span className='bg-gray-100/40 p-3 font-bold text-2xl rounded-2xl'>ILA</span>
                <div>
                  <h2 className='font-semibold text-2xl -mb-1'>ILA's tuition</h2>
                  <p className='text-sm text-zinc-300 tracking-tight'>Bhavnagar, Gujarat</p>
                </div>
              </div>
              <div
                onClick={logOut}
                aria-disabled={loggingOut}
                className={`text-lg p-2 ring ring-gray-50/50 w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200
                  ${loggingOut ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:bg-white/20'}`}
              >
                {loggingOut
                  ? <i className='bx bx-loader-alt bx-spin'></i>
                  : <i className='bx bx-arrow-out-right-square-half'></i>
                }
              </div>
            </div>

            <div className='flex items-center gap-8 mx-5 p-5 bg-white/20 rounded-2xl'>
              {student.map((item) => (
                item.studentId === studentId && (
                  <div key={item._id} className='flex items-center gap-5'>
                    <img className='w-16 aspect-square rounded-full' src={assets.letter_R} alt='R' />
                    <div className='leading-5'>
                      <p className='text-2xl font-bold'>{item.fullName}</p>
                      <p className='text-sm'>Student ID: {item.studentId}</p>
                      <div className='bg-white/30 w-fit px-3 py-1 rounded-full text-[12px] font-bold'>
                        <p>{item.standard}</p>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>

          <div className='flex items-center gap-5 py-5 px-3 overflow-scroll scrollbar-none'>
            {iconList.map((item) => (
              <div
                key={item.menu}
                onClick={() => setMenu(item.menu)}
                className='flex-1 w-36 flex items-center justify-center gap-2 ring ring-slate-300/30 px-5 py-1 rounded-md cursor-pointer hover:bg-zinc-900 transition-all duration-200'
              >
                <i className={`${item.icon}`}></i>
                <p>{item.title}</p>
              </div>
            ))}
          </div>
          {menu === "home" && <Home />}
          {menu === "attendence" && <Attedence />}
          {menu === "home-work" && <Homework />}
          {menu === "fees" && <Fees />}
        </>
        : <LoginPage />
      }
      <Toaster />
    </div>
  )
}

export default App