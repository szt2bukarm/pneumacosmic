import TransitionLink from "@/app/TransitionLink";

interface cardInterface {
    index: number,
    width: string;
    image: string;
    text: string;
    href: string
}

export default function FooterCardDesktop({ index, width, image, text, href }: cardInterface) {
    return (
        <TransitionLink href={href} className={`cursor-pointer ${width === "full" ? "!flex-1" : "!flex-[0.5]"} relative flex-[0.5] transition-all duration-500 ease-in-out min-h-full
                        hover:!flex-[0_0_800px] brightness-100 group-hover:brightness-50 
                        hover:!brightness-100 group/card overflow-hidden`}>
          <img src={image} className="w-full h-full object-cover" />
  
          {/* gradient overlay (only this card’s hover) */}
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b 
                          from-[#0000004b] to-black z-2 opacity-0 
                          group-hover/card:opacity-100 transition-opacity duration-300 ease-in-out"></div>
  
          {/* text content */}
          <div className="opacity-0 -translate-x-[400px] group-hover/card:translate-x-0 pointer-events-none
                          group-hover/card:opacity-100 transition-all duration-500 ease-in-out 
                          px-[40px] py-[30px] absolute top-0 left-0 min-w-[801px] min-h-[540px] 
                          text-middark flex flex-col">
            <p className="font-gara text-h1 mb-auto">{index}</p>
            <p className="font-gara text-h1 leading-[90%] mb-[10px]">{text}</p>
            <p className="font-hal text-h5">megtekintés →</p>
          </div>
        </TransitionLink>
    )
}