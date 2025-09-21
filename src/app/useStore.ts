import { create } from 'zustand'

interface Store {
    navOpen: boolean,
    setNavOpen: (navOpen: boolean) => void
}

export const useStore = create<Store>((set) => ({
    navOpen: false,
    setNavOpen: (navOpen) => set({ navOpen })
}))