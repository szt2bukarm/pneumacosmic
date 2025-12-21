"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "@studio-freight/react-lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useStore } from "../useStore";

export default function TransitionManager() {
    const pathname = usePathname();
    const lenis = useLenis();
    const { setNavOpen } = useStore();

    useEffect(() => {
        const cleanup = setTimeout(() => {
            window.scrollTo(0, 0);
            ScrollTrigger.refresh();
            setNavOpen(false);
        }, 100); // Small delay to ensure new content is rendered

        return () => clearTimeout(cleanup);
    }, [pathname, lenis, setNavOpen]);

    return null;
}
