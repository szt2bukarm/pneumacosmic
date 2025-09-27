"use client"
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import gsap from 'gsap'
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useLenis } from "@studio-freight/react-lenis";
import { useStore } from "./useStore";
gsap.registerPlugin(ScrollTrigger);

export default function TransitionLink({ href, children,data, className }: {
    href: string;
    children: React.ReactNode;
    data?: any
    className?: string;
}) {
    const Router = useTransitionRouter();
    const {navOpen,setNavOpen} = useStore();
    const pathname = usePathname();
    const lenis = useLenis();

    const animation = () => {
 

            document.documentElement.animate([
                { 
                    transform: "translateY(0)",
                    filter: "blur(0px)",
                    opacity: 1
                },
                { 
                    transform: "translateY(-150px)",
                    filter: "blur(10px)",
                    opacity: 0
                }
            ], {
                duration: 1200,
                easing: "cubic-bezier(0.76, 0, 0.24, 1)",
                fill: "forwards",
                pseudoElement: "::view-transition-old(root)",
            });
        
            document.documentElement.animate([
                {
                    transform: `translateY(100px) scale(1.2)`,
                    filter: "blur(3px)",
                    opacity: 0,
                }
            ], {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition-new(root)",
            });
        
            document.documentElement.animate([
                {
                    transform: `translateY(100px) scale(1.2)`,
                    filter: "blur(3px)",
                    opacity: 0,
                },
                {
                    transform: "translate(0, 0) scale(1)",
                    filter: "blur(0px)",
                    opacity: 1,
                }
            ], {
                duration: 1200,
                easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                fill: "forwards",
                pseudoElement: "::view-transition-new(root)",
                delay: 800, 
            }); 
            setTimeout(() => {
                lenis?.stop();
                setTimeout(() => {
                    window.scrollTo(0, 0);
                    lenis?.start();
                    ScrollTrigger.refresh();
                },1)
            }, 1); 
    };
    
    return (
        <Link data-gsap={data} href={href} onClick={(e) => {
            e.preventDefault();
            if (pathname === href) return;
            document.querySelector('[data-element="vignette"]')?.classList.add("show-vignette")
            setTimeout(() => {
                Router.push(href, {
                    onTransitionReady: animation
                });
            }, navOpen ? 10 : 20);
            setTimeout(() => {
            setNavOpen(false)
            }, 30);
            // setTimeout(() => {
            //     document.querySelector('[data-element="vignette"]')?.classList.remove("show-vignette")
            // }, navOpen ? 300 : 200);
        }} className={className}>
            {children}
        </Link>
    );
}
