import React, { useState } from 'react'
import LoginPage from './components/LoginPage'
import { assets, iconList } from './assets/assets'
import Home from './pages/Home';
import Attedence from './pages/Attedence';
import Results from './pages/Results';
import Homework from './pages/Homework';
import Fees from './pages/Fees';

const App = () => {
  const [isLogedIn, setIsLogedIn] = useState(true);
  const [menu, setMenu] = useState("home-work");
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
                        <div onClick={()=>setMenu(item.menu)} className='flex-1 w-36 flex items-center justify-center gap-2 ring ring-slate-300/30 px-5 py-1 rounded-md cursor-pointer hover:bg-zinc-900 transition-all duration-200'>
                            <i className={`${item.icon}`}></i>
                            <p>{item.title}</p>
                        </div>
                    )
                })}
            </div>

      {isLogedIn
        ? <>
          {menu === "home" ? <Home /> : ""}
          {menu === "attendence" ? <Attedence /> : ""}
          {menu === "results" ? <Results /> : ""}
          {menu === "home-work" ? <Homework /> : ""}
          {menu === "fees" ? <Fees /> : ""}
        </>
        : <LoginPage />
      }
    </div>
  )
}

export default App
