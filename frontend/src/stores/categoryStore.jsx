import { create } from 'zustand'
import { categoryService } from "../services/categoryApi.jsx"

export const useCategoryStore = create((set) => ({
    categories: [],
    fetchCategories: async () => {
        const data = await categoryService.getAll()
        set({ categories: data.data})
    },
    addCategory: (category) => {
        set((state) => ({ categories: [...state.categories, category] }))
    },
    deleteCategory: async (categoryId) => {
        await categoryService.delete(categoryId)
        set((state) => ({
            categories: state.categories.filter((category) => category.id !== categoryId)
        }))
    }
}))