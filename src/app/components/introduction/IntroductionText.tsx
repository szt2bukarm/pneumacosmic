import StaggeredSplitText from "../common/StaggeredSplitText";
import Video from "../common/Video";
import IntroductionName from "./IntroductionName";

export default function IntroductionText() {
    return (
        <div data-gsap="introduction-text" className="w-full h-full bg-dark">
            <div className="w-full h-full pt-[70px] md:pt-[150px] flex flex-col items-center justify-start">
            <IntroductionName name="CSERHALMI Luca" />
                <StaggeredSplitText>1995-ben született esztéta, művészeti író és független kurátor, Budapesten él. Rendszeresen publikál, valamint az Eötvös Loránd Tudományegyetem Esztétika Programjának doktorandusza. Érdeklődésének középpontjában a kritikai mozgásformák megjelenése a képzőművészetben, valamint a környezetesztétikai diskurzusok és a kortárs művészet kapcsolata áll. Az ECHO környezetesztétikai projekt társalapítója, valamint a Research Center of Aesthetic, Nature and Environment kutatócsoport tagja.</StaggeredSplitText>
            </div>

            <div data-gsap="introduction-video" className="py-[100px] md:py-[150px] lg:py-[200px] bg-dark">
            <Video thumbnail="images/saroslab.webp" videoID="kG5n-XbcAzs" />
            </div>

            <div className="w-full h-full pb-[70px] md:pb-[150px] flex flex-col items-center justify-start">
            <IntroductionName name="KORONCZI Endre" />
                <StaggeredSplitText>(1968) Budapesten élő interdiszciplináris alkotó, művészetét konceptuális gondolkodás és poétikus érzékenység jellemzi. Munkáiban a transzcendens világ és a természet kölcsönhatásait, valamint az emberi kapcsolatok, a hétköznapi helyzetek és az érzelmek dinamikáját vizsgálja. Az 1990-es években performanszokkal és „önfestő képekkel” indult el pályáján, majd olyan meghatározó, hosszútávú projekteket hozott létre, mint a Szinkron, a BASIC Project, az Extrém Alvás és a Ploubuter Park. Műveiben a mindennapi jelenségeket transzcendentális és metaforikus összefüggéseikben tárja fel. Művészeti projektjeit a legjelentősebb magyarországi intézmények állították ki, köztük a Magyar Nemzeti Galéria, a Ludwig Múzeum, a Műcsarnok, valamint többek között New Yorkban, Rio de Janeiróban, Tokióban, Párizsban, Berlinben, Rómában, Prágában, Bécsben, Rotterdamban is bemutatták. A 2000 óta működő <a className="text-yellow hover:text-white hover:opacity-65 transition-all duration-150" href="https://ikon.hu/" target="_blank">ikOn – a képzőművészet élet eseményi</a> online portál és adatbázis alapító szerkesztője és fenntartója. Az Eszterházy Károly Katolikus Egyetem docense.<br></br><br></br>
                <a className="text-yellow hover:text-white hover:opacity-65 transition-all duration-150" href="http://koronczi.hu/" target="_blank">www.koronczi.hu</a><br></br>
                <a className="text-yellow hover:text-white hover:opacity-65 transition-all duration-150" href="https://www.instagram.com/ploubuter_park/" target="_blank">instagram.com/ploubuter_park</a><br></br>
                <a className="text-yellow hover:text-white hover:opacity-65 transition-all duration-150" href="https://www.youtube.com/@EndreKoronczi/videos" target="_blank">youtube.com/@EndreKoronczi</a><br></br>
                <a className="text-yellow hover:text-white hover:opacity-65 transition-all duration-150" href="https://www.facebook.com/koronczi" target="_blank">facebook.com/koronczi</a><br></br>
                <a className="text-yellow hover:text-white hover:opacity-65 transition-all duration-150" href="https://blog.pneumacosmic.hu/" target="_blank">blog.pneumacosmic.hu</a>
            </StaggeredSplitText>
            </div>
        </div>
    )
}