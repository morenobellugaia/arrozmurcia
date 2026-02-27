import { create } from 'zustand'

const useStore = create((set) => ({
    numberOfPeople: 1,
    setNumberOfPeople: (num) => set({ numberOfPeople: num }),
}))

export default useStore
