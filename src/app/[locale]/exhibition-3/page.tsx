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
import { useEffect } from "react";
import AnimatedLink from "../../components/common/AnimatedLink";
gsap.registerPlugin(ScrollTrigger);

const carousel1 = [
    {
        src: "/images/exhibition-4/gallery-1/1kiallitas.webp",
        text: null
    },
    {
        src: "/images/exhibition-4/gallery-1/2kiallitas.webp",
        text: null
    },
    {
        src: "/images/exhibition-4/gallery-1/3kiallitas.webp",
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
            }, 25);
            setTimeout(() => {
                lenis?.start();
            }, 35);
        }, 5);
    },[lenis])

    useGSAP(() => {
        gsap.from('[data-gsap="exhibition-4-gallery-1"]', {
            y: 150,
            opacity: 0.01,
            duration: 1.5,
            delay: 1.6,
            ease: "power4.out"
        })
    },[])

    return (

    <div className="relative w-screen min-h-screen bg-white overflow-x-hidden">

        <div className="z-[30] fixed top-0 left-0 w-screen h-[150px] bg-gradient-to-b from-[#FFFFFFA9] to-transparent opacity-75"></div>

        <PageTitle delay={1.5} subtext="Jobb oldali szárny" text="VÉGTELEN TÜRELEM (LÉLEGEZŐ FAL)" />

        <div data-gsap="exhibition-4-gallery-1" className="mt-[100px]">
        <BlurredImageCarousel images={carousel1} trigger={false} title="A Végtelen türelem (Lélegző fal) installáció a Kérem, sóhajtson, Széchenyi Úr! kiállításon, Godot Kortárs Művészeti Intézet, 2024"/>
        </div>

        <div className="w-full h-full py-[70px] md:py-[150px] lg:py-[200px] flex items-center justify-center">
        <StaggeredSplitText>Az installáción megjelenő mozgás visszafogott, alig vesszük észre. A fókuszált figyelem és tekintet határait feszegeti, miközben a lassú mozgás követése egy kutató türelmére készteti a nézőt. A Lélegző fal egyúttal egy optikai játékot űz velünk: a fal síkjának emelkedése és süllyedése szemből alig érzékelhető, a mozgást elnyeli az egynemű fehér felület, míg oldalról már látható a kidomborodó, majd visszaereszkedő anyag. A művön végbemenő változás a lélegző mellkas mozgását idézi. <br></br><br></br>A Végtelen türelem minimalista, transzcendentális hatást kelt, víziószerűen mutatva be a pavilon légzését. A metafizikai valóságra reflektáló installáció a világ észrevétlen, testetlen mozgatójára utal. Az installáció a kiállítás alatt bejárt asszociációs kör végpontjaként környezet és légmozgás kapcsolatának, valamint a pneuma cosmic gondolatának elvont, absztrakt megfogalmazása.</StaggeredSplitText>
        </div>

        <Video thumbnail="/images/exhibition-4/video.webp" videoID="ND5wqvvxMrM" />


        <div className="w-full h-full py-[70px] md:py-[150px] lg:py-[200px] flex items-center justify-center">
        <StaggeredSplitText>Koronczi Endre első lélegző fal installációja 2018-ban került bemutatásra az azonos című Végtelen türelem projektkiállításon, Budapesten. A mű egy polgári otthon múlttal átitatott terében jelent meg, felületén tapétamintával. Hat évvel később, 2024-ben készült el az installáció egy új változata, azonos címmel Koronczi Endre Kérem, sóhajtson Széchenyi Úr! egyéni kiállításán a Godot Kortárs Művészeti Intézetben.<br></br><br></br>Ekkor a mű steril, white cube típusú térben valósult meg, a használt anyag is homogén, fehér, így nem hordozta magán a személyesség érzetét, tisztán a jelenségre került a hangsúly. A 61. Velencei Képzőművészeti Biennálén megvalósuló Végtelen türelem installáció ehhez áll legközelebb, ám a pozícionálás tekintetében eltérést mutatnak.</StaggeredSplitText>
        </div>

        <div className="mx-auto flex flex-col gap-[10px] mb-[70px] md:mb-[150px] lg:mb-[200px] w-[90vw] xl:w-[1050px]">
            <p className="font-gara text-middark text-lg sm:text-h4 md:text-h3">TOVÁBBI TARTALMAK</p>
            <AnimatedLink external={true} size="large" text="Végtelen Türelem VIDEÓ" href="https://www.youtube.com/watch?v=Q6nwi3D_nvM&feature=youtu.be" />
        </div>

        <Footer />
    </div>
    )

}