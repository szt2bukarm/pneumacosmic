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
        lenis?.scrollTo(0,{immediate: true})
        setTimeout(() => {
            lenis?.stop();
            setTimeout(() => {
                window.scrollTo(0,0)
            }, 10);
        }, 5);
    },[])


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

    <div className="relative w-screen min-h-screen bg-black overflow-x-hidden">

        <PageNavHeader />
        <PageTitle delay={2.5} subtext="Bal oldali szárny" text="BENNSZORULT LÉLEGZET" />

        <div className="h-[150vh] w-screen fixed top-0 left-0">
        <Exhibiton2Render />
        </div>

        <div className="h-[calc(100vh-290px)]"></div>

        <div className="relative w-full h-full bg-black">

        <div className="w-full h-full py-[70px] md:py-[150px] lg:py-[200px] flex items-center justify-center">
        <StaggeredSplitText>A pavilon bal szárnyában a Bennszorult lélegzet című mű kap helyet, mely a Magyar Tudományos Akadémia jelenleg is zajló felújítása során, a padlóból kibontott szellőztetőrendszer elemeiből épített monumentális installáció. <br></br><br></br>Az első terem szemléletét egy 150×180 cm-es szabadkézi rajz vezeti tovább ebbe a terembe, melyen a szél által átjárt MTA homlokzatának részletgazdag ábrázolása látható. A Bennszorult lélegzet installáció a terem hátsó kétharmadában helyezkedik el, valamint átkúszik az átriumba és az apszishoz vezető térbe</StaggeredSplitText>
        </div>

        <BlurredImageCarousel images={Array.from({ length: 12 }, (_, i) => `images/exhibition-2/gallery-1/${i+1}.webp`)} />

        <div className="w-full h-full py-[70px] md:py-[150px] flex items-center justify-center">
        <StaggeredSplitText>A Magyar Tudományos Akadémia székházának lélegzéséért láthatatlanul felelős tárgyak szimbolikusan a hazai tudományos élet nagyjainak leheletét, sóhajait, az agyakat átjáró oxigént őrzik. A szellőztetőrendszer a világot egybekötő levegőmozgáshoz kapcsolódik, ahogy a léghez hasonló testetlen gondolatok működésének alapja is a folyamatos, termékeny áramlás.</StaggeredSplitText>
        </div>

        <Video thumbnail="images/akusztikus.webp" videoID="zwJSWwiAQ5g" />

        <div
            className="relative w-full h-full md:h-[550px] lg:h-[800px] pt-[70px] pb-[70px] md:pt-0 md:pb-0 lg:mt-[140px] flex items-center justify-center"
            >
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <img data-gsap="exhibition-2-textbg" src="images/exhibition-2/exhibition-2-textbg.png" className="scale-110 w-full h-full object-cover z-1" />
            </div>

            <div className="absolute top-0 left-0 w-full h-full" style={{background: "linear-gradient(to bottom, rgba(5,5,5,1), rgba(5,5,5,0.75), rgba(5,5,5,1))"}}>
            </div>

            <StaggeredSplitText>Ennek analógiájaként az indusztriális tárgyakkal párbeszédbe állított természeti felvételek jelennek meg két falon, 12 Szakmai koncepció melyeken a lassan változó tájban megjelenő köd és fumarola jelenségek a pneuma cosmic bolygó léptékű, természeti megmutatkozásaiként jelennek meg. Az első teremben látható gondolati ábrához kapcsolódó figyelmes szemlélődést itt a természeti felvételeken megjelenő lassú mozgások befogadásának ritmusa viszi tovább.</StaggeredSplitText>
        </div>

        <PinnedImageReveal />

            <div className="w-full h-full py-[70px] md:py-[150px] lg:py-[220px] flex items-center justify-center">
                <StaggeredSplitText>Az archeológiai jelleget öltő installáció a korábban láthatatlanságba zárt, hétköznapi tárgyakat művészeti értékükben pozícionálja, ezzel egy újabb perspektívát kínálva a szellőztetőelemek szemléléséhez. A tárgyak ipari, kopottas teste ismeretlen eszköz benyomását kelti. Nagy tömegbe rendezve elidegenítő hatást keltenek, ugyanakkor hívogatnak a megismerésre, akárcsak egy kortárs rom által kiváltott kettős esztétikai élmény.</StaggeredSplitText>
            </div>

            <BlurredImageCarousel images={["images/akusztikus.webp", "images/bennszorult.webp", "images/fal.webp", "images/lelegzofal.webp", "images/paroslab.webp"]} />

            <div className="w-full h-full py-[70px] md:py-[150px] lg:py-[200px] flex items-center justify-center">
                <StaggeredSplitText>Az archeológiai jelleget öltő installáció a korábban láthatatlanságba zárt, hétköznapi tárgyakat művészeti értékükben pozícionálja, ezzel egy újabb perspektívát kínálva a szellőztetőelemek szemléléséhez. A tárgyak ipari, kopottas teste ismeretlen eszköz benyomását kelti. Nagy tömegbe rendezve elidegenítő hatást keltenek, ugyanakkor hívogatnak a megismerésre, akárcsak egy kortárs rom által kiváltott kettős esztétikai élmény.</StaggeredSplitText>
            </div>

            <Footer />
        </div>
    </div>
    )

}