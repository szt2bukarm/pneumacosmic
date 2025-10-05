import { create } from 'zustand'

interface Store {
    navOpen: boolean,
    setNavOpen: (navOpen: boolean) => void

    galleryOpen: boolean,
    setGalleryOpen: (galleryOpen: boolean) => void

    galleryImages: string[],
    setGalleryImages: (galleryImages: string[]) => void,

    isMobile: boolean | null,
    setIsMobile: (isMobile: boolean) => void
}

export const useStore = create<Store>((set) => ({
    navOpen: false,
    setNavOpen: (navOpen) => set({ navOpen }),

    galleryOpen: false,
    setGalleryOpen: (galleryOpen) => set({ galleryOpen }),

    galleryImages: [],
    setGalleryImages: (galleryImages) => set({ galleryImages }),

    isMobile: null,
    setIsMobile: (isMobile) => set({ isMobile })
}))