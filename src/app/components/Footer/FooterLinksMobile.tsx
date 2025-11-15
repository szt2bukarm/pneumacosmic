import TransitionLink from "@/app/TransitionLink";
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger);

export default function FooterLinksMobile() {

    useGSAP(() => {
        const ctx = gsap.context(() => {
            let trigger : ScrollTrigger;
            setTimeout(() => {
                gsap.set('[data-gsap="footer-links-item-mobile"]', {
                    opacity: 0,
                    y: 20
                })
                trigger = ScrollTrigger.create({
                    trigger: '[data-gsap="footer"]',
                    start: "bottom-=400 bottom",
                    end: "bottom bottom",
                    animation: gsap.to('[data-gsap="footer-links-item-mobile"]', {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.15,
                        ease: "power4.out"
                    })
                })
            }, 100);

            return () => {
                trigger?.kill();
            };
        },[])

        return () => ctx.revert()
    },[])



    return (
        <div className="relative w-full h-full justify-center items-center flex md:hidden">


            <div className="flex items-center justify-center flex-col gap-[50px]">
                <img data-gsap="footer-links-item-mobile" src="/logo.svg" className="w-[130px] h-fit" />
                

                    <div className="flex items-center justify-center flex-col gap-[40px]">
                        <div data-gsap="footer-links-item-mobile" className="flex items-center justify-center flex-col">
                            <p className="font-hal text-middark text-md leading-[125%]">BLOG</p>
                            <a target="_blank" href="https://blog.pneumacosmic.hu/" className="font-hal text-middark text-md cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">blog.pneumacosmic.hu</a>
                        </div>

                        <div data-gsap="footer-links-item-mobile" className="flex items-center justify-center flex-col">
                        <a target="_blank" href="https://blog.pneumacosmic.hu/project-type/seta/" className="font-hal text-middark text-md cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">Séták</a>
                        <a target="_blank" href="https://blog.pneumacosmic.hu/project-type/event/" className="font-hal text-middark text-md cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">Beszélgetések</a>
                            {/* <a className="font-hal text-middark text-md cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">Mozi</a> */}
                        </div>

                        <div data-gsap="footer-links-item-mobile" className="flex items-center justify-center flex-col mb-[30px]">
                        <TransitionLink href="/imprint" className="font-hal text-middark text-md cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">Impresszum</TransitionLink>
                            <a target="_blank" href="https://www.ludwigmuseum.hu/velencei-biennale/" className="font-hal text-middark text-md cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">Ludwig Múzeum</a>
                            <a className="font-hal text-middark text-md cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">Biennálé Iroda</a>
                            <a className="font-hal text-middark text-md cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">Nemzeti Biztos</a>
                            <TransitionLink href="/imprint" scrollTarget={"tamogatok"} className="font-hal text-middark text-md cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">Szponzorok</TransitionLink>
                            </div>

                        <div data-gsap="footer-links-item-mobile" className="flex items-center justify-center gap-[40px]">
                        <a href="http://vb26press.ludwigmuseum.hu/" target="_blank" className="font-hal text-middark text-md cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">PRESS KIT</a>
                        <a href="http://koronczi.hu/pneumacosmic/download" target="_blank" className="font-hal text-middark text-md cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">DOWNLOAD</a>
                        </div>

                        <a href="https://www.labiennale.org/en" target="_blank" className="mt-[20px] h-[190px] w-[170px] p-[16px] md:flex items-start justify-start bg-[#D9D9D9] z-[10]">
                            <img src="/footerbanner.svg" className="w-full h-fit" />
                        </a>
                    </div>
            </div>

        </div>
    )
}