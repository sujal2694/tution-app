import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Context } from '../context/Context'
import Loader from '../components/Loader'

const Fees = () => {
  const { url, searchParams } = useContext(Context)
  const studentId = searchParams.get('studentId')

  const [fees, setFees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchFees = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(url + `/api/fees/student/${studentId}`)
      if (response.data.success) {
        setFees(response.data.data)
      } else {
        setFees([])
        setError(response.data.message || 'Failed to load fees')
      }
    } catch (err) {
      console.log(err)
      if (err.response?.status === 404) {
        setFees([])
      } else {
        setError('Error fetching fees')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (url && studentId) fetchFees()
  }, [url, studentId])

  const statement = fees.map((fee) => ({
    _id: fee._id,
    label: `${fee.month} Fees`,
    amount: `₹${fee.amount}`,
    status: fee.status,
    statusClass: fee.status === 'paid' ? 'text-emerald-400' : 'text-rose-500',
  }))

  const history = fees
    .filter((fee) => fee.status === 'paid')
    .map((fee) => ({
      _id: fee._id,
      date: fee.month,
      amount: `₹${fee.amount}`,
    }))

  const totalPaid = fees
    .filter((fee) => fee.status === 'paid')
    .reduce((sum, fee) => sum + Number(fee.amount || 0), 0)

  const totalDue = fees
    .filter((fee) => fee.status !== 'paid')
    .reduce((sum, fee) => sum + Number(fee.amount || 0), 0)

  if (loading) return <Loader text="Loading fees..." />;

  return (
    <div className='max-w-4xl mx-auto p-4'>
      {error && <p className='text-sm text-red-400 text-center mb-4'>{error}</p>}

      {!error && (
        <div className='grid gap-6'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='rounded-3xl border border-slate-700/80 bg-zinc-800 p-5 text-center shadow-lg'>
              <p className='text-3xl font-semibold text-emerald-400'>₹{totalPaid}</p>
              <p className='mt-2 text-sm text-zinc-400'>Paid</p>
            </div>
            <div className='rounded-3xl border border-slate-700/80 bg-zinc-800 p-5 text-center shadow-lg'>
              <p className='text-3xl font-semibold text-rose-500'>₹{totalDue}</p>
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
              {statement.length === 0 && (
                <p className='text-sm text-slate-400'>No fee records found.</p>
              )}
              {statement.map((item) => (
                <div key={item._id} className='flex items-center justify-between'>
                  <p className='text-sm text-slate-200'>{item.label}</p>
                  <div className='flex items-center gap-2'>
                    <p className={`text-sm font-medium ${item.statusClass}`}>{item.amount}</p>
                    <p className={`text-sm ${item.statusClass}`}>{item.status}</p>
                  </div>
                </div>
              ))}

              <div className='flex items-center justify-between border-t border-zinc-300/80 pt-4 mt-4'>
                <p className='text-sm font-semibold text-slate-200'>Total Due</p>
                <p className='text-sm font-semibold text-rose-500'>₹{totalDue}</p>
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
              {history.length === 0 && (
                <p className='text-sm text-slate-400'>No payments recorded yet.</p>
              )}
              {history.map((item) => (
                <div key={item._id} className='flex items-center justify-between text-sm text-slate-200'>
                  <p>{item.date}</p>
                  <p className='text-emerald-400'>{item.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Fees