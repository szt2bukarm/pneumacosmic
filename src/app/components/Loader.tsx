"use client";
import { use, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './loader.module.scss';
import {useStore} from '@/app/useStore';
import { useEnvironment, useGLTF } from '@react-three/drei';
import { useGSAP } from '@gsap/react';
import Exhibition2Render from './Exhibition-2/Exhibition2Render';

const assets = [
    "images/bennszorult.webp",
    "images/paroslab.webp",
    "images/saroslab.webp",
    "images/lelegzofal.webp",
    "images/fal.webp",
    "images/akusztikus.webp",
    "images/exhibition-3/walk/1walk.webp",
    "images/exhibition-3/walk/2walk.webp",
    "images/exhibition-3/walk/3walk.webp",
    "images/exhibition-3/walk/4walk.webp",
    "images/exhibition-3/walk/5walk.webp",
    "images/exhibition-3/walk/6walk.webp",
    "images/exhibition-3/walk/7walk.webp",
    "images/exhibition-3/walk/8walk.webp",
    "images/exhibition-3/walk/9walk.webp",
    "images/exhibition-3/walk/10walk.webp",
    "images/exhibition-3/walk/11walk.webp",
    "images/exhibition-3/walk/12walk.webp",
    "images/exhibition-3/walk/13walk.webp",
    "images/exhibition-3/walk/14walk.webp",
    "images/exhibition-3/walk/15walk.webp",
    "images/exhibition-3/walk/16walk.webp",
    "images/exhibition-3/walk/17walk.webp",
    "images/exhibition-3/walk/18walk.webp",
    "images/exhibition-3/walk/19walk.webp",
    "images/exhibition-3/walk/20walk.webp",
    "images/exhibition-3/walk/21walk.webp",
    "images/exhibition-3/walk/22walk.webp",
    "images/exhibition-3/walk/23walk.webp",
    "images/exhibition-3/walk/24walk.webp",
    "images/exhibition-3/walk/25walk.webp",
    "images/exhibition-3/walk/26walk.webp",
    "images/exhibition-3/walk/27walk.webp",
    "images/exhibition-3/walk/28walk.webp",
    "images/exhibition-3/walk/29walk.webp",
    "images/exhibition-3/walk/30walk.webp",
    "images/exhibition-3/walk/31walk.webp",
    "images/exhibition-3/walk/32walk.webp",
    "images/exhibition-3/walk/33walk.webp",
    "images/exhibition-3/walk/34walk.webp",
    "images/exhibition-3/walk/35walk.webp",
    "images/exhibition-3/walk/36walk.webp",
    "images/exhibition-3/walk/37walk.webp",
    "images/exhibition-3/walk/38walk.webp",
    "images/exhibition-3/walk/39walk.webp",
    "images/exhibition-3/walk/40walk.webp",
    "images/exhibition-3/walk/41walk.webp",
    "images/exhibition-3/walk/42walk.webp",
    "images/exhibition-3/walk/43walk.webp",
    "images/exhibition-3/walk/44walk.webp",
    "images/exhibition-3/walk/45walk.webp",
    "images/exhibition-3/walk/46walk.webp",
    "images/exhibition-3/walk/47walk.webp",
    "images/exhibition-3/walk/48walk.webp",
    "images/exhibition-3/walk/49walk.webp",
    "images/exhibition-3/walk/50walk.webp",
    "images/exhibition-3/walk/51walk.webp",
    "images/exhibition-3/walk/52walk.webp",
    "images/exhibition-3/walk/53walk.webp",
    "images/exhibition-3/walk/54walk.webp",
    "images/exhibition-3/walk/55walk.webp",
    "images/exhibition-3/walk/56walk.webp",
    "images/exhibition-3/walk/57walk.webp",
    "images/exhibition-3/walk/58walk.webp",
    "images/exhibition-3/walk/59walk.webp",
    "images/exhibition-3/walk/60walk.webp",
    "images/exhibition-3/walk/61walk.webp",
    "images/exhibition-3/walk/62walk.webp",
    "images/exhibition-3/walk/63walk.webp",
    "images/exhibition-3/walk/64walk.webp",
];



export default function Loader() {
    const { setLoaded, loaded } = useStore();
    const [progress, setProgress] = useState(0);
    const progressRef = useRef(0);
    const [hideLoader, setHideLoader] = useState(false);
    const [domReady, setDomReady] = useState(false);
    const {setIsMobile} = useStore();


  
    useEffect(() => {
        useGLTF.preload('3d.glb');
        useEnvironment.preload({ files: 'black.exr' })
        const video = document.createElement('video');
        video.src = 'video.mp4';
        video.load();    
  
      const onDOMContentLoaded = () => setDomReady(true);
      if (document.readyState === "complete" || document.readyState === "interactive") {
        setDomReady(true);
      } else {
        window.addEventListener("DOMContentLoaded", onDOMContentLoaded);
      }
  
      return () => {
        window.removeEventListener("DOMContentLoaded", onDOMContentLoaded);
      };
    }, []);
  
    const preloadAssets = (assets) => {
        return new Promise((resolve) => {
          const totalAssets = assets.length;
          let loadedAssets = 0;
      
          const checkAllLoaded = () => {
            if (loadedAssets >= totalAssets) resolve();
          };
      
          assets.forEach((asset) => {
            const img = new Image();
            img.onload = img.onerror = () => {
              loadedAssets++;
              const prog = (loadedAssets / totalAssets) * 100;
              setProgress(prog);
              progressRef.current = prog;
              checkAllLoaded();
            };
            img.src = asset;
          });
        });
      };
      
      
    useEffect(() => {
      const loadAllAssets = async () => {
        try {
          await Promise.all([
            preloadAssets(assets),
          ]);
          setLoaded(true);
        } catch (error) {
          console.error("Asset preload error:", error);
        }
      };
  
      loadAllAssets();
    }, []);

  
    useEffect(() => {
      if (loaded && domReady) {
            setHideLoader(true);
        
      }
    }, [loaded, domReady]);
  
    if (hideLoader) return null;
  
    return (
      <div className='fixed top-0 left-0 w-screen h-screen bg-black z-[9999] flex items-center justify-center'>
            <p className='text-white text-h1'>loading</p>
            <div className='w-[1px] h-[1px] opacity-0'>
            <Exhibition2Render />
            </div>
      </div>
    );
  }