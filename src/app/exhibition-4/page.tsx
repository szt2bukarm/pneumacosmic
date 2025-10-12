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

const carousel1 = [
    {
        src: "images/exhibition-4/gallery-1/1kiallitas.webp",
        text: null
    },
    {
        src: "images/exhibition-4/gallery-1/2kiallitas.webp",
        text: null
    },
    {
        src: "images/exhibition-4/gallery-1/3kiallitas.webp",
        text: "Próba szöveg"
    },
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
        <div className="h-[100px]" ></div>

        <BlurredImageCarousel images={carousel1} />

        <div className="w-full h-full py-[70px] md:py-[150px] lg:py-[200px] flex items-center justify-center">
        <StaggeredSplitText>Az installáción megjelenő mozgás visszafogott, alig észrevehető, mely a fókuszált figyelem és tekintet határait feszegeti, miközben a lassú mozgás megfigyelése egy kutató türelmére készteti a nézőt. A lélegző fal egyúttal egy optikai játékot is űz velünk: a fal síkjának emelkedése szemből vizsgálva alig észrevehető, elnyeli az egynemű fehér felület, míg oldalról jobban megfigyelhető a kidomborodó, majd visszaereszkedő anyag. A művön végbemenő változás a lélegző mellkas mozgását idézi.<br></br><br></br>A Végtelen türelem minimalista, traszcendentális hatást kelt, víziószerűen mutatva be a pavilon légzését. A metafizikai valóságra reflektáló installáció a világ észrevétlen, testetlen mozgatójára utal. A kiállítás alatt bejárt asszociációs kör végpontjaként az installáció környezet és légmozgás kapcsolatának, valamint a pneuma cosmic gondolatának elvont, absztrakt megfogalmazása.</StaggeredSplitText>
        </div>

        <Video thumbnail="images/exhibition-4/video.webp" videoID="zwJSWwiAQ5g" />


        <div className="w-full h-full py-[70px] md:py-[150px] flex items-center justify-center">
        <StaggeredSplitText>Koronczi első lélegző fal installációja 2018-ban volt látható az azonos című Végtelen türelem című projektkiállításon, Budapesten. A mű egy polgári otthon múlttal átitatott terében jelent meg, felületén tapétamintával.<br></br><br></br>Hat évvel később, 2024-ben készült el az installáció egy újabb változata, azonos címmel Koronczi Endre Kérem, sóhajtson, Széchényi Úr! című egyéni kiállításán a Godot Kortárs Művészeti Intézetben. Ekkor a mű steril, white cube típusú térben valósult meg, a használt anyag is homogén, fehér, így nem hordozta magán a személyesség érzetét, tisztán a jelenségre került a hangsúly. A 61. Velencei Képzőművészeti Biennálén megvalósuló Végtelen türelem installáció ehhez áll legközelebb, ám a pozícionálás tekintetében eltérést mutatnak.</StaggeredSplitText>
        </div>

        <div className="mx-auto flex flex-col gap-[20px] md:gap-[30px] mb-[70px] md:mb-[150px] lg:mb-[200px] w-[90vw] xl:w-[1050px]">
            <p className="font-gara text-middark text-h4 md:text-h3">TOVÁBBI TARTALMAK</p>
            <p className="font-gara text-middark text-h5 md:text-h4 hover:opacity-50 cursor-pointer transition-opacity duration-150">→ Végtelen Türelem VIDEÓ</p>
        </div>

        <Footer />
    </div>
    )

}