"use client"

import { useState, useRef, useEffect } from "react"
import YouTube, { YouTubeProps } from "react-youtube"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import { useGSAP } from "@gsap/react"
gsap.registerPlugin(ScrollTrigger);

interface Props {
  thumbnail: string
  videoID: string
}

export default function Video({ thumbnail, videoID }: Props) {
  const [isStarted, setIsStarted] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  // Update iframe height on mount and window resize
  useEffect(() => {
    const updateHeight = () => {
      if (wrapperRef.current) {
        setHeight(wrapperRef.current.clientHeight)
      }
    }

    updateHeight()
    window.addEventListener("resize", updateHeight)
    return () => window.removeEventListener("resize", updateHeight)
  }, [])

  const handleEnd: YouTubeProps["onEnd"] = () => {
    console.log("Video ended!")
    setIsStarted(false)
  }

  const handleReady: YouTubeProps["onReady"] = (event) => {
    event.target.playVideo()
  }

  useGSAP(() => {
    let pauseTrigger = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top-=500 center",
      end: "bottom+=500 center",
      onLeaveBack: () => {
        if (isStarted) setIsStarted(false)
      },
      onLeave: () => {
        if (isStarted) setIsStarted(false)
      }
    })
    return () => pauseTrigger.kill();
  },[isStarted])

  return (
    <div
      ref={wrapperRef}
      className="relative h-[52vw] lg:h-[50vw] 2xl:h-[40vw] mx-auto aspect-video rounded-[4px] lg:rounded-[4px] overflow-hidden"
    >
      {!isStarted && (
        <>
          <img
            src={thumbnail}
            className="w-full h-full object-cover pointer-events-none"
          />
          <div
            onClick={() => setIsStarted(true)}
            className="cursor-pointer absolute top-0 left-0 w-full h-full flex items-center justify-center group bg-[#05050530] hover:bg-[#0505054a] duration-150 transition-all"
          >
            <img
              src="video-play.svg"
              className="group-hover:w-[120px] group-hover:lg:w-[250px] transition-all duration-150 ease-in-out w-[150px] lg:w-[300px]"
              style={{ filter: "drop-shadow(0px 0px 20px #000)" }}
            />
          </div>
        </>
      )}

      {isStarted && (
        <YouTube
          videoId={videoID}
          className="absolute top-0 left-0 w-full"
          opts={{
            width: "100%",
            height: height, // dynamically match wrapper
            playerVars: {
              autoplay: 1,
              controls: 1,
              modestbranding: 1,
              rel: 0,
            },
          }}
          onEnd={handleEnd}
          onReady={handleReady}
        />
      )}
    </div>
  )
}
