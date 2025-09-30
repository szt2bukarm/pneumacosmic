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
gsap.registerPlugin(ScrollTrigger);

export default function Page() {
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) return
        lenis?.scrollTo(0,{immediate: true})
        setTimeout(() => {
            lenis?.stop();
            setTimeout(() => {
                window.scrollTo(0,0)
                lenis?.start();
            }, 10);
        }, 5);
    },[lenis])


    useGSAP(() => {
        const ctx = gsap.context(() => {
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
        })

        return () => ctx.revert()
    },[])



    return (

    <div className="relative w-screen min-h-screen bg-white overflow-x-hidden">

        <PageNavHeader />

        <PageTitle delay={1.5} subtext="Jobb oldali szárny" text="VÉGTELEN TÜRELEM" />

        <div className="relative w-full h-full bg-white">

        <div className="w-full h-full py-[70px] md:py-[150px] lg:py-[200px] flex items-center justify-center">
        <StaggeredSplitText>A jobb oldali szárnyban egy nagyméretű (13 méteres) lélegző fal installáció kap helyet, mely visszautalás az első teremben elhelyezkedő Bennszorult lélegzet installációra. Architektúra és légmozgás kapcsolata itt elvont, valóságtól elrugaszkodott módon jelenik meg, víziószerűen mutatva be egy épület lélegzését.<br></br><br></br>A mű a teremben átlósan húzott, tartókeretre feszített textil álfal, melyet a realisztikus hatás érdekében falfestékkel fedünk. Az álfal mögé ventillátorok fújnak levegőt, melytől az anyag megfeszül és kidomborodik, majd visszaereszkedik, hasonlóan a lélegző mellkas mozgásához.</StaggeredSplitText>
        </div>

        <BlurredImageCarousel images={Array.from({ length: 12 }, (_, i) => `images/exhibition-2/gallery-1/${i+1}.webp`)} />

        <div className="w-full h-full py-[70px] md:py-[150px] flex items-center justify-center">
        <StaggeredSplitText>A Végtelen türelem minimalista, transzcendentális hatást kelt. A metafizikai valóságra reflektáló műalkotás a világ észrevétlen, testetlen mozgatójára utal, egyúttal a kiállítás alatt bejárt asszociációs kör végpontja, a pneuma cosmic gondolatának elvont, szürreális, megfoghatatlan jellegének kiteljesedése. Az installáción megjelenő valós mozgás visszafogott, alig észrevehető, így a figyelem és tekintet határait feszegeti, miközben  15 Szakmai koncepció a lassú mozgás befogadása türelemre, egy kutató kitartására készteti a látogatót.</StaggeredSplitText>
        </div>

        <Video thumbnail="images/akusztikus.webp" videoID="zwJSWwiAQ5g" />

            <div className="w-full h-full py-[70px] md:py-[150px] lg:py-[200px] flex items-center justify-center">
                <StaggeredSplitText>Az archeológiai jelleget öltő installáció a korábban láthatatlanságba zárt, hétköznapi tárgyakat művészeti értékükben pozícionálja, ezzel egy újabb perspektívát kínálva a szellőztetőelemek szemléléséhez. A tárgyak ipari, kopottas teste ismeretlen eszköz benyomását kelti. Nagy tömegbe rendezve elidegenítő hatást keltenek, ugyanakkor hívogatnak a megismerésre, akárcsak egy kortárs rom által kiváltott kettős esztétikai élmény.</StaggeredSplitText>
            </div>

            <div className="mx-auto flex flex-col gap-[20px] md:gap-[30px] mb-[70px] md:mb-[150px] lg:mb-[200px] w-[90vw] xl:w-[1050px]">
                <p className="font-gara text-middark text-h4 md:text-h3">TOVÁBBI TARTALMAK</p>
                <p className="font-gara text-middark text-h5 md:text-h4 hover:opacity-50 cursor-pointer transition-opacity duration-150">→ Végtelen Türelem VIDEÓ</p>
            </div>

            <Footer />
        </div>
    </div>
    )

}