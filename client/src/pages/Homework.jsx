import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Context } from '../context/Context'
import Loader from '../components/Loader'

const Homework = () => {
  const { url, searchParams } = useContext(Context)
  const studentId = searchParams.get('studentId')

  const [pending, setPending] = useState([])
  const [completed, setCompleted] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [submittingId, setSubmittingId] = useState(null) // tracks which checkbox is mid-submit

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })

  const fetchHomework = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(url + '/api/homework/get-home-work')
      console.log(response);
      
      if (response.data.success) {
        const studentHomework = response.data.homeWorks.filter(
          (hw) => hw.studentId === studentId
        )

        const pendingList = []
        const completedList = []

        studentHomework.forEach((hw) => {
          const item = {
            _id: hw._id,
            subject: hw.subject,
            title: hw.description,
            dueDate: hw.date,
            due: `Due: ${formatDate(hw.date)}`,
          }

          if (hw.completed) {
            completedList.push({
              ...item,
              note: `Submitted: ${hw.submittedAt ? formatDate(hw.submittedAt) : formatDate(hw.date)}`,
            })
          } else {
            pendingList.push(item)
          }
        })

        setPending(pendingList)
        setCompleted(completedList)
      } else {
        setError(response.data.message || 'Failed to load homework')
      }
    } catch (err) {
      console.log(err)
      setError('Error fetching homework')
    } finally {
      setLoading(false)
    }
  }

  const markAsCompleted = async (item) => {
    setSubmittingId(item._id)

    // optimistic update — move it to Completed right away
    setPending((prev) => prev.filter((hw) => hw._id !== item._id))
    setCompleted((prev) => [
      { ...item, note: `Submitted: ${formatDate(new Date())}` },
      ...prev,
    ])

    try {
      const response = await axios.patch(url + `/api/homework/submit/${item._id}`, {
        studentId,
      })
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to submit')
      }
      toast.success('Homework submitted!')
    } catch (err) {
      console.log(err)
      // roll back on failure
      setCompleted((prev) => prev.filter((hw) => hw._id !== item._id))
      setPending((prev) => [item, ...prev])
      toast.error('Could not submit homework. Try again.')
    } finally {
      setSubmittingId(null)
    }
  }

  useEffect(() => {
    if (url && studentId) fetchHomework()
  }, [url, studentId])

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <div className='bg-zinc-800 border border-slate-700 rounded-3xl shadow-xl p-6 text-slate-100'>
        <div className='flex items-center justify-between mb-5'>
          <div>
            <p className='text-sm uppercase tracking-[0.4em] text-slate-400 mb-2'>Pending Homework</p>
            <h2 className='text-2xl font-semibold'>Homework</h2>
          </div>
        </div>

        {loading && <Loader text="Loading homework..." />}
        {error && <p className='text-sm text-red-400'>{error}</p>}

        {!loading && !error && (
          <>
            <div className='space-y-4'>
              {pending.length === 0 && (
                <p className='text-sm text-slate-400'>No pending homework 🎉</p>
              )}
              {pending.map((item) => {
                const isSubmitting = submittingId === item._id
                return (
                  <div key={item._id} className='rounded-2xl border border-[#6c757d]/80 bg-[#6c757d]/20 p-4'>
                    <div className='flex items-start gap-3'>
                      <input
                        type='checkbox'
                        checked={false}
                        disabled={isSubmitting}
                        onChange={() => markAsCompleted(item)}
                        className='w-6 h-6 rounded border-2 border-gray-500 text-sky-400 bg-slate-950 focus:ring-0 checked:bg-sky-400 checked:border-sky-400 disabled:opacity-50 cursor-pointer'
                      />
                      <div className='space-y-2 flex-1'>
                        <div className='flex items-center justify-between'>
                          <p className='text-xs uppercase tracking-[0.3em] text-sky-300'>{item.subject}</p>
                          {isSubmitting && (
                            <i className='bx bx-loader-alt bx-spin text-sky-300 text-sm'></i>
                          )}
                        </div>
                        <p className='font-medium text-slate-100'>{item.title}</p>
                        <p className='text-xs text-zinc-300'>{item.due}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className='mt-8 border-t border-slate-700/80 pt-6'>
              <div className='flex items-center gap-3 text-slate-300 mb-4'>
                <span className='inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sky-400'>
                  <i className='bx bx-check-circle text-xl' />
                </span>
                <p className='text-sm uppercase tracking-[0.4em]'>Completed</p>
              </div>

              <div className='space-y-3'>
                {completed.length === 0 && (
                  <p className='text-sm text-slate-400'>No completed homework yet.</p>
                )}
                {completed.map((item) => (
                  <div key={item._id} className='rounded-2xl border border-slate-700/80 bg-[#6c757d]/20 p-4'>
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
          </>
        )}
      </div>
    </div>
  )
}

export default Homework