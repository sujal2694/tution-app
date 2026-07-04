import React from 'react'
import LoginPage from './components/LoginPage'
import { assets, iconList } from './assets/assets'

const App = () => {
  return (
    <div className='min-h-screen w-screen bg-zinc-900/85 overflow-scroll scrollbar-none'>
      
      <div className=' bg-gradient-to-r from-blue-950 to-blue-400 py-8'>
        <div className='w-full flex items-center justify-between px-5'>
          <div className='py-10 flex items-center gap-4 px-5'>
            <span className='bg-gray-100/40 p-3 font-bold text-2xl rounded-2xl'>ILA</span>
            <div>
              <h2 className='font-semibold text-2xl -mb-1'>ILA's tuition</h2>
              <p className='text-sm text-zinc-300 tracking-tight'>Bhavnagar, Gujarat</p>
            </div>
          </div>
          <div className='text-lg p-2 ring ring-gray-50/50 w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-white/20'>
            <i className='bx bx-bell-ring'></i>
          </div>
        </div>

        <div className='flex items-center gap-8 mx-5 p-5 bg-white/20 rounded-2xl'>
          <img className='w-16 aspect-square rounded-full' src={assets.letter_R} alt='R' />
          <div className='leading-5'>
            <p className='text-2xl font-bold'>Riya Shah</p>
            <p className='text-sm'>Student ID: ILA-2024-047</p>
            <div className='bg-white/30 w-fit px-3 py-1 rounded-full text-[12px] font-bold'>
              <p>Std 10 · Science</p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex items-center gap-5 py-5 px-3 overflow-scroll scrollbar-none'>
        {iconList.map((item) => {
          return (
            <div className='flex-1 w-36 flex items-center justify-center gap-2 ring ring-slate-300/30 px-5 py-1 rounded-md cursor-pointer hover:bg-zinc-900 transition-all duration-200'>
              <i className={`${item.icon}`}></i>
              <p>{item.title}</p>
            </div>
          )
        })}
      </div>

      <div className='grid grid-cols-2 gap-5 text-center my-10 px-5'>
        <div className='bg-zinc-800 rounded-2xl py-5'>
          <span className='text-3xl text-blue-400 font-semibold'>85%</span>
          <p className='text-sm'>Attendence</p>
        </div>
        <div className='bg-zinc-800 rounded-2xl py-5'>
          <span className='text-3xl text-blue-400 font-semibold'>78%</span>
          <p className='text-sm'>Average Score</p>
        </div>
        <div className='bg-zinc-800 rounded-2xl py-5'>
          <span className='text-3xl text-blue-400 font-semibold'>3</span>
          <p className='text-sm'>Pending Homework</p>
        </div>
        <div className='bg-zinc-800 rounded-2xl py-5'>
          <span className='text-3xl text-blue-400 font-semibold'>₹500</span>
          <p className='text-sm'>Fees due</p>
        </div>
      </div>

      <div className='mx-5 ring ring-gray-200/50 rounded-lg flex items-start justify-start flex-col px-5 py-8'>
        <div className='flex items-center gap-2'>
          <i className='bx bx-announcement text-2xl'></i>
          <p>Latest notices</p>
        </div>

        <div className='bg-zinc-800 rounded-2xl py-5 px-4 w-full border-l-8 mt-5 border-blue-400'>
          <span className='text-sm text-gray-200/60'>10 jun - 2026</span>
          <h2 className='text-xl font-bold'>Unit Test - Maths & Science</h2>
          <p className='text-sm font-semibold text-gray-200/60'>Scheuled for 15 June 2026. Syllabus: ch 1 - 4.</p>
        </div>

        <div className='bg-zinc-800 rounded-2xl py-5 px-4 w-full border-l-8 mt-5 border-blue-400'>
          <span className='text-sm text-gray-200/60'>08 jun - 2026</span>
          <h2 className='text-xl font-bold'>Holiday - Monday</h2>
          <p className='text-sm font-semibold text-gray-200/60'>No classes on 09 June, Batch resumes Tuesday</p>
        </div>
      </div>

      <div className='mx-5 my-5 ring ring-gray-200/50 rounded-lg flex items-start justify-start flex-col px-5 py-8'>
        <div className='flex items-center gap-2'>
          <i className='bx bx-clock text-2xl'></i>
          <p>Today' schedule</p>
        </div>

        <ul className='w-full mt-5 px-5'>
          <li className='flex items-center justify-between py-3 border-b border-gray-200/40'>
            <p className='text-xl'>Maths</p>
            <span className='text-sm text-gray-300'>4:00 - 5:00 PM</span>
          </li>
          <li className='flex items-center justify-between py-3 border-b border-gray-200/40'>
            <p className='text-xl'>Science</p>
            <span className='text-sm text-gray-300'>5:00 - 6:00 PM</span>
          </li>
          <li className='flex items-center justify-between py-3'>
            <p className='text-xl'>English</p>
            <span className='text-sm text-gray-300'>6:00 - 7:00 PM</span>
          </li>
        </ul>
      </div>

    </div>
  )
}

export default App
