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
import { useEffect, useState } from "react";
import WalkSequence from "../components/Exhibition-3/WalkSequence";
import AnimatedLink from "../components/common/AnimatedLink";
gsap.registerPlugin(ScrollTrigger);

const carousel1 = [
    {
        src: "images/exhibition-3/gallery-1/1general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/2general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/3general.webp",
        text: "Próba szöveg"
    },
    {
        src: "images/exhibition-3/gallery-1/4general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/5general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/6general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/7general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/8general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/9general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/10general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/11general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/12general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/13general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/14general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/15general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/16general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/17general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/18general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/19general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/20general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/21general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/22general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/23general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/24general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/25general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/26general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/27general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/28general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/29general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/30general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/31general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/32general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/33general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/34general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/35general.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-1/36general.webp",
        text: null
    },
]

const carousel2 = [
    {
        src: "images/exhibition-3/gallery-2/1werk.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-2/2werk.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-2/3werk.webp",
        text: "Próba szöveg"
    },
    {
        src: "images/exhibition-3/gallery-2/4werk.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-2/5werk.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-2/6werk.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-2/7werk.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-2/8werk.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-2/9werk.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-2/10werk.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-2/11werk.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-2/12werk.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-2/13werk.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-2/14werk.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-2/15werk.webp",
        text: null
    },
]

const carousel3 = [
    {
        src: "images/exhibition-3/gallery-3/1object.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-3/2object.webp",
        text: null
    },
    {
        src: "images/exhibition-3/gallery-3/3object.webp",
        text: null
    }
]

export default function Page() {
    const lenis = useLenis();
    const [mounted,setMounted] = useState(false);

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
      

      useEffect(() => {
        if (typeof window === "undefined") return;
      
        const handleScroll = () => {
          if (window.scrollY === 0 && !mounted) {
            requestAnimationFrame(() => {
                setMounted(true);
                requestAnimationFrame(() => {
                    ScrollTrigger.refresh();
                })    
            })
          }
        };
        handleScroll();
      
        window.addEventListener("scroll", handleScroll);
      
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, [mounted]);


    useGSAP(() => {
        if (!mounted) return;
        gsap.from('[data-gsap="exhibition-3-gallery-1"]', {
            y: 150,
            opacity: 0,
            duration: 1.5,
            delay: 1.6,
            ease: "power4.out"
        })
    },[mounted])

      if (!mounted) return <div></div>

      return (
        <div data-gsap="exhibition-3" className="relative w-screen min-h-screen bg-dark overflow-x-hidden">

        <div className="z-[30] fixed top-0 left-0 w-screen h-[200px] bg-gradient-to-b from-black to-transparent"></div>

        <PageTitle delay={1.35} subtext="Apszis" text="PÁROS LÁBBAL A FÖLD FÖLÖTT" />

        <div data-gsap="exhibition-3-gallery-1" className="mt-[100px]">
        <BlurredImageCarousel images={carousel1} trigger={false} />
        </div>

        <div className="w-full h-full py-[70px] md:py-[150px] lg:py-[200px] flex items-center justify-center">
        <StaggeredSplitText>Egy évig tartó gyaloglás. Koronczi Endre egy fontos sóhaj keresésére indult útnak, a hátán a sóhaj befogására alkalmas üvegbúrával. A séta kezdetén még nem tudta, hogy hol találja meg, amit keres, így a mű nem csak fikciós, hanem valós kutatási folyamat is, a dokumentáció és a videóművészet határán egyensúlyoz.</StaggeredSplitText>
        </div>

        <BlurredImageCarousel images={carousel2} />

        <div className="w-full h-full py-[70px] md:py-[150px] flex items-center justify-center">
        <StaggeredSplitText>A mű három egységből áll: a művész vándorló kutatását bemutató, a séta monotonitását a helyszínek változatosságával ötvöző videóból, az üvegtárgyból, melyben a keresett sóhajtás kerül megőrzésre, valamint a sóhaj befogásának pillanatát bemutató videóból. A két videóban meghatározó a lassúság, a kulcsjelenetek helyett a folyamat hangsúlyozása.</StaggeredSplitText>
        </div>

        <WalkSequence />

        <div className="w-full h-full py-[70px] md:py-[150px] flex items-center justify-center">
        <StaggeredSplitText>A Páros lábbal a föld felett installáció egy játék, a lehetetlenre tett kísérlet, mely az illékony pillanat és az anyagtalan dolgok megragadásának vágyát fejezi ki. Koronczi Endre több évtizede dolgozik a széllel és a különböző légmozgásformákkal, azok metaforikus jelentésrétegeivel. A Páros lábbal a föld felett ennek a hosszú, egy kutató kitartásával zajló művészeti projektnek az analógiája is egyben.</StaggeredSplitText>
        </div>

        <BlurredImageCarousel images={carousel3} />

        <div className="mx-auto flex flex-col gap-[10px] my-[70px] md:my-[150px] lg:my-[200px] w-[90vw] xl:w-[1050px]">
            <p className="font-gara text-middark text-h4 md:text-h3">TOVÁBBI TARTALMAK</p>
            <div>
            <AnimatedLink href={"/"} external={true} size="large" text="A Végtelen Zarándoklat VIDEÓ" />
            <AnimatedLink href={"/"} external={true} size="large" text="A Fejrehelyezés VIDEÓ" />
            </div>
        </div>

        <Footer />
    </div>
    )

}