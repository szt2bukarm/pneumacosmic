"use client"
import SplitText from "gsap/SplitText"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import ScrollTrigger from "gsap/src/ScrollTrigger"
import StaggeredSplitText from "../common/StaggeredSplitText"
import { useStore } from "@/app/useStore"
import { useParams } from "next/navigation"
gsap.registerPlugin(SplitText, ScrollTrigger)

export default function LandingText() {
    const {setOverlayText,setOverlayWiki} = useStore();
    const {locale} = useParams();

    const openOverlay = () => {
        setOverlayWiki(true);
      setOverlayText("<b>Koronczi Endre<br>Pneuma Cosmic</b><span class='block mb-5'></span>A Pneuma Cosmic a 61. Velencei Képzőművészeti Biennále Magyar Pavilonjában valósul meg. A kiállítás alapja egy fiktív kutatás, mely a világ egészét kitöltő, légmozgásként megmutatkozó kozmikus lehelet megjelenési formáit tárja fel. A projektben a tudományos kutatások logikája és a mélyen metaforikus, asszociatív gondolatpárhuzamok egyaránt megjelennek. A kiállítás bejárásának folyamán a két eltérő megközelítésmód feloldódik, bizonyítás helyett egy sejtést mutatva be.<br><span class='block mb-5'></span>A kiállítás konceptualista, efemer művekből épül fel, melyek a légmozgás és az anyagtalan világ között állítanak párhuzamot, és ezzel felhívja a figyelmet környezetünk intuitív megéléséből fakadó tapasztalatok komplexitására. A projektben meghatározó a lassúság, a megfigyelés és az elvont, asszociációs gondolatok ötvözéséből születő tapasztalat. A pneuma cosmic kifejezés egy mindent átható, láthatatlan, vitalizáló, áramló mozgatóerő hipotézisére utal. A kiállítás költői, filozofikus nyelvezete mellett szorosan kapcsolódik a kortárs környezetesztétikai és környezetpszichológiai diskurzusokhoz, amelyek kultúra, ember és természet kapcsolatát vizsgálják. Egyén és külvilág határainak újrapozícionálása vagy épp elmosása azzal a következménnyel járhat, hogy új típusú kötődést és felelősséget alakítunk ki környezetünkkel szemben. A kiállításon felvázolt megfigyelési struktúra mélyen szubjektív és intuitív jellegű.<br><span class='block mb-5'></span>Koronczi Endre 2009 óta szabadtéri kísérletek és kiállítótéri modellek segítségével vizsgálja a légáramlás reprezentációjának művészeti lehetőségeit. A Magyar Pavilonban bemutatásra kerülő installációk ennek a művészeti praxisnak az eredményeként a pneuma cosmic létezésére irányuló kutatás eredményei, melyeket a művész kimondottan analóg felfogással, lassú szemlélődésre hangolva tervezett. A kiállítás négy egységből épül fel, amelyek követik a kutatást kísérő gondolkodási struktúrát, a konkréttól az egyre inkább elvont, az érzékelés határait feszegető művek felé kísérve a látogatót.<br><span class='block mb-5'></span><b>A pneuma cosmic jelentése</b><br><span class='block mb-5'></span>Fiktív fogalom, mely a pneuma (görög szó, jelentése: lehelet, szellő, lélek) és a cosmic (kozmikus) szavakból képzett új kifejezés. A világot betöltő légmozgás jelenségéből kiinduló metafora a szélnek mindent vitalizáló, mozgató, élettel töltő adottságot tulajdonít. A légmozgás, mely a világ legnagyobb részén állandó jelleggel van jelen, oxigénnel tölti meg a szárazföldi élőlények tüdejét, összeköti a glóbusz legapróbb és legtágasabb pontjait, folyamatosan áramlik egyik dologból a másikba, láthatatlanul alakítja környezetét. A megfoghatatlan, láthatatlan létező, mely ilyen általános hatással van a világ működésére, a légneműség által a transzcendenciához, mozgása által a vitalitáshoz kapcsolódik. A pneuma cosmic fogalma ennek a jelenségnek az érzékelésünket meghaladó kivetüléseire, transzcendentális asszociációira hívja fel a figyelmet.")
    }

    return (
        <div data-gsap="landing-text" className="mt-[100vh] relative w-screen h-fit py-[70px] md:py-[100px] xl:py-[120px] flex items-center justify-center flex-col gap-[85px] z-10">
                <StaggeredSplitText>
                    A Pneuma Cosmic Koronczi Endre képzőművész projektje a 61. Velencei Képzőművészeti Biennále Magyar Pavilonjában kerül bemutatásra. Kurátor Cserhalmi Luca. A kiállítás Koronczi Ploubuter Park művészeti kutatásának része, melynek keretében több évtizede kutatja a szél és a légmozgás jelenségét.<br></br><br></br>A pneuma cosmic fogalom a légmozgás egy metaforikus megközelítéséből indul ki, mely egy mindent átható, az anyagi világot láthatatlanul vitalizáló mozgatóerőre utal. A tájakat átjáró szél és az emberi sóhajtás a szellemi világ áramló gondolataival egyesül. A projekt részét képezik talált leletek, fiktív és valós dokumentációk, fogalommagyarázatok, video- és kinetikus installációk, valamint Balogh Máté zeneszerző akusztikus eleme.
                </StaggeredSplitText>

            <button onClick={openOverlay} className={`relative z-5 flex items-center justify-center font-hal w-fit px-[50px] h-[60px] rounded-[50px] bg-dark border border-[#7D7D7D] text-middark text-lg ease-in-out hover:opacity-50 hover:cursor-pointer transition-opacity duration-150`}>Bővebben →</button>

        </div>
    )
}