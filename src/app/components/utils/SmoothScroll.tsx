"use client";
import { useStore } from "@/app/useStore";
import { ReactLenis } from "@studio-freight/react-lenis";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
gsap.registerPlugin(CustomEase);

function SmoothScroll({ children }: { children: React.ReactNode }) {
    gsap.registerEase("customEase", CustomEase.create("out", ".9,.6,.2,1"));
    const pathname = usePathname();
    const {loaded} = useStore();
    gsap.config({
      nullTargetWarn: false,
    });

  //   useEffect(() => {
  //     setTimeout(() => {
  //       console.clear();
  //       console.log(`
  //                  @@@@@@@@@@@@@@@@@@                 
  //              @@@@@@@@@@@@@@@@@@@@@@@@@@             
  //            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@           
  //          @@@@@@@@@@@@@@@**@@@@@@@@@@@@@@@@@         
  //        @@@@@@@@@@@@@@%    .      .@@@@@@@@@@@       
  //      @@@@@@@@@@@@@@@@@+  .%@@@%:   #@@@@@@@@@@@     
  //     @@@@@@@@@@@@@@@@@@%  :@@@@@@-  .@@@@@@@@@@@@    
  //    @@@@@@@@@@@@@@@@@@@%  :@@@@@@%  .@@@@@@@@@@@@@   
  //    @@@@@@@@@@@@@@@@@@@%  :@@@@@@%  :@@@@@@@@@@@@@@  
  //   @@@@@@@@@@@@@@@@@@@@%  :@@@@@@  .@@@@@@@@@@@@@@@  
  //   @@@@@@@@@@@@@@@@@@@@%    +@%   %@@@@@@@@@@@@@@@@@ 
  //  @@@@@@@@@@@@@@@@@@@@@%  :@@@@@@@@@@@@@@@@@@@@@@@@@ 
  //  @@@@@@@@@@@@@@@@@@@@@:      %@@@@@@@@@@@@@@@@@@@@@ 
  //  @@@@@@@@@@@@@@@@@*   %  :-   #@@@@@@@@@@@@@@@@@@@@ 
  //  @@@@@@@@@@@@@@@%   @@%  :@@%=@@@@@@@@@@@@@@@@@@@@@ 
  //   @@@@@@@@@@@@@%   %@+	-#@@@@@@@@@@@@@@@@@@@@@@@ 
  //   @@@@@@@@@@@@@-   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
  //    @@@@@@@@@@@@-   %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
  //    @@@@@@@@@@@@=   #@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   
  //     @@@@@@@@@@@#    #@@@@@@@@%=@@@@@@@@@@@@@@@@@    
  //      @@@@@@@@@@@%.	-*#%%=  +@@@@@@@@@@@@@@@@     
  //        @@@@@@@@@@@@         +@@@@@@@@@@@@@@@@       
  //          @@@@@@@@@@@@@%%%@@@@@@@@@@@@@@@@@@         
  //            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@           
  //              @@@@@@@@@@@@@@@@@@@@@@@@@@             
  //                  @@@@@@@@@@@@@@@@@@
  // `)
  //     }, 1000);
  //   },[loaded,pathname])

    // if (!loaded) return null;

  return (
    <ReactLenis className="current-page" root options={{ lerp: 0.1, duration: 1 }}>
      <div key={loaded ? 1 : 0} className="w-full h-full" style={{ opacity: loaded ? 1 : 0 }}>
      {children}
      </div>
    </ReactLenis>
  );
}

export default SmoothScroll;