"use client"
import { useStore } from "../useStore"

export default function Vignette() {
  return (
    <div
      data-element="vignette"
      className="opacity-0 fixed w-full h-full top-0 left-0 z-[30] pointer-events-none"
      style={{
        background: `
          /* top fade */
          linear-gradient(to bottom, rgba(0,0,0,0.8), transparent 20%),
          /* bottom fade */
          linear-gradient(to top, rgba(0,0,0,0.8), transparent 20%),
          /* radial center fade */
          radial-gradient(circle at center,
            rgba(0,0,0,0) 20%,
            rgba(0,0,0,0.3) 50%,
            rgba(0,0,0,0.5) 80%,
            rgba(0,0,0,1) 100%
          )
        `,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    ></div>
  )
}
