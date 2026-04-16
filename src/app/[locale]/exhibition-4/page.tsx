"use client"
import { useEffect, useRef } from "react"
import TransitionLink from "../../TransitionLink"
import PageNavHeader from "../../components/common/PageNavHeader"
import { useStore } from "../../useStore"
import gsap from "gsap"
import { useParams } from "next/navigation"
import Script from "next/script" // Added import

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { 
        url?: string;
        style?: React.CSSProperties;
        magyar?: string | number;
        spline?: {
          setVariable: (name: string, value: string | number | boolean) => void;
        };
      };
    }
  }
}

export default function Page() {
  const splineRef = useRef<HTMLElement>(null)
  const {setOverlayText, setOverlayWiki, isMobile} = useStore();
  const {locale} = useParams();

  const openOverlay = () => {
    setOverlayWiki(true);
    // Intentionally kept identical translation texts
    if (locale == "hu") {
      setOverlayText("A Pneuma Cosmic projekt fogalmi és vizuális asszociatív térképe a Lebegő hipotézis. Azokat a videókat, kifejezéseket és képeket mutatja be, melyek a pneuma cosmic mint hipotetikus kutatási tárgy művészeti feltárása alatt meghatározóvá váltak. Az installáció segít közelebb kerülni a pneuma cosmic fiktív kutatási projektjéhez, amelynek célja nem egy konkrét jelenség leírása, hanem egy körvonalak nélküli sejtés megragadására tett kísérlet. Koronczi itt pontokat jelöl ki, az összefüggések olvasata a nézőben születik meg. A kérdésfelvetés, a befogadóban létrejövő intuitív gondolkodási folyamat a kiállítás meghatározó eleme. A Lebegő hipotézis által felkínált kulcsok egy még be nem fejezett, tapogatózó kutatásba, cikázó gondolatokba engednek betekintést. A mű annak a tapasztalatnak a leképezése, miszerint az analitikus elme nem mindenhez enged hozzáférést, és olykor érdemes segítségül hívni a rendszerező struktúrák mellett a kevésbé tudatos gondolati folyamatokat is, hogy közelebb kerüljünk a megismeréshez.")
    }
    if (locale == "en") {
      setOverlayText("Floating Hypothesis is the conceptual and visual associative map of the Pneuma Cosmic project. It presents the videos, expressions, and images that gained key importance during the artistic exploration of pneuma cosmic as a hypothetical research subject. The installation helps the visitor get closer to the Pneuma Cosmic fictional research project, which aims not to describe a well-delineated phenomenon, but to grasp a vague conjecture. Here, Koronczi marks points of interest, and it is left to the spectator to interpret the correlations. The act of posing questions and the intuitive thought process that takes place in the spectator are defining elements of the exhibition. The clues offered by Floating Hypothesis allow insight into unfinished, tentative research and zigzagging thoughts. The work reflects the experience that the analytical mind does not grant access to everything, and in order to come closer to understanding, it is sometimes worthwhile to call upon less conscious thought processes alongside organising structures.")
    }
  }

  // Removed the script-injection useEffect entirely

  useEffect(() => {
    const el = splineRef.current as any
    if (!el) return

    const onSplineLoad = () => {
      // Robust check for the Spline application instance
      const splineApp = el.spline || el._spline;
      
      if (splineApp && typeof splineApp.setVariable === 'function') {
        splineApp.setVariable('magyar', locale == "hu" ? 100 : 0)
        splineApp.setVariable('angol', locale == "en" ? 100 : 0)
      } else if (typeof el.setVariable === 'function') {
        el.setVariable('magyar', locale == "hu" ? 100 : 0)
        el.setVariable('angol', locale == "en" ? 100 : 0)
      }
    }

    el.addEventListener('load-complete', onSplineLoad)

    return () => el.removeEventListener('load-complete', onSplineLoad)
  }, [])

  useEffect(() => {
    const el = splineRef.current
    if (!el) return
  
    customElements.whenDefined("spline-viewer").then(() => {
      const shadow = el.shadowRoot
  
      const checkScene = setInterval(() => {
        const canvas = shadow?.querySelector("canvas")
        const logo = shadow?.querySelector("a#logo")
        if (canvas) {
          clearInterval(checkScene)
          logo?.remove(); // Shadow DOM logo removal kept
          gsap.to('[data-gsap="exhibition-1-wrapper"]', {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: 1,
            ease: "power2.out",
          })
        }
      }, 100)
  
      return () => clearInterval(checkScene)
    })
  }, [])

  return (
    <div className="relative w-screen h-screen">
      {/* Next.js Script Optimization handled here */}
      <Script 
        type="module" 
        src="https://unpkg.com/@splinetool/viewer@1.10.64/build/spline-viewer.js" 
        strategy="afterInteractive" 
      />

      <div data-gsap='exhibition-1-wrapper' className="w-screen h-screen opacity-0 scale-125">
      <spline-viewer
        ref={splineRef as React.RefObject<HTMLElement>}
        url="https://prod.spline.design/3w84BwUrBJ9uKgeJ/scene.splinecode"
        style={{ width: "100vw", height: "100vh" }}
      ></spline-viewer>
      </div>

      <div className="px-[30px] xl:px-[90px] py-[60px] flex flex-col xl:flex-row justify-end gap-[30px] xl:justify-between xl:items-center absolute w-full h-[400px] md:h-[300px] xl:h-[200px] bg-gradient-to-b from-transparent to-black bottom-0 left-0 z-1 pointer-events-none">
            <div className="flex flex-col gap-[8px]">
                <p className="font-gara text-middark text-lg md:text-h4 leading-none">{locale == "hu" && 'LEBEGŐ HIPOTÉZIS'}{locale == "en" && 'FLOATING HYPOTHESIS'}</p>
                {!isMobile && (
                  <div className="flex items-center gap-[12px]">
                    <p className="font-hal text-middark text-md leading-none">{locale == "hu" && 'Navigáció:'}{locale == "en" && 'Navigation:'}</p>
                    <img alt="mouse move icon" src="/mouseicon.webp" className="w-[16px]" />
                  </div>
                )}
            </div>

            <button onClick={openOverlay} className="font-hal text-midlight text-lg md:text-lg cursor-pointer hover:opacity-50 transition-opacity duration-150 w-fit pointer-events-auto">{locale == "hu" && '→ Bővebben'}{locale == "en" && '→ More'}</button>

      </div>
    </div>
  )
}