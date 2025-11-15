"use client"
import SplitText from "gsap/SplitText"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import ScrollTrigger from "gsap/src/ScrollTrigger"
import StaggeredSplitText from "../common/StaggeredSplitText"
import { useStore } from "@/app/useStore"
gsap.registerPlugin(SplitText, ScrollTrigger)

export default function LandingText() {
    const {setOverlayText} = useStore();

    const openOverlay = () => {
      setOverlayText("Koronczi Endre<br>Pneuma Cosmic<br><br>A Pneuma Cosmic a 61. Velencei Képzőművészeti Biennálé Magyar Pavilonjában valósul meg. A kiállítás alapja egy fiktív kutatás, mely a világ egészét kitöltő, légmozgásként megmutatkozó kozmikus lehelet megjelenési formáit tárja fel. A projektben a tudományos kutatások logikája és a mélyen metaforikus, asszociatív gondolatpárhuzamok egyaránt megjelennek, mely a kiállítás bejárásának folyamán feloldódik, bizonyítás helyett egy sejtést mutatva be.<br>A kiállítás konceptualista, efemer művekből épül fel, melyek a légmozgás és az anyagtalan világ között állítanak párhuzamot, felhívva a figyelmet a környezetünk intuitív megéléséből fakadó tapasztalatok komplexitására. Koronczi Endre Pneuma Cosmic című projektjében meghatározó a lassúság, a megfigyelés és az elvont asszociációs gondolatok ötvözéséből születő tapasztalat. A pneuma cosmic kifejezés egy mindent átható, láthatatlan, vitalizáló, áramló mozgatóerő hipotézisére utal. A kiállítás költői, filozofikus nyelvezete mellett szorosan kapcsolódik a kortárs környezetesztétikai és környezetpszichológiai diskurzusokhoz, amelyek kultúra, ember és természet kapcsolatát vizsgálják. Egyén és külvilág határainak újrapozícionálása vagy épp elmosása azzal az előnnyel járhat, hogy új típusú kötődést és felelősséget alakítunk ki a környezetünkkel szemben. A kiállításon felvázolt megfigyelési struktúra mélyen szubjektív és intuitív jellegű. A Pneuma Cosmic a humán tudományok és a művészeti kutatások módszereit ötvözve közelít egy a természettudományok hatásköre alá tartozó jelenséghez, a légmozgáshoz.<br>Koronczi Endre az elmúlt évtizedekben szabadtéri kísérletek és kiállítótéri modellek segítségével vizsgálja a légáramlás reprezentációjának művészeti lehetőségeit. A pavilonban bemutatásra kerülő  installációk ennek a művészeti praxisnak az eredményeként a pneuma cosmic létezését bizonyító kutatás eredményei, melyeket Koronczi kimondottan analóg felfogással, lassú szemlélődésre hangolva tervezett. A kiállítás négy szakaszból épül fel, melyek lekövetik a kutatást kísérő gondolkodási struktúrát, a konkréttól az egyre inkább elvont, az érzékelés határait feszegető művek felé kísérve a látogatót.<br><br>pneuma cosmic jelentése:<br><br>Fiktív fogalom, mely a pneuma (latin, jelentése: lehelet, szellő, lélek) és a cosmic (kozmikus) szavakból képzett új kifejezés. A világot betöltő légmozgás jelenségéből kiinduló metafora a szélnek mindent vitalizáló, mozgató, élettel töltő adottságot tulajdonít. A légmozgás, mely a világ legnagyobb részén állandó jelleggel van jelen, oxigénnel tölti meg a szárazföldi élőlények tüdejét, összeköti a glóbusz legapróbb és legtágasabb pontjait, folyamatosan áramlik egyik dologból a másikba, láthatatlanul alakítja környezetét. A megfoghatatlan, láthatatlan létező, mely ilyen általános hatással van a világ működésére, a légneműség által a transzcendenciához, mozgása által a vitalitáshoz kapcsolódik. A Pneuma Cosmic fogalma ennek a jelenségnek az érzékelésünket meghaladó kivetüléseire, transzcendentális asszociációira hívja fel a figyelmet.")
    }

    return (
        <div data-gsap="landing-text" className="mt-[100vh] relative w-screen h-fit py-[70px] md:py-[100px] xl:py-[120px] flex items-center justify-center flex-col gap-[85px] z-10">
            <StaggeredSplitText>
            A <span className="font-garabold"><i>Pneuma Cosmic</i></span> Koronczi Endre képzőművész projektje, mely 60. Velencei Képzőművészeti Biennálé Magyar Pavilonjában kerül bemutatásra, kurátor: Cserhalmi Luca. A kiállítás Koronczi Ploubuter Park nevű művészeti kutatásának része, melynek keretében több évtizede kutatja a szél és a légmozgás jelenségét.<br></br><br></br> A Pneuma Cosmic fogalom a légmozgás egy metaforikus megközelítéséből indul ki, mely egy mindent átható, az anyagi világot láthatatlanul vitalizáló mozgatóerőre utal. A tájakat átjáró szél és az emberi sóhajtás a szellemi világ áramló gondolataival egyesül ebben gondolatban. A projekt részét képzik talált leletek, fiktív és valós dokumentációk, fogalommagyarázatok, videó- és kinetikus installációk, valamint Balogh Máté zeneszerző akusztikus eleme.
            </StaggeredSplitText>

            <button onClick={openOverlay} className={`relative z-5 flex items-center justify-center font-hal w-fit px-[50px] h-[60px] rounded-[50px] bg-dark border border-[#7D7D7D] text-middark text-lg ease-in-out hover:opacity-50 hover:cursor-pointer transition-opacity duration-150`}>Bővebben →</button>

        </div>
    )
}