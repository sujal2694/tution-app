import React from 'react'

const Homework = () => {
  const pending = [
    {
      subject: 'MATHS',
      title: 'Exercise 4.3 – Q1 to Q10 (Quadratic Equations)',
      due: 'Due: 12 Jun 2026',
    },
    {
      subject: 'SCIENCE',
      title: 'Draw and label diagram of Human Eye',
      due: 'Due: 13 Jun 2026',
    },
    {
      subject: 'ENGLISH',
      title: 'Write essay: “My Favourite Season” (200 words)',
      due: 'Due: 14 Jun 2026',
    },
  ]

  const completed = [
    {
      subject: 'MATHS',
      title: 'Ex 3.2 – Arithmetic Progressions',
      note: 'Submitted: 08 Jun 2026',
    },
    {
      subject: 'SCIENCE',
      title: 'Notes on Refraction of Light',
      note: 'Submitted: 07 Jun 2026',
    },
  ]

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <div className='bg-zinc-800 border border-slate-700 rounded-3xl shadow-xl p-6 text-slate-100'>
        <div className='flex items-center justify-between mb-5'>
          <div>
            <p className='text-sm uppercase tracking-[0.4em] text-slate-400 mb-2'>Pending Homework</p>
            <h2 className='text-2xl font-semibold'>Homework</h2>
          </div>
        </div>

        <div className='space-y-4'>
          {pending.map((item) => (
            <div key={item.title} className='rounded-2xl border border-[#6c757d]/80 bg-[#6c757d]/20 p-4'>
              <div className='flex items-start gap-3'>
                <input
                  type='checkbox'
                  className='w-6 h-6 rounded border-2 border-gray-500 text-sky-400 bg-slate-950 focus:ring-0 checked:bg-sky-400 checked:border-sky-400'
                />
                <div className='space-y-2'>
                  <p className='text-xs uppercase tracking-[0.3em] text-sky-300'>{item.subject}</p>
                  <p className='font-medium text-slate-100'>{item.title}</p>
                  <p className='text-xs text-zinc-300'>{item.due}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-8 border-t border-slate-700/80 pt-6'>
          <div className='flex items-center gap-3 text-slate-300 mb-4'>
            <span className='inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sky-400'>
              <i className='bx bx-check-circle text-xl' />
            </span>
            <p className='text-sm uppercase tracking-[0.4em]'>Completed</p>
          </div>

          <div className='space-y-3'>
            {completed.map((item) => (
              <div key={item.title} className='rounded-2xl border border-slate-700/80 bg-[#6c757d]/20 p-4'>
                <div className='flex items-center gap-3'>
                  <span className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300'>
                    <i className='bx bx-check text-sm' />
                  </span>
                  <div className='flex-1'>
                    <p className='text-xs uppercase tracking-[0.3em] text-emerald-400'>{item.subject}</p>
                    <p className='font-medium text-slate-100 line-through'>{item.title}</p>
                    <p className='text-xs text-zinc-300'>{item.note}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homework
