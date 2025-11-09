import { create } from 'zustand'

interface Store {
    navOpen: boolean,
    setNavOpen: (navOpen: boolean) => void

    galleryOpen: boolean,
    setGalleryOpen: (galleryOpen: boolean) => void

    galleryImages: { src: string; text: string }[]
    setGalleryImages: (galleryImages: { src: string; text: string }[]) => void

    galleryTitle: string,
    setGalleryTitle: (galleryTitle: string) => void

    isMobile: boolean | null,
    setIsMobile: (isMobile: boolean) => void

    loaded: boolean,
    setLoaded: (loaded: boolean) => void,

    walkBitmaps: ImageBitmap[] | null,        
    setWalkBitmaps: (walkBitmaps: ImageBitmap[]) => void 

    scrollTarget: string | null,
    setScrollTarget: (scrollTarget: string) => void

    overlayText: string | TrustedHTML,
    setOverlayText: (overlayText: string) => void
}

export const useStore = create<Store>((set) => ({
    navOpen: false,
    setNavOpen: (navOpen) => set({ navOpen }),

    galleryOpen: false,
    setGalleryOpen: (galleryOpen) => set({ galleryOpen }),

    galleryImages: [],
    setGalleryImages: (galleryImages) => set({ galleryImages }),

    galleryTitle: "",
    setGalleryTitle: (galleryTitle) => set({ galleryTitle }),

    isMobile: null,
    setIsMobile: (isMobile) => set({ isMobile }),

    loaded: false,
    setLoaded: (loaded) => set({ loaded }),

    walkBitmaps: null,
    setWalkBitmaps: (walkBitmaps) => set({ walkBitmaps }),

    scrollTarget: '',
    setScrollTarget: (scrollTarget) => set({ scrollTarget }),

    overlayText: null,
    setOverlayText: (overlayText) => set({ overlayText }),
}))