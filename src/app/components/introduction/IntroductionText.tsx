import StaggeredSplitText from "../common/StaggeredSplitText";
import IntroductionName from "./IntroductionName";

export default function IntroductionText() {
    return (
        <div data-gsap="introduction-text" className="w-full h-full bg-dark">
            <div className="w-full h-full pt-[70px] md:pt-[150px] flex flex-col items-center justify-start">
            <IntroductionName name="CSERHALMI Luca" />
                <StaggeredSplitText>1995-ben született, esztéta, művészeti író és kurátor, jelenleg Budapesten él. Rendszeresen publikál, valamint esztétika szakon phd hallgató. Érdeklődésének középpontjában a kritikai mozgásformák megjelenése a képzőművészetben, valamint a környezetesztétikai diskurzusok és a kortárs művészet kapcsolata áll.  Az ECHO környezetesztétikai projekt társalapítója.</StaggeredSplitText>
            </div>
            <div className="w-full h-full pt-[70px] md:pt-[150px] flex flex-col items-center justify-start">
            <IntroductionName name="KORONCZI Endre" />
                <StaggeredSplitText>(1968–) a kortárs magyar képzőművészet egyik meghatározó, interdiszciplináris alkotója, aki a konceptuális gondolkodás és a poétikus érzékenység határán dolgozik. Munkáiban a lélek, az anyag és a természet kölcsönhatásait, valamint az emberi kapcsolatok, a hétköznap helyzetek és az érzelmek láthatatlan dinamikáit vizsgálja. <br></br><br></br>A kilencvenes évek performanszaitól és „önfestő képeitől” a Szinkron, a BASIC Project, az ExtrémAlvás és Ploubuter Parkig ívelő életmű az idő, a hétköznapi szerepek, a részvétel és a jelenlét valamint a szabadság fogalmát kutatja. A művész a mindennapi jelenségekben – kopásban, szélben, mozdulatban, légáramlásban – fedezi fel a transzcendens összefüggéseket. Műveit számos hazai és nemzetközi intézmény mutatta be, köztük a Magyar Nemzeti Galéria, a Ludwig Múzeum, a Műcsarnok, valamint több európai biennále és galéria.<br></br><br></br>Koronczi az 1999-ben fejlesztett <a className="underline" href="https://ikon.hu/" target="_blank">ikOn – a képzőművészet élet eseményi</a> online portál és adatbázis alapító szerkesztője és fenntartója.</StaggeredSplitText>
            </div>
        </div>
    )
}