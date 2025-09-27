"use client"
import { useEffect, useRef } from "react"
import TransitionLink from "../TransitionLink"
import PageNavHeader from "../components/common/PageNavHeader"

export default function Page() {
  const splineRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   // Dynamically load the Spline viewer script
  //   const script = document.createElement("script")
  //   script.src = "https://unpkg.com/@splinetool/viewer@1.10.64/build/spline-viewer.js"
  //   script.type = "module"
  //   document.body.appendChild(script)

  //   return () => {
  //     document.body.removeChild(script)
  //   }
  // }, [])

  return (
    <div className="relative w-screen h-screen">
      {/* <spline-viewer
        ref={splineRef}
        url="https://prod.spline.design/3w84BwUrBJ9uKgeJ/scene.splinecode"
        style={{ width: "100%", height: "100%" }}
      ></spline-viewer> */}

      <div className="px-[30px] xl:px-[90px] py-[60px] flex flex-col xl:flex-row justify-end gap-[30px] xl:justify-between xl:items-center absolute w-full h-[400px] md:h-[300px] xl:h-[200px] bg-gradient-to-b from-transparent to-black bottom-0 left-0 z-1">
            <div className="flex flex-col gap-[8px]">
                <p className="font-hal text-middark text-md leading-none">Bal oldali kör alakú terem</p>
                <p className="font-gara text-middark text-lg md:text-h4 leading-none">EGY FIKTÍV KUTATÁS LÁTKÉPE</p>
            </div>

            <a className="font-hal text-midlight text-lg md:text-lg cursor-pointer hover:opacity-50 transition-opacity duration-150">→ Pneuma Cosmic WIKI</a>

      </div>
      
      
      <PageNavHeader />
    </div>
  )
}
