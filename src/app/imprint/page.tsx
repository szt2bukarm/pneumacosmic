"use client"
import { useLenis } from "@studio-freight/react-lenis";
import ImprintHeader from "../components/imprint/ImprintHeader";
import { useEffect } from "react";
import Footer from "../components/Footer/Footer";

export default function Page() {
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) return
        lenis?.scrollTo(0,{immediate: true})
        setTimeout(() => {
            lenis?.stop();
            setTimeout(() => {
                window.scrollTo(0,0)
            }, 25);
            setTimeout(() => {
                lenis?.start();
            }, 35);
        }, 5);
    },[lenis])



    return (
        <div className="w-full h-full">
            <ImprintHeader />
            <Footer />
        </div>
    )
}