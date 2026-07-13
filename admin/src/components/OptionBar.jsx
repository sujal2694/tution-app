import React from 'react'
import { iconList } from '../assets/assets'

const OptionBar = ({ setMenu }) => {
  return (
    <div className='flex items-center gap-4 overflow-scroll scrollbar-none px-2 py-4 bg-zinc-800 text-white border-b-2 border-gray-300/30'>
      {iconList.map((icon, index) => (
        <div onClick={() => setMenu(icon.menu)} key={index} className='ring ring-gray-300/40 px-4 py-2 rounded-lg hover:bg-gray-500/20 cursor-pointer'>
          <div className='flex items-center gap-2'>
            <i className={`${icon.icon} text-2xl`}></i>
            <p className='text-xl tracking-wide'>{icon.title}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default OptionBar
