"use client"
import { useParams } from "next/navigation";
import StaggeredSplitText from "../common/StaggeredSplitText";
import Video from "../common/Video";
import IntroductionName from "./IntroductionName";

export default function IntroductionText() {
    const {locale} = useParams();
    return (
        <div data-gsap="introduction-text" className="w-full h-full bg-dark">
            <div className="w-full h-full pt-[70px] md:pt-[150px] flex flex-col items-center justify-start">

            <IntroductionName name={locale == "hu" ? "KORONCZI Endre" : "Endre KORONCZI"} />
                <StaggeredSplitText>
                {locale == "hu" && (
                    <>
                    <b>Koronczi Endre</b> (1968) Budapesten élő interdiszciplináris alkotó, művészetét konceptuális gondolkodás és poétikus érzékenység jellemzi. Munkáiban a transzcendens világ és a természet kölcsönhatásait, valamint az emberi kapcsolatok, a hétköznapi helyzetek és az érzelmek dinamikáját vizsgálja. Az 1990-es évek elején performanszokkal és „önfestő képekkel” indult el pályáján, majd olyan meghatározó, hosszútávú projekteket hozott létre, mint a Szinkron, a BASIC Project, az ExtrémAlvás és a Ploubuter Park. Műveiben a mindennapi jelenségeket transzcendentális és metaforikus összefüggéseikben tárja fel. Művészeti projektjeit a legjelentősebb magyarországi intézmények állították ki, köztük a Magyar Nemzeti Galéria, a Ludwig Múzeum, a Műcsarnok, valamint többek között Rio de Janeiróban, Berlinben, Prágában, Bécsben, Rotterdamban is bemutatták. A 2000 óta működő <a className="text-white hover:text-white hover:opacity-65 transition-all duration-150" href="https://ikon.hu/" target="_blank">ikOn – a képzőművészeti élet eseményei</a> online portál és adatbázis alapító szerkesztője és fenntartója. Az Eszterházy Károly Katolikus Egyetem oktatója.<br></br><br></br></>
                )}
                {locale == "en" && (
                    <>
                    <b>Endre Koronczi</b> (1968) is an interdisciplinary artist living in Budapest. His art is characterised by conceptual thought and poetic sensitivity. In his works, he examines the interactions between the transcendent world and nature, as well as the dynamics of human relationships, everyday situations, and emotions. He started his career in the early 1990s with performances and “self-painting pictures,” then went on to create such significant long-term projects as Synchron, the BASIC Project, ExtremeSleeping, and Ploubuter Park. In his works, he explores everyday phenomena in transcendental and metaphorical contexts. His art projects have been exhibited by the most prestigious institutions in Hungary, including the Hungarian National Gallery, the Ludwig Museum, and the Műcsarnok / Kunsthalle, as well as such international locations as Rio de Janeiro, Berlin, Prague, Vienna, and Rotterdam, among other places. He is the founder and editor of the <a className="text-white hover:text-white hover:opacity-65 transition-all duration-150" href="https://ikon.hu/" target="_blank">ikOn – Events of the Visual Art Scene</a> online platform and archive operating since 2000. He is assistant professor at Eszterházy Károly Catholic University in Eger.<br></br><br></br></>
                )}

                <a className="text-white hover:text-white hover:opacity-65 transition-all duration-150" href="http://koronczi.hu/" target="_blank">www.koronczi.hu</a><br></br>
                <a className="text-white hover:text-white hover:opacity-65 transition-all duration-150" href="https://www.instagram.com/ploubuter_park/" target="_blank">instagram.com/ploubuter_park</a><br></br>
                <a className="text-white hover:text-white hover:opacity-65 transition-all duration-150" href="https://www.youtube.com/@EndreKoronczi/videos" target="_blank">youtube.com/@EndreKoronczi</a><br></br>
                <a className="text-white hover:text-white hover:opacity-65 transition-all duration-150" href="https://www.facebook.com/koronczi" target="_blank">facebook.com/koronczi</a><br></br>
                <a className="text-white hover:text-white hover:opacity-65 transition-all duration-150" href="https://blog.pneumacosmic.hu/" target="_blank">blog.pneumacosmic.hu</a>
            </StaggeredSplitText>
            <div data-gsap="introduction-video" className="py-[100px] md:py-[150px] bg-dark">
            <Video thumbnail="/images/saroslab.webp" videoID="YDMhk-hT7u0" />
            </div>

            <div className="w-full h-full pb-[70px] md:pb-[150px] flex flex-col items-center justify-start">
            <IntroductionName name={locale == "hu" ? "CSERHALMI Luca" : "Luca CSERHALMI"} />
                <StaggeredSplitText><b>{locale == "hu" ? "Cserhalmi Luca" : "Luca Cserhalmi"}</b> {locale == "hu" && '(1995) esztéta, művészeti író és független kurátor, Budapesten él. Rendszeresen publikál, valamint az Eötvös Loránd Tudományegyetem Esztétika Programjának doktorandusza. Érdeklődésének középpontjában a kritikai mozgásformák megjelenése a képzőművészetben, valamint a környezetesztétikai diskurzusok és a kortárs művészet kapcsolata áll. Az ECHO környezetesztétikai projekt társalapítója, valamint a Research Center of Aesthetic, Nature and Environment kutatócsoport tagja.'}{locale == "en" && '(1995) is an aesthete, art writer and independent curator living in Budapest. She is regularly published and is a doctoral candidate at the Eötvös Loránd University’s Aesthetics Program. Her research is focused on the appearance of critical forms of movement in visual art and the reflective relationship between environmental aesthetics discourses and contemporary art. She is co-founder of the ECHO environmental aesthetics project and a member of the Research Center of Aesthetics, Nature and Environment.'}</StaggeredSplitText>
            </div>
            </div>
        </div>
    )
}