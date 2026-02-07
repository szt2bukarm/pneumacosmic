"use client"
import BlurredImageCarousel from "../../components/common/BlurredImageCarousel";
import PageNavHeader from "../../components/common/PageNavHeader";
import PageTitle from "../../components/common/PageTitle";
import StaggeredSplitText from "../../components/common/StaggeredSplitText";
import Video from "../../components/common/Video";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import PinnedImageReveal from "../../components/Exhibition-2/PinnedImageReveal";
import Footer from "../../components/Footer/Footer";
import ImageGallery from "../../components/common/ImageGallery/ImageGallery";
import Exhibiton2Render from "../../components/Exhibition-2/Exhibition2Render";
import { useLenis } from "@studio-freight/react-lenis";
import { use, useEffect, useRef, useState } from "react";
import { useStore } from "../../useStore";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
gsap.registerPlugin(ScrollTrigger);

const carousel1 = [
    {
        src: "/images/exhibition-2/gallery-1/1.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-1/2.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-1/3.webp",
        text: "Próba szöveg"
    },
    {
        src: "/images/exhibition-2/gallery-1/4.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-1/5.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-1/6.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-1/7.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-1/8.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-1/9.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-1/10.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-1/11.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-1/12.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-1/13.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-1/14.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-1/15.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-1/16.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-1/17.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-1/18.webp",
        text: null
    },
]

const carousel2 = [
    {
        src: "/images/exhibition-2/gallery-2/1mtan.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-2/2mtan.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-2/3mtan.webp",
        text: "Próba szöveg"
    },
    {
        src: "/images/exhibition-2/gallery-2/4mtan.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-2/5mtan.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-2/6mtan.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-2/7mtan.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-2/8mtan.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-2/9mtan.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-2/10mtan.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-2/11mtan.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-2/12mtan.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-2/13mtan.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-2/14mtan.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-2/15mtan.webp",
        text: null
    },
]

const carousel3 = [
    {
        src: "/images/exhibition-2/gallery-3/1kecskemet.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-3/2kecskemet.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-3/3kecskemet.webp",
        text: "Próba szöveg"
    },
    {
        src: "/images/exhibition-2/gallery-3/4kecskemet.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-3/5kecskemet.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-3/6kecskemet.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-3/7kecskemet.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-3/8kecskemet.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-3/9kecskemet.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-3/10kecskemet.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-3/11kecskemet.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-3/12kecskemet.webp",
        text: null
    },
]


const carousel4 = [
    {
        src: "/images/exhibition-2/gallery-4/1mta.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-4/2mta.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-4/3mta.webp",
        text: "Próba szöveg"
    },
    {
        src: "/images/exhibition-2/gallery-4/4mta.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-4/5mta.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-4/6mta.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-4/7mta.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-4/8mta.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-4/9mta.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-4/10mta.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-4/11mta.webp",
        text: null
    },
    {
        src: "/images/exhibition-2/gallery-4/12mta.webp",
        text: null
    },
]

export default function Page() {
    const lenis = useLenis();
    const [mounted, setMounted] = useState(false);
    const { isMobile } = useStore();
    const [videoID, setVideoID] = useState(1);


    useEffect(() => {
        if (!lenis) return
        lenis?.scrollTo(0, { immediate: true })
        setTimeout(() => {
            lenis?.stop();
            setTimeout(() => {
                window.scrollTo(0, 0)
            }, 25);
            setTimeout(() => {
                lenis?.start();
            }, 35);
        }, 5);
    }, [lenis])


    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleScroll = () => {
            if (window.scrollY === 0 && !mounted) {
                setMounted(true);
            }
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [mounted]);


    useGSAP(() => {
        const ctx = gsap.context(() => {
            setTimeout(() => {
                let parallaxTrigger = ScrollTrigger.create({
                    trigger: '[data-gsap="exhibition-2-textbg"]',
                    start: "top-=100 center",
                    end: "bottom+=100 center",
                    scrub: true,
                    animation: gsap.to('[data-gsap="exhibition-2-textbg"]', {
                        y: "10%",
                    })
                })

                return () => {
                    parallaxTrigger.kill()
                }
            }, 100);
        })

        return () => ctx.revert()
    }, [])


    useGSAP(() => {
        let trigger: ScrollTrigger | null = null;

        const timeoutId = setTimeout(() => {

            trigger = ScrollTrigger.create({
                trigger: '[data-gsap="exhibition-2-pin-helper"]',
                start: "top+=300 center",
                end: "top+=1800 center",
                onEnter: () =>
                    gsap.to(
                        '[data-gsap="exhibition-2-fixedtext-left"], [data-gsap="exhibition-2-fixedtext-right"]',
                        {
                            opacity: 1,
                            duration: 0.15
                        }
                    ),
                onLeave: () =>
                    gsap.to(
                        '[data-gsap="exhibition-2-fixedtext-left"], [data-gsap="exhibition-2-fixedtext-right"]',
                        {
                            opacity: 0,
                            duration: 0.15
                        }
                    ),
                onEnterBack: () =>
                    gsap.to(
                        '[data-gsap="exhibition-2-fixedtext-left"], [data-gsap="exhibition-2-fixedtext-right"]',
                        {
                            opacity: 1,
                            duration: 0.15
                        }
                    ),
                onLeaveBack: () =>
                    gsap.to(
                        '[data-gsap="exhibition-2-fixedtext-left"], [data-gsap="exhibition-2-fixedtext-right"]',
                        {
                            opacity: 0,
                            duration: 0.15
                        }
                    ),
            });

            ScrollTrigger.refresh();
        }, 100);

        const handleResize = () => {
            trigger?.refresh();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("resize", handleResize);
            trigger?.kill();
        };
    });

    if (!mounted) return <div></div>

    return (
        <div className="relative w-screen min-h-screen bg-black overflow-x-hidden">

            <p data-gsap="exhibition-2-fixedtext-left" className="hidden xl:block opacity-0 fixed bottom-5 left-5 font-hal text-middark text-sm z-30 xl:w-[550px] leading-[14px]">Archív képek a Magyar Tudományos Akadémia termeiről. Fotók: Fővárosi Szabó Ervin Könyvtár, Budapest Gyűjtemény és Fortepan / Budapest Főváros Levéltára</p>
            <p data-gsap="exhibition-2-fixedtext-right" className="hidden xl:block opacity-0 fixed bottom-5 right-5 text-right font-hal text-middark text-sm z-30  xl:w-[550px] leading-[14px]">A szellőzőrács leíró kartonja a Magyar Tudományos Akadémia Művészeti Gyűjteményében</p>



            <div className="z-[30] fixed top-0 left-0 w-screen h-[200px] bg-gradient-to-b from-black to-transparent"></div>
            <PageTitle delay={2.5} subtext="Bal oldali szárny" text="BENNSZORULT LÉLEGZET" />

            {!isMobile && (
                <div data-gsap="canvas" className="h-[150vh] w-screen fixed top-0 left-0">
                    <Exhibiton2Render />
                </div>
            )}

            {isMobile && (
                <div className="fixed top-0 left-0 w-screen h-[calc(100vh)] bg-[#000]">
                    <video
                        autoPlay
                        muted
                        playsInline
                        className={`absolute top-0 left-0 w-full h-full object-contain ${videoID === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        src="/scene1.mp4"
                        onEnded={() => {
                            setVideoID(2);
                            const video2 = document.getElementById('video-scene-2') as HTMLVideoElement;
                            if (video2) video2.play();
                        }}
                    />

                    <video
                        id="video-scene-2"
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className={`absolute top-0 left-0 w-full h-full object-contain ${videoID === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        src="/scene2.mp4"
                    />
                </div>
            )}

            <div className="w-full h-[calc(100vh-290px-20vh)] md:h-[calc(100vh-290px)]"></div>

            <div className="relative w-full h-full bg-black">

                <div className="w-full h-full py-[70px] md:py-[150px] lg:py-[200px] flex items-center justify-center">
                    <StaggeredSplitText>Az installáció a szemlélődés, az archeológia és a művészeti kutatás megismerési formáit modellezi a tudományos szféra székházának tárgyi emlékein keresztül. A mű a Magyar Tudományos Akadémia épületének a felújítása során, a harmadik emelet padlózatából kibontott szellőztetőberendezés elemeiből áll. A 200 éves intézmény történelmi jelentőségű épületének lélegzéséért láthatatlanul felelős tárgyak szimbolikusan a tudományos élet nagyjainak leheletét, sóhajait, az agyakat átjáró oxigént őrzik. A szellőzőrendszer a világot egybekötő levegőáramláshoz kapcsolódik, miként a léghez hasonló, testetlen gondolatok létének alapja is a folyamatos, termékeny cserélődés.</StaggeredSplitText>
                </div>

                <BlurredImageCarousel images={carousel1} title="A Bennszorult lélegzet installáció a Kérem, sóhajtson, Széchenyi Úr! kiállításon, Godot Kortárs Művészeti Intézet, 2024" />

                <div className="w-full h-full py-[70px] md:py-[150px] flex items-center justify-center">
                    <StaggeredSplitText>Az ipari tárgyakkal párbeszédbe állított természeti felvételen a lassan változó fumarola (geológiai képződmény, mely gázokat és gőzöket bocsát ki) a pneuma cosmic bolygó léptékű megmutatkozásaként, egy kozmikus lehelet kiáramlásaként jelenik meg. A levegő és a gondolatok cserélődése itt egy leletben tárul a néző elé, melynek kutatása párbeszédet teremt a tudományos akadémiák szellemisége és egy kutató művész metaforikus világlátása között.</StaggeredSplitText>
                </div>

                <Video thumbnail="/images/exhibition-2/video.webp" videoID="hHZyi2eXODs" />
                <div className="h-[150px]"></div>
                <BlurredImageCarousel images={carousel2} title="A Magyar Tudományos Akadémia harmadik emeleti kiállítótermei a felújítás előtti állapotban, 2024" />

                <div
                    className="mt-[-100px] relative w-full h-full md:h-[550px] lg:h-[1000px] pt-[180px] pb-[70px] md:pt-0 md:pb-0 flex items-center justify-center"
                >
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                        <video data-gsap="exhibition-2-textbg" className="scale-110 w-full h-full object-cover z-1" playsInline muted loop autoPlay>
                            <source src="/images/exhibition-2/bg_video2.mp4" type="video/mp4" />
                        </video>
                    </div>

                    <div className="absolute top-0 left-0 w-full h-full" style={{ background: "linear-gradient(to bottom, rgba(5,5,5,1), rgba(5,5,5,0.75), rgba(5,5,5,1))" }}>
                    </div>

                    <StaggeredSplitText>Az archeológia tudományát is megidéző projekt a korábban a padlózatba rejtett, hétköznapi tárgyakat művészeti értékükben tárja a látogató elé. A labirintusszerűen elhelyezett szellőzőelemek erőteljes indusztriális jellege és sajátos története mellett az installáció a művész által a tárgyakban meglátott metaforán keresztül válik teljessé.</StaggeredSplitText>
                </div>

                <div data-gsap="exhibition-2-pin-helper" className="w-full h-[0px]"></div>
                <PinnedImageReveal />
                {/* <p className="pt-[100px] mx-auto text-center font-hal text-middark text-sm w-[calc(100%-40px)] lg:w-[900px] leading-[15px] ">A fényképek a Fővárosi Szabó Ervin Könyvtár – Budapest Gyűjteményéből és a FORTEPAN – Budapest Főváros Levéltárából származnak.</p> */}
                <p className="pt-[100px] mx-auto block xl:hidden text-center font-hal text-middark text-sm w-[calc(100%-40px)] leading-[15px]">Archív képek a Magyar Tudományos Akadémia termeiről. Fotók: Fővárosi Szabó Ervin Könyvtár, Budapest Gyűjtemény és Fortepan / Budapest Főváros Levéltára<br></br><br></br>A szellőzőrács leíró kartonja a Magyar Tudományos Akadémia Művészeti Gyűjteményében</p>


                <div className="h-[150px]"></div>
                <BlurredImageCarousel images={carousel4} title="A Magyar Tudományos Akadémia szellőztetőrendszeréből kibontott installációs elemek elszállítása, 2024" />


                <div className="w-full h-full py-[70px] md:py-[150px] lg:py-[220px] flex items-center justify-center">
                    <StaggeredSplitText>Ez a metafora jelenik meg az installációhoz tartozó szénrajzon is, melyen a Magyar Tudományos Akadémia neoreneszánsz székházának homlokzata jelenik meg. Az épületet átjárja vagy megzavarja egy megfoghatatlan, absztrakt motívum, a gesztusszerűen megjelenített légmozgás. A rajzon a két eltérő grafikai elem az általuk képviselt (világ)szemléleti és megismerési módok (tudomány és művészet) eltérő jellegét tükrözi, nyitva hagyva a kérdést, hogy találkozásuk termékeny vagy lehetetlen párbeszédet teremt.</StaggeredSplitText>
                </div>

                <BlurredImageCarousel images={carousel3} title="Az installáció elemeinek megérkezése a KÉSZ Csoport kecskeméti telephelyére, a K-ARTS Művészeti Alapítvány raktárába, 2024" />

                <div className="mx-auto flex flex-col gap-[20px] md:gap-[30px] my-[70px] md:my-[150px] lg:my-[200px] w-[90vw] xl:w-[924px]">
                    <p className="font-gara text-middark text-md sm:text-lg md:text-h4">Az installáció először Koronczi Endre Kérem, sóhajtson, Széchenyi Úr! kiállításán került bemutatásra.
                        <br></br><br></br>
                        Godot Kortárs Művészeti Intézet,<br></br>
                        Budapest, 2024. 02. 23.–06. 23.
                        <br></br><br></br>
                        Kurátor: Cserhalmi Luca</p>
                </div>

                <Footer />
            </div>
        </div>
    )

}