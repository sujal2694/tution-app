import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Context } from '../context/Context'
import Loader from '../components/Loader'

const Homework = () => {
  const { url, searchParams } = useContext(Context)

  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const studentId = searchParams.get("student");
  const stds = [];

  const fetchStudents = async () => {
    try {
      const res = await axios.get(url + "/api/student/students");
      if (res.data.success) {
        res.data.students.forEach((student) => {
          stds.push({
            std: student.standard
          })
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchHomework = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(url + '/api/homework/get-home-work')
      if (response.data.success) {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const homeWorkList = []

        response.data.homeWorks.forEach((hw) => {
          const dueDate = new Date(hw.date)
          const formatted = dueDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })

          const isStd = stds.forEach((std) => { std === hw.standard })
          
          if (!(isStd)) {
            const studentStd = String(hw.standard).replace("std-","");
            homeWorkList.push({
              _id: hw._id,
              subject: hw.subject,
              title: hw.description,
              due: `${formatted}`,
              standard: studentStd,
            })
          }


        })

        setPending(homeWorkList)
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

  useEffect(() => {
    if (url) fetchHomework()
    fetchStudents()
  }, [url])

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <div className='bg-zinc-800 border border-slate-700 rounded-3xl shadow-xl p-6 text-slate-100'>
        <div className='flex items-center justify-between mb-5'>
          <div>
            <p className='text-sm uppercase tracking-[0.4em] text-slate-400 mb-2'>standard - {pending.map((item)=>(item.standard))}</p>
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
              {pending.map((item) => (
                <div key={item._id} className='rounded-2xl border border-[#6c757d]/80 bg-[#6c757d]/20 p-4'>
                  <div className='flex items-start gap-3'>
                    <div className='space-y-2'>
                      <p className='text-xs uppercase tracking-[0.3em] text-sky-300'>{item.subject}</p>
                      <p className='font-medium text-slate-100'>{item.title}</p>
                      <p className='text-xs text-zinc-300'>{item.due}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Homework