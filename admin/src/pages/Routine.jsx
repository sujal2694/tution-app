import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../components/Loader'

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Routine = () => {
    const { url } = useContext(Context);
    const [routine, setRoutine] = useState([]);
    const [routineData, setRoutineData] = useState({
        day: "",
        subject: "",
        startTime: "",
        endTime: "",
        standard: ""
    });
    const [loadingList, setLoadingList] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [deletingKey, setDeletingKey] = useState(null); // `${day}-${index}`
    const [savingEdit, setSavingEdit] = useState(false);

    const [editing, setEditing] = useState(null);
    const [editValues, setEditValues] = useState({ subject: "", startTime: "", endTime: "" });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setRoutineData(routineData => ({ ...routineData, [name]: value }))
    }

    const handleDelete = async (day, index) => {
        const key = `${day}-${index}`;
        if (deletingKey) return;
        setDeletingKey(key);
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
        } finally {
            setDeletingKey(null);
        }
    };

    const addRoutine = async (e) => {
        e.preventDefault();

        if (!routineData.day || !routineData.subject || !routineData.startTime || !routineData.endTime) {
            toast.error("Please fill all fields");
            return;
        }

        setSubmitting(true);
        try {
            const response = await axios.post(url + "/api/routine/add-routine", routineData);
            if (response.data.success) {
                setRoutine(response.data.routines);
                toast.success("Routine added successfully");
                setRoutineData({ day: "", subject: "", startTime: "", endTime: "" });
            } else {
                toast.error(response.data.message || "Routine not added");
            }
        } catch (error) {
            console.log(error);
            toast.error("Routine not added");
        } finally {
            setSubmitting(false);
        }
    }

    const getRoutines = async () => {
        setLoadingList(true);
        try {
            const response = await axios.get(url + "/api/routine/get-routine");

            if (response.data.success) {
                setRoutine(response.data.data);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to load routine");
        } finally {
            setLoadingList(false);
        }
    }

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

        setSavingEdit(true);
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
        } finally {
            setSavingEdit(false);
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
                        name="standard"
                        value={routineData.standard}
                        onChange={onChangeHandler}
                        disabled={submitting}
                        className='bg-zinc-800 text-white/40 px-3 py-2 rounded-md ring ring-gray-300/30 w-full disabled:opacity-50'
                    >
                        <option value="">Select standard</option>
                        <option value="lkg">LKG</option>
                        <option value="ukg">UKG</option>
                        <option value="std-1">Std 1</option>
                        <option value="std-2">Std 2</option>
                        <option value="std-3">Std 3</option>
                        <option value="std-4">Std 4</option>
                        <option value="std-5">Std 5</option>
                        <option value="std-6">Std 6</option>
                        <option value="std-7">Std 7</option>
                        <option value="std-8">Std 8</option>
                    </select>
                    <select
                        name='day'
                        value={routineData.day}
                        onChange={onChangeHandler}
                        disabled={submitting}
                        className='bg-zinc-800 text-white/40 px-3 py-2 rounded-md ring ring-gray-300/30 w-full disabled:opacity-50'
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
                        disabled={submitting}
                        type="text"
                        placeholder='Subject'
                        className='w-full text-white px-3 py-2 rounded-md ring ring-gray-300/30 disabled:opacity-50'
                    />

                    <div className='flex items-center gap-2 w-full'>
                        <input
                            name='startTime'
                            value={routineData.startTime}
                            onChange={onChangeHandler}
                            disabled={submitting}
                            type="text"
                            placeholder='Start time'
                            className='w-full text-white px-3 py-2 rounded-md ring ring-gray-300/30 disabled:opacity-50'
                        />
                        <input
                            name='endTime'
                            value={routineData.endTime}
                            onChange={onChangeHandler}
                            disabled={submitting}
                            type="text"
                            placeholder='End time'
                            className='w-full text-white px-3 py-2 rounded-md ring ring-gray-300/30 disabled:opacity-50'
                        />
                    </div>

                    <button
                        type='submit'
                        disabled={submitting}
                        className='w-full ring ring-gray-300/30 text-white text-md py-2 mt-3 rounded-lg hover:bg-gray-400/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                    >
                        {submitting && <i className='bx bx-loader-alt bx-spin'></i>}
                        {submitting ? 'Adding...' : 'Add to routine'}
                    </button>
                </form>
            </div>

            <div className="ring ring-gray-400/40 bg-[#212529] px-3 py-3 rounded-lg mt-5 w-full">
                <div className="flex items-center gap-2 mb-5 text-white">
                    <i className='bx bx-calendar-detail text-2xl'></i>
                    <h1 className="text-neutral-100 font-semibold text-base">Weekly routine</h1>
                </div>

                {loadingList && <Loader text="Loading routine..." />}

                {!loadingList && (
                    <div className="space-y-5">
                        {(routine).map((dayBlock) => (
                            <div key={dayBlock.day}>
                                <p className='text-lg text-blue-500 font-semibold mb-2'>{dayBlock.day}</p>

                                <div className="space-y-2">
                                    {dayBlock.items.map((item, index) => {
                                        const isEditing = editing && editing.dayId === dayBlock._id && editing.itemId === item._id;
                                        const isDeleting = deletingKey === `${dayBlock.day}-${index}`;

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
                                                            disabled={savingEdit}
                                                            className="bg-zinc-800 text-white px-2 py-1 rounded-md ring ring-gray-300/30 flex-1 min-w-[100px] disabled:opacity-50"
                                                        />
                                                        <input
                                                            name="startTime"
                                                            value={editValues.startTime}
                                                            onChange={onEditChangeHandler}
                                                            disabled={savingEdit}
                                                            className="bg-zinc-800 text-white px-2 py-1 rounded-md ring ring-gray-300/30 w-24 disabled:opacity-50"
                                                        />
                                                        <input
                                                            name="endTime"
                                                            value={editValues.endTime}
                                                            onChange={onEditChangeHandler}
                                                            disabled={savingEdit}
                                                            className="bg-zinc-800 text-white px-2 py-1 rounded-md ring ring-gray-300/30 w-24 disabled:opacity-50"
                                                        />
                                                        <button
                                                            onClick={() => saveEdit(dayBlock)}
                                                            disabled={savingEdit}
                                                            className="px-3 py-1 rounded-md bg-green-600 text-white text-sm disabled:opacity-50 flex items-center gap-1"
                                                        >
                                                            {savingEdit && <i className='bx bx-loader-alt bx-spin'></i>}
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={cancelEdit}
                                                            disabled={savingEdit}
                                                            className="px-3 py-1 rounded-md bg-neutral-600 text-white text-sm disabled:opacity-50"
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
                                                                disabled={isDeleting}
                                                                className="w-9 h-9 flex items-center justify-center rounded-lg border border-neutral-700 text-neutral-300 hover:bg-neutral-700/50 hover:text-blue-400 transition-colors disabled:opacity-50"
                                                                aria-label={`Edit ${item.subject}`}
                                                            >
                                                                <i className='bx bx-edit'></i>
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(dayBlock.day, index)}
                                                                disabled={isDeleting}
                                                                className="w-9 h-9 flex items-center justify-center rounded-lg border border-neutral-700 text-neutral-300 hover:bg-neutral-700/50 hover:text-red-400 transition-colors disabled:opacity-50"
                                                                aria-label={`Delete ${item.subject}`}
                                                            >
                                                                {isDeleting
                                                                    ? <i className='bx bx-loader-alt bx-spin'></i>
                                                                    : <i className='bx bx-trash'></i>
                                                                }
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
                )}
            </div>
        </div>
    )
}

export default Routine