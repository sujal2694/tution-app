import React, { useState } from 'react'
import OptionBar from './components/OptionBar'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home';
import Students from './pages/Students';
import Routine from './pages/Routine';
import Attendence from './pages/Attendence';
import HomeWork from './pages/HomeWork';
import Fees from './pages/Fees';
import Notices from './pages/Notices';
import Loader from './components/Loader'

const App = () => {
  const [menu, setMenu] = useState("home");
  const [menuLoading, setMenuLoading] = useState(false);

  const handleMenuChange = (newMenu) => {
    if (newMenu === menu) return;
    setMenuLoading(true);
    setMenu(newMenu);
    // brief delay so the switch feels intentional rather than instant/jarring
    setTimeout(() => setMenuLoading(false), 250);
  }

  return (
    <div>
      <div className='bg-blue-800 py-2'>
        <div className='w-full flex items-center justify-between px-5'>
          <div className='py-3 flex items-center gap-4 px-5'>
            <span className='bg-gray-100/40 p-3 font-bold text-2xl text-white rounded-2xl'>ILA</span>
            <div>
              <h2 className='font-semibold text-2xl text-white -mb-1'>ILA's tuition</h2>
              <p className='text-sm text-zinc-300 tracking-tight'>Bhavnagar, Gujarat</p>
            </div>
          </div>
          <div className='text-lg p-2 ring ring-gray-50/50 w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-white/20'>
            <i className='bx bx-arrow-out-right-square-half text-white'></i>
          </div>
        </div>
      </div>
      <OptionBar setMenu={handleMenuChange} />

      {menuLoading ? (
        <div className='bg-zinc-800 min-h-screen'>
          <Loader text="Loading..." />
        </div>
      ) : (
        <>
          {menu === "home" && <Home />}
          {menu === "attendence" && <Attendence />}
          {menu === "routine" && <Routine />}
          {menu === "home-work" && <HomeWork />}
          {menu === "notices" && <Notices />}
          {menu === "fees" && <Fees />}
          {menu === "students" && <Students />}
        </>
      )}
      <Toaster />
    </div>
  )
}

export default App