import { create } from 'zustand'
import { taskService } from "../services/taskApi.jsx"

export const useTaskStore = create((set) => ({
    tasks: [],
    fetchTasks: async () => {
        const data = await taskService.getAll()
        set({ tasks: data.data })
    },
    addTask: (task) => {
        set((state) => ({ tasks: [...state.tasks, task] }))
    },
    updateTask: async (taskId, taskData) => {
        const updatedTask = await taskService.update(taskId, taskData)
        if (taskData.deadline === '') {
            set((state) => ({
                tasks: state.tasks.filter((task) => task.id !== taskId)
            }))
        } else {
            set((state) => ({
                tasks: state.tasks.map((task) => task.id === taskId ? updatedTask.data : task)
            }))
        }
    },
    checkOffTask: async (taskId, taskData) => {
        await taskService.update(taskId, taskData)
        set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== taskId)
        }))
    }
}))