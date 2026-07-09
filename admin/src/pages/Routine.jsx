import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context';
import axios from 'axios';
import toast from 'react-hot-toast';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Routine = () => {
    const { url } = useContext(Context);
    const [routine, setRoutine] = useState([]);
    const [routineData, setRoutineData] = useState({
        day: "",
        subject: "",
        startTime: "",
        endTime: ""
    });

    // track which item is being edited: { dayId, itemId }
    const [editing, setEditing] = useState(null);
    const [editValues, setEditValues] = useState({ subject: "", startTime: "", endTime: "" });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setRoutineData(routineData => ({ ...routineData, [name]: value }))
    }

    // Matches deleteItem controller (POST /api/routine/delete-item, body: { day, index })
    const handleDelete = async (day, index) => {
        try {
            const response = await axios.post(url + "/api/routine/delete-item", {
                day,
                index
            });

            if (response.data.success) {
                setRoutine(response.data.routines);
                toast.success("Class removed");
            } else {
                toast.error(response.data.message || "Failed to remove class");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to remove class");
        }
    };

    const addRoutine = async (e) => {
        e.preventDefault();

        if (!routineData.day || !routineData.subject || !routineData.startTime || !routineData.endTime) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            const response = await axios.post(url + "/api/routine/add-routine", routineData);
            if (response.data.success) {
                setRoutine(response.data.routines); // createSchedule returns { routines }, not { data }
                toast.success("Routine added successfully");
                setRoutineData({ day: "", subject: "", startTime: "", endTime: "" });
            } else {
                toast.error(response.data.message || "Routine not added");
            }
        } catch (error) {
            console.log(error);
            toast.error("Routine not added");
        }
    }

    const getRoutines = async () => {
        try {
            const response = await axios.get(url + "/api/routine/get-routine");

            if (response.data.success) {
                setRoutine(response.data.data);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to load routine");
        }
    }

    // --- Edit item (uses updateSchedule: PUT /api/routine/:id) ---
    const startEdit = (dayBlock, item) => {
        setEditing({ dayId: dayBlock._id, itemId: item._id });
        setEditValues({
            subject: item.subject,
            startTime: item.startTime,
            endTime: item.endTime
        });
    };

    const cancelEdit = () => {
        setEditing(null);
        setEditValues({ subject: "", startTime: "", endTime: "" });
    };

    const onEditChangeHandler = (e) => {
        const { name, value } = e.target;
        setEditValues(prev => ({ ...prev, [name]: value }));
    };

    const saveEdit = async (dayBlock) => {
        const updatedItems = dayBlock.items.map(item =>
            item._id === editing.itemId
                ? { ...item, ...editValues }
                : item
        );

        try {
            const response = await axios.put(url + `/api/routine/${dayBlock._id}`, {
                day: dayBlock.day,
                items: updatedItems
            });

            if (response.data.success) {
                setRoutine(prev =>
                    prev.map(d => d._id === dayBlock._id ? response.data.data : d)
                );
                toast.success("Class updated");
                cancelEdit();
            } else {
                toast.error(response.data.message || "Failed to update class");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update class");
        }
    };

    useEffect(() => {
        getRoutines();
    }, [])

    return (
        <div className='bg-zinc-800 w-full min-h-screen px-4 py-5'>
            <div className='ring ring-gray-400/40 bg-[#212529] px-3 py-3 rounded-lg'>
                <p className='flex items-center gap-2 text-white'>
                    <i className='bx bx-plus'></i>
                    <span>Add class routine</span>
                </p>
                <form onSubmit={addRoutine} className='flex items-center gap-2 flex-col mt-3'>
                    <select
                        name='day'
                        value={routineData.day}
                        onChange={onChangeHandler}
                        className='bg-zinc-800 text-white/40 px-3 py-2 rounded-md ring ring-gray-300/30 w-full'
                    >
                        <option value="">Select day</option>
                        {daysOfWeek.map((d) => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>

                    <input
                        name='subject'
                        value={routineData.subject}
                        onChange={onChangeHandler}
                        type="text"
                        placeholder='Subject'
                        className='w-full text-white px-3 py-2 rounded-md ring ring-gray-300/30'
                    />

                    <div className='flex items-center gap-2 w-full'>
                        <input
                            name='startTime'
                            value={routineData.startTime}
                            onChange={onChangeHandler}
                            type="text"
                            placeholder='Start time'
                            className='w-full text-white px-3 py-2 rounded-md ring ring-gray-300/30'
                        />
                        <input
                            name='endTime'
                            value={routineData.endTime}
                            onChange={onChangeHandler}
                            type="text"
                            placeholder='End time'
                            className='w-full text-white px-3 py-2 rounded-md ring ring-gray-300/30'
                        />
                    </div>

                    <button type='submit' className='w-full ring ring-gray-300/30 text-white text-md py-2 mt-3 rounded-lg hover:bg-gray-400/10 cursor-pointer'>Add to routine</button>
                </form>
            </div>

            <div className="ring ring-gray-400/40 bg-[#212529] px-3 py-3 rounded-lg mt-5 w-full">
                <div className="flex items-center gap-2 mb-5 text-white">
                    <i className='bx bx-calendar-detail text-2xl'></i>
                    <h1 className="text-neutral-100 font-semibold text-base">Weekly routine</h1>
                </div>

                <div className="space-y-5">
                    {(routine).map((dayBlock) => (
                        <div key={dayBlock.day}>
                            <p className='text-lg text-blue-500 font-semibold mb-2'>{dayBlock.day}</p>

                            <div className="space-y-2">
                                {dayBlock.items.map((item, index) => {
                                    const isEditing = editing && editing.dayId === dayBlock._id && editing.itemId === item._id;

                                    return (
                                        <div
                                            key={item._id || `${dayBlock.day}-${index}`}
                                            className="flex items-center justify-between bg-[#343a40] rounded-xl px-4 py-3"
                                        >
                                            {isEditing ? (
                                                <div className="flex items-center gap-2 w-full flex-wrap">
                                                    <input
                                                        name="subject"
                                                        value={editValues.subject}
                                                        onChange={onEditChangeHandler}
                                                        className="bg-zinc-800 text-white px-2 py-1 rounded-md ring ring-gray-300/30 flex-1 min-w-[100px]"
                                                    />
                                                    <input
                                                        name="startTime"
                                                        value={editValues.startTime}
                                                        onChange={onEditChangeHandler}
                                                        className="bg-zinc-800 text-white px-2 py-1 rounded-md ring ring-gray-300/30 w-24"
                                                    />
                                                    <input
                                                        name="endTime"
                                                        value={editValues.endTime}
                                                        onChange={onEditChangeHandler}
                                                        className="bg-zinc-800 text-white px-2 py-1 rounded-md ring ring-gray-300/30 w-24"
                                                    />
                                                    <button
                                                        onClick={() => saveEdit(dayBlock)}
                                                        className="px-3 py-1 rounded-md bg-green-600 text-white text-sm"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={cancelEdit}
                                                        className="px-3 py-1 rounded-md bg-neutral-600 text-white text-sm"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <div>
                                                        <p className="text-neutral-100 font-semibold text-sm">
                                                            {item.subject}
                                                        </p>
                                                        <p className="text-neutral-400 text-xs mt-1">
                                                            {item.startTime} - {item.endTime}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2 flex-shrink-0">
                                                        <button
                                                            onClick={() => startEdit(dayBlock, item)}
                                                            className="w-9 h-9 flex items-center justify-center rounded-lg border border-neutral-700 text-neutral-300 hover:bg-neutral-700/50 hover:text-blue-400 transition-colors"
                                                            aria-label={`Edit ${item.subject}`}
                                                        >
                                                            <i className='bx bx-edit'></i>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(dayBlock.day, index)}
                                                            className="w-9 h-9 flex items-center justify-center rounded-lg border border-neutral-700 text-neutral-300 hover:bg-neutral-700/50 hover:text-red-400 transition-colors"
                                                            aria-label={`Delete ${item.subject}`}
                                                        >
                                                            <i className='bx bx-trash'></i>
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {(!routine || routine.length === 0) && (
                        <p className="text-white text-sm text-center py-6">
                            No classes scheduled.
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Routine