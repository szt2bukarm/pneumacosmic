"use client"
import { useEffect, useRef } from "react"
import TransitionLink from "../TransitionLink"
import PageNavHeader from "../components/common/PageNavHeader"
import { useStore } from "../useStore"

export default function Page() {
  const splineRef = useRef<HTMLDivElement>(null)
  const {setOverlayText} = useStore();

  const openOverlay = () => {
    setOverlayText("A Lebegő hipotézis című mű a Pneuma Cosmic projekt fogalmi és vizuális asszociatív térképe. Azokat a videókat, kifejezéseket és képeket mutatja be, melyek a pneuma cosmicmint hipotetikus kutatási tárgy művészeti feltárása alatt meghatározóvá váltak. A mű segít közelebb kerülni a pneuma cosmic  fiktív kutatási projektjéhez, amelynek célja nem egy konkrét jelenség leírása, hanem egy körvonalak nélküli sejtés megragadására tett kísérlet.<br><br>A Lebegő hipotézis pontokat jelöl ki, az összefüggések saját olvasata a nézőben születik meg. A kérdések feltevése, a befogadóban megfogalmazódó intuitív gondolati folyamat a kiállítás meghatározó eleme. A Lebegő hipotézis által felkínált kulcsok egy még be nem fejezett, tapogatózó kutatásba, egy kifejtetlen, cikázó gondolatba engednek betekintést. A mű annak a felvetésnek a leképezése, miszerint az analitikus elme nem mindenhez enged hozzáférést, és olykor érdemes a rendszerező struktúrák mellett a kevésbé tudatos gondolati folyamatokat is segítségül hívni, hogy közelebb kerüljünk a kívántmegismeréséhez.")
  }

  useEffect(() => {
    // Dynamically load the Spline viewer script
    const script = document.createElement("script")
    script.src = "https://unpkg.com/@splinetool/viewer@1.10.64/build/spline-viewer.js"
    script.type = "module"
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="relative w-screen h-screen">
      <spline-viewer
        ref={splineRef}
        url="https://prod.spline.design/3w84BwUrBJ9uKgeJ/scene.splinecode"
        style={{ width: "100%", height: "100%" }}
      ></spline-viewer>

      <div className="px-[30px] xl:px-[90px] py-[60px] flex flex-col xl:flex-row justify-end gap-[30px] xl:justify-between xl:items-center absolute w-full h-[400px] md:h-[300px] xl:h-[200px] bg-gradient-to-b from-transparent to-black bottom-0 left-0 z-1">
            <div className="flex flex-col gap-[8px]">
                <p className="font-hal text-middark text-md leading-none">Bal oldali kör alakú terem</p>
                <p className="font-gara text-middark text-lg md:text-h4 leading-none">LEBEGŐ HIPOTÉZIS</p>
            </div>

            <button onClick={openOverlay} className="font-hal text-midlight text-lg md:text-lg cursor-pointer hover:opacity-50 transition-opacity duration-150 w-fit">→ Bővebben</button>

      </div>
      
      
    </div>
  )
}
