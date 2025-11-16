"use client"
import BlurredImageCarousel from "../components/common/BlurredImageCarousel";
import PageNavHeader from "../components/common/PageNavHeader";
import PageTitle from "../components/common/PageTitle";
import StaggeredSplitText from "../components/common/StaggeredSplitText";
import Video from "../components/common/Video";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import PinnedImageReveal from "../components/Exhibition-2/PinnedImageReveal";
import Footer from "../components/Footer/Footer";
import ImageGallery from "../components/common/ImageGallery/ImageGallery";
import Exhibiton2Render from "../components/Exhibition-2/Exhibition2Render";
import { useLenis } from "@studio-freight/react-lenis";
import { useEffect } from "react";
import AnimatedLink from "../components/common/AnimatedLink";
import MusicSheet from "../components/exhibition-5/MusicSheet";
gsap.registerPlugin(ScrollTrigger);

const carousel1 = [
    {
        src: "images/exhibition-5/gallery-1/werk1.webp",
        text: null
    },
    {
        src: "images/exhibition-5/gallery-1/werk2.webp",
        text: null
    },
    {
        src: "images/exhibition-5/gallery-1/werk3.webp",
        text: "Próba szöveg"
    },
    {
        src: "images/exhibition-5/gallery-1/werk4.webp",
        text: null
    },
    {
        src: "images/exhibition-5/gallery-1/werk5.webp",
        text: null
    },
    {
        src: "images/exhibition-5/gallery-1/werk6.webp",
        text: null
    },
    {
        src: "images/exhibition-5/gallery-1/werk7.webp",
        text: null
    },
    {
        src: "images/exhibition-5/gallery-1/werk8.webp",
        text: null
    },
    {
        src: "images/exhibition-5/gallery-1/werk9.webp",
        text: null
    },
    {
        src: "images/exhibition-5/gallery-1/werk10.webp",
        text: null
    },
    {
        src: "images/exhibition-5/gallery-1/werk11.webp",
        text: null
    },
    {
        src: "images/exhibition-5/gallery-1/werk12.webp",
        text: null
    },
]

const carousel2 = [
    {
        src: "images/exhibition-5/gallery-2/mate1.webp",
        text: null
    },
    {
        src: "images/exhibition-5/gallery-2/mate2.webp",
        text: null
    },
    {
        src: "images/exhibition-5/gallery-2/mate3.webp",
        text: "Próba szöveg"
    }
]

const carousel3 = [
    {
        src: "images/exhibition-5/gallery-3/studio1.webp",
        text: null
    },
    {
        src: "images/exhibition-5/gallery-3/studio2.webp",
        text: null
    },
    {
        src: "images/exhibition-5/gallery-3/studio3.webp",
        text: "Próba szöveg"
    },
    {
        src: "images/exhibition-5/gallery-3/studio4.webp",
        text: null
    },
    {
        src: "images/exhibition-5/gallery-3/studio5.webp",
        text: null
    },
    {
        src: "images/exhibition-5/gallery-3/studio6.webp",
        text: null
    },
    {
        src: "images/exhibition-5/gallery-3/studio7.webp",
        text: "Próba szöveg"
    },
    {
        src: "images/exhibition-5/gallery-3/studio8.webp",
        text: null
    },
    {
        src: "images/exhibition-5/gallery-3/studio9.webp",
        text: null
    },
    {
        src: "images/exhibition-5/gallery-3/studio10.webp",
        text: null
    },
    {
        src: "images/exhibition-5/gallery-3/studio11.webp",
        text: "Próba szöveg"
    },
    {
        src: "images/exhibition-5/gallery-3/studio12.webp",
        text: null
    }
]

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

    useGSAP(() => {
        const ctx = gsap.context(() => {
            setTimeout(() => {
                let bgTrigger = ScrollTrigger.create({
                    trigger: '[data-gsap="exhibition-5-bg-trigger"]',
                    start: "top center",
                    end: "bottom center",
                    scrub: true,
                    animation: gsap.to('[data-gsap="exhibition-5"]', {
                        background: "#050505"
                    })
                })

                return () => {
                    bgTrigger.kill();
                };
            }, 100);
        })

        return () => {
            ctx.revert();
        };
    },[])

    useGSAP(() => {
        gsap.from("[data-gsap='exhibition-5-subtitle']", { opacity: 0,y:10,filter: "blur(10px)", duration: 0.5,delay: 2 })
    },[])

    useGSAP(() => {
        gsap.from('[data-gsap="exhibition-5-gallery-1"]', {
            y: 150,
            opacity: 0.01,
            duration: 1.5,
            delay: 1.6,
            ease: "power4.out"
        })
    },[])

    return (

    <div data-gsap="exhibition-5" className="relative w-screen min-h-screen bg-dark overflow-x-hidden">

        <div className="z-[30] fixed top-0 left-0 w-screen h-[200px] bg-gradient-to-b from-black to-transparent"></div>

        <PageTitle delay={1.5} subtext="" text="AKUSZTIKUS ELEM" />
        <p data-gsap="exhibition-5-subtitle" className="font-hal px-[20px] md:px-0 text-middark text-md leading-[18px] md:text-lg md:leading-[23px] w-screen sm:text-center mb-[70px] mt-[20px]">Balogh Máté<br></br>Pneuma Cosmic<br></br>2025, 23' 40"</p>

        <div data-gsap="exhibition-5-gallery-1">
        <BlurredImageCarousel images={carousel1} trigger={false} title="Balogh Máté zeneszerző kísérleti felvételeket készít az installáció elemein"/>
        </div>

        <div className="w-full h-full py-[70px] md:py-[150px] lg:py-[200px] flex items-center justify-center">
        <StaggeredSplitText>Balogh Máté zeneszerző a Pneuma Cosmic című kompozíciót Koronczi Endre projektjének akusztikus elemeként hozta létre. A mű a velencei kiállításra, annak fix fizikai terére és gondolati összefüggéseire készült.<br></br>A hangfelvételen Balogh Máté játszik.</StaggeredSplitText>
        </div>

        <BlurredImageCarousel images={carousel2} title="Balogh Máté és a Pneuma Cosmic című hangszobor (Akusztikus elem) kottája"/>

        <div className="w-full h-full py-[70px] md:py-[150px] flex items-center justify-center">
        <StaggeredSplitText>Balogh a Bennszorult lélegzet installáció egyik szellőztetőelemét használta hangszerként. A hangokat ütéssel, kaparással, húzással, dörzsöléssel, nyomással, illetve tremolóval (hangremegtetéssel) hozta létre, melyeket kontaktmikrofonnal rögzített.  A tárgy egyes lapjainak különböző pontjait zengetve eltérő hosszúságú lecsengések tapasztalhatók. A rezonáltató anyagokat Balogh hosszas kísérletezés során, a tárggyal való „reakcióképességük” alapján választotta ki. Ennek megfelelően összesen hét anyagot használ: 1. ujjbegy (emberi bőr), 2. faverő (akácfa), 3. marimbaverő (kemény filc), 4. gumilabda hústűn (superball), 5. fémdarab (acél), 6. fültisztító pálcika (vatta), 7. lenből készült kötözőzsineg.</StaggeredSplitText>
        </div>

        <MusicSheet />

        <div className="w-full h-full py-[70px] md:py-[150px] flex items-center justify-center">
        <StaggeredSplitText>A mű Koronczi Endre Sóhajtozásgyűjtemény (2010–2011) című videójának hangról hangra történő zenei átkódolása. A videóban szereplő tizennégy ember sóhajtozása a művet tizennégy fázisra osztja. A fázisok egy-egy fix hangi eszköztárral (rezonáltató-készlettel) rendelkeznek, melyek összesége kirajzolja az adott fázisra (a sóhajtó emberre) vonatkozó személyes hangképet. A sóhajok „ki-be” áramló jellegét az idiofon megszólaltatásmódban a hangszeren történő „oda-vissza” mozdulatok jelenítik meg.</StaggeredSplitText>
        </div>

        <BlurredImageCarousel images={carousel3} title="A Pneuma Cosmic felvétele a hangstúdióban (Balogh Máté, Koronczi Endre, Kádár Mihály)"/>

        <div data-gsap="exhibition-5-bg-trigger" className="w-full h-full py-[70px] md:py-[150px] flex items-center justify-center">
        <StaggeredSplitText>A sóhaj mint akusztikus gesztus esszenciáját a sóhajtók különböző módokon értelmezik. A sóhajok orgánumbeli, hangmagassági, tempóbeli és dinamikai eltérései mellett olyan szempontok is megjelentek, mint a sóhajtás egyszeri vagy ismétlődő; csak levegőhanggal vagy hangszállal zengetve; érthető szöveggel vagy artikulálatlan hanggal; crescendóval, diminuendóval, esetleg schwellerrel megoldott; aktív belégzéssel vagy aktív kilégzéssel; orral, vagy orral és szájjal történő jellege. E különböző módozatokat Balogh a műben a rezonáltató eszközök és a rezonálás helyének tudatos megválasztásával érzékenyen érzékeltetni.<br></br><br></br><br></br><br></br>Balogh Máté</StaggeredSplitText>
        </div>

        <Footer />
    </div>
    )

}