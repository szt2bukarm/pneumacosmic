"use client"

import { useLenis } from "@studio-freight/react-lenis";
import { useEffect } from "react";

export default function HomeLogic() {
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) return
        lenis?.scrollTo(0, { immediate: true })
        setTimeout(() => {
            lenis?.stop();
            setTimeout(() => {
                window.scrollTo(0, 0)
                lenis?.start();
            }, 10);
        }, 5);
    }, [lenis])

    return null;
}
