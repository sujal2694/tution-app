import React from 'react'

const Fees = () => {
  const statement = [
    { label: 'April Fees', amount: '₹1000', status: 'Paid', statusClass: 'text-emerald-400' },
    { label: 'May Fees', amount: '₹1000', status: 'Paid', statusClass: 'text-emerald-400' },
    { label: 'June Fees', amount: '₹500', status: 'Due', statusClass: 'text-rose-500' },
    { label: 'Study Material', amount: '₹1500', status: 'Paid', statusClass: 'text-emerald-400' },
  ]

  const history = [
    { date: '01 May 2026', amount: '₹1000' },
    { date: '02 Apr 2026', amount: '₹1000' },
    { date: '15 Mar 2026', amount: '₹1500' },
  ]

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <div className='grid gap-6'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='rounded-3xl border border-slate-700/80 bg-zinc-800 p-5 text-center shadow-lg'>
            <p className='text-3xl font-semibold text-emerald-400'>₹3500</p>
            <p className='mt-2 text-sm text-zinc-400'>Paid</p>
          </div>
          <div className='rounded-3xl border border-slate-700/80 bg-zinc-800 p-5 text-center shadow-lg'>
            <p className='text-3xl font-semibold text-rose-500'>₹500</p>
            <p className='mt-2 text-sm text-zinc-400'>Due</p>
          </div>
        </div>

        <div className='rounded-3xl border border-slate-700/80 bg-zinc-800 p-6 shadow-lg'>
          <div className='flex items-center gap-3 border-b border-zinc-400/80 pb-4 mb-4'>
            <span className='inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-200/10 text-zinc-200'>
              <i className='bx bx-file-detail text-xl' />
            </span>
            <div>
              <p className='text-sm uppercase tracking-[0.25em] text-zinc-200'>Fee Statement - 2026</p>
            </div>
          </div>

          <div className='space-y-3'>
            {statement.map((item) => (
              <div key={item.label} className='flex items-center justify-between'>
                <p className='text-sm text-slate-200'>{item.label}</p>
                <div className='flex items-center gap-2'>
                  <p className={`text-sm font-medium ${item.statusClass}`}>{item.amount}</p>
                  <p className={`text-sm ${item.statusClass}`}>{item.status}</p>
                </div>
              </div>
            ))}

            <div className='flex items-center justify-between border-t border-zinc-300/80 pt-4 mt-4'>
              <p className='text-sm font-semibold text-slate-200'>Total Due</p>
              <p className='text-sm font-semibold text-rose-500'>₹500</p>
            </div>
          </div>
        </div>

        <div className='rounded-3xl border border-slate-700/80 bg-zinc-800 p-6 shadow-lg'>
          <div className='flex items-center gap-3 border-b border-zinc-300/80 pb-4 mb-4'>
            <span className='inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-200/10 text-slate-100'>
              <i className='bx bx-history text-xl' />
            </span>
            <div>
              <p className='text-sm uppercase tracking-[0.25em] text-zinc-200'>Payment History</p>
            </div>
          </div>

          <div className='space-y-3'>
            {history.map((item) => (
              <div key={item.date} className='flex items-center justify-between text-sm text-slate-200'>
                <p>{item.date}</p>
                <p className='text-emerald-400'>{item.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Fees
