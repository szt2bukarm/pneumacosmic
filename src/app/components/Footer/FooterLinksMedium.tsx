import TransitionLink from "@/app/TransitionLink";
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useParams } from "next/navigation";
import { useLayoutEffect } from "react";
gsap.registerPlugin(ScrollTrigger);

export default function FooterLinksMedium({openContact}: any) {
    const {locale} = useParams();


    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            let trigger : ScrollTrigger
            setTimeout(() => {
                gsap.set('[data-gsap="footer-links-item-medium"]', {
                    opacity: 0,
                    y: 20
                })
                trigger = ScrollTrigger.create({
                    trigger: '[data-gsap="footer"]',
                    start: "bottom-=200 bottom",
                    end: "bottom bottom",                    
                    animation: gsap.to('[data-gsap="footer-links-item-medium"]', {
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
        })

        return () => ctx.revert()
    },[])

    return (
        <div className="relative w-full h-full pb-[60px] pl-[50px] hidden md:flex xl:hidden ">


            <div className="flex flex-col gap-[50px]">
                <img alt="footer logo" data-gsap="footer-links-item-medium" src="/logo.svg" className="w-[130px] h-fit" />
                
                <div className="flex gap-[150px]">

                    <div className="flex flex-col gap-[40px]">
                        <div data-gsap="footer-links-item-medium" className="flex flex-col">
                            {/* <p className="font-hal text-middark text-lg leading-[125%]">BLOG</p> */}
                            <a target="_blank" href="https://blog.pneumacosmic.hu/" className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">{locale == "hu" && 'Blog'}{locale == "en" && 'Blog'}</a>
                        {/* </div> */}

                        {/* <div data-gsap="footer-links-item-medium" className="flex flex-col mb-[100px]"> */}
                        <a target="_blank" href="https://blog.pneumacosmic.hu/project-type/seta/" className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">{locale == "hu" && 'Séták'}{locale == "en" && 'Walks'}</a>
                        <a target="_blank" href="https://blog.pneumacosmic.hu/project-type/beszelgetesek/" className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">{locale == "hu" && 'Beszélgetések'}{locale == "en" && 'Talks'}</a>
                        <a target="_blank" href="https://blog.pneumacosmic.hu/project-type/mozi/" className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">{locale == "hu" && 'Mozi'}{locale == "en" && 'Cinema'}</a>
                        </div>

                        <div data-gsap="footer-links-item-medium" className="flex gap-[40px]">
                        <a href="http://vb26press.ludwigmuseum.hu/" target="_blank" className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">Press Kit</a>
                        {/* <a href="http://koronczi.hu/pneumacosmic/download" target="_blank" className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">DOWNLOAD</a> */}
                        </div>
                    </div>

                    <div data-gsap="footer-links-item-medium" className="flex flex-col">
                    <TransitionLink href="/imprint" className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">{locale == "hu" && 'Impresszum'}{locale == "en" && 'Imprint'}</TransitionLink>
                    <button onClick={openContact} className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%] text-left">{locale == "hu" && 'Kapcsolat'}{locale == "en" && 'Contact'}</button>
                    {/* <a target="_blank" href="https://www.ludwigmuseum.hu/velencei-biennale/" className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">Ludwig Múzeum</a>
                        <button onClick={() => openBienalle()} className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">Biennálé Iroda</button>
                        <button onClick={() => openNational()} className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">Nemzeti Biztos</button>
                        <TransitionLink href="/imprint" scrollTarget={"tamogatok"} className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">Szponzorok</TransitionLink> */}
                    </div>
                </div>

            </div>

        </div>
    )
}