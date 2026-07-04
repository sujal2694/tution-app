import React from 'react'

const Results = () => {
    const subjects = [
        { name: 'Maths', score: 88 },
        { name: 'Science', score: 82 },
        { name: 'English', score: 71 },
        { name: 'Social Science', score: 79 },
        { name: 'Gujarati', score: 84 },
    ]

    const getScoreColor = (score) => {
        if (score > 75) return 'text-green-500'
        if (score > 50) return 'text-orange-500'
        return 'text-red-500'
    }

    const total = subjects.reduce((sum, item) => sum + item.score, 0)
    const percentage = ((total / (subjects.length * 100)) * 100).toFixed(2)

    return (
        <div>
            <div className='ring ring-gray-200/50 rounded-lg w-[90vw] m-auto p-5'>
                <div className='flex items-center gap-2'>
                    <i className='bx bx-trophy text-2xl'></i>
                    <p>Latest Test - May 2026</p>
                </div>

                <div>
                    <ul className='w-full mt-5 px-2'>
                        {subjects.map((subject) => (
                            <li key={subject.name} className='flex items-center justify-between pb-1 border-b border-gray-200/40 mt-3'>
                                <p className='text-md'>{subject.name}</p>
                                <span className={`${getScoreColor(subject.score)} text-sm`}>{subject.score}/100</span>
                            </li>
                        ))}
                        <li className='flex items-center justify-between pt-3'>
                            <p className='font-semibold text-xl'>Total</p>
                            <span className='text-sm text-white font-semibold tracking-wide'>{total}/500</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className='ring ring-gray-200/50 rounded-lg w-[90vw] m-auto p-5 mt-5'>
                <div className='flex items-center gap-2'>
                    <i className='bx bx-trending-up text-2xl'></i>
                    <p>Progress (Last 3 Tests)</p>
                </div>
                <div className='mt-3'>
                    <p className='w-full flex items-center justify-between text-white text-sm font-semibold'>March <span>{percentage}%</span></p>
                    <progress value={percentage} max={100} className='w-full rounded-2xl' />
                </div>
            </div>
        </div>
    )
}

export default Results
