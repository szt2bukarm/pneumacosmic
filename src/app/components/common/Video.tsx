"use client"

import { useState, useRef, useEffect } from "react"
import YouTube, { YouTubeProps } from "react-youtube"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import { useGSAP } from "@gsap/react"
import { useStore } from "@/app/useStore"

gsap.registerPlugin(ScrollTrigger);

interface Props {
  thumbnail: string
  videoID: string
  startTime?: number
}

export default function Video({ thumbnail, videoID, startTime }: Props) {
  const { isMobile } = useStore()
  const [isStarted, setIsStarted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [player, setPlayer] = useState<any>(null)
  const [volume, setVolume] = useState(50)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

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

  // Time tracking loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && player) {
      interval = setInterval(() => {
        const time = player.getCurrentTime();
        const dur = player.getDuration();
        setCurrentTime(time);
        if (dur && duration === 0) setDuration(dur);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, player, duration]);

  // Fullscreen change listener to pause on exit
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = document.fullscreenElement || (document as any).webkitFullscreenElement || (document as any).mozFullScreenElement || (document as any).msFullscreenElement;
      if (!isFullscreen && isMobile && player) {
        player.pauseVideo();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("msfullscreenchange", handleFullscreenChange);
    };
  }, [isMobile, player]);

  const handleEnd: YouTubeProps["onEnd"] = () => {
    console.log("Video ended!")
    setIsPlaying(false)
    setIsStarted(false)
    setCurrentTime(0)
  }

  const handleReady: YouTubeProps["onReady"] = (event) => {
    setPlayer(event.target)
    setDuration(event.target.getDuration())
    event.target.setVolume(volume)
    event.target.playVideo()
    setIsPlaying(true)
  }

  const handleStateChange: YouTubeProps["onStateChange"] = (event) => {
    // 1 = playing, 2 = paused
    if (event.data === 1) {
      setIsPlaying(true);
      // Auto-fullscreen on mobile when playing
      if (isMobile && wrapperRef.current) {
        const el = wrapperRef.current as any;
        if (el.requestFullscreen) el.requestFullscreen();
        else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
        else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
        else if (el.msRequestFullscreen) el.msRequestFullscreen();
      }
    }
    if (event.data === 2) setIsPlaying(false);
  }

  const togglePlay = () => {
    if (!player) return;
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseInt(e.target.value);
    setVolume(newVol);
    if (player) player.setVolume(newVol);
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (player) player.seekTo(time);
  }

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  }

  useGSAP(() => {
    let pauseTrigger = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top-=500 center",
      end: "bottom+=500 center",
      onLeaveBack: () => {
        if (player) player.pauseVideo();
      },
      onLeave: () => {
        if (player) player.pauseVideo();
      }
    })
    return () => pauseTrigger.kill();
  }, [player])

  return (
    <div
      ref={wrapperRef}
      className="relative h-[52vw] lg:h-[50vw] 2xl:h-[40vw] mx-auto aspect-video rounded-[4px] lg:rounded-[4px] overflow-hidden group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {!isStarted && (
        <>
          <img
            alt="video thumbnail"
            src={thumbnail}
            className="w-full h-full object-cover pointer-events-none"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-[#00000020]"></div>
          <div
            onClick={() => setIsStarted(true)}
            className="cursor-pointer absolute top-0 left-0 w-full h-full flex items-center justify-center group bg-[#05050530] hover:bg-[#0505054c] duration-150 transition-all"
          >
            <img
              alt="video play button"
              src="/video-play.webp"
              className="group-hover:w-[120px] group-hover:lg:w-[280px] transition-all duration-150 ease-in-out w-[150px] lg:w-[300px]"
            />
          </div>
        </>
      )}

      {isStarted && (
        <>
          <YouTube
            videoId={videoID}
            className={`absolute top-0 left-0 w-full ${!isMobile ? 'pointer-events-none' : ''}`} // Disable pointer events only on desktop
            opts={{
              width: "100%",
              height: height,
              playerVars: {
                autoplay: 1,
                controls: isMobile ? 1 : 0, // Enable controls on mobile
                modestbranding: 1,
                rel: 0,
                disablekb: 1,
                fs: 0,
                playsinline: isMobile ? 0 : 1, // Force native fullscreen on iOS mobile
                start: startTime,
              },
            }}
            onEnd={handleEnd}
            onReady={handleReady}
            onStateChange={handleStateChange}
          />

          {/* Custom Overlay - Only on Desktop */}
          {!isMobile && (
            <div
              className={`absolute inset-0 transition-opacity duration-300 flex flex-col justify-end ${isHovering || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
            >
              {/* Dark Background to Obscure YouTube UI on Pause */}
              <div
                className={`absolute inset-0 transition-all duration-300 ${!isPlaying ? 'bg-[#050505]/80 backdrop-blur-sm' : 'bg-transparent'}`}
                onClick={togglePlay}
              ></div>

              {/* Center Play Button (Only when paused) */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <img
                    alt="video play button"
                    src="/video-play.webp"
                    className="w-[100px] lg:w-[200px] opacity-80"
                  />
                </div>
              )}

              {/* Bottom Controls Container */}
              <div className="relative z-10 w-full p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col gap-2">
                {/* Seek Bar */}
                <div className="w-full flex items-center gap-2">
                  <span className="text-white text-xs">{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="flex-grow h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                  />
                  <span className="text-white text-sm">{formatTime(duration)}</span>
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Play/Pause */}
                    <button onClick={togglePlay} className="text-white hover:text-gray-300 transition-colors">
                      {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                        </svg>
                      )}
                    </button>

                    {/* Volume */}
                    <div className="flex items-center gap-2 group/vol">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                      </svg>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-0 overflow-hidden group-hover/vol:w-24 transition-all duration-300 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-1 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                      />
                    </div>
                  </div>

                  {/* YouTube Link */}
                  <a
                    href={`https://www.youtube.com/watch?v=${videoID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-xs font-bold border border-white/30 px-2 py-1 rounded hover:bg-yellow hover:text-black transition-colors"
                  >
                    Megtekintés YouTube-on
                  </a>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
