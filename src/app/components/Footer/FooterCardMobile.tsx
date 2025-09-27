interface cardInterface {
    index: number,
    activeIndex: number
    width: string;
    image: string;
    text: string;
    href: string
}

export default function FooterCardMobile({ index,activeIndex, width, image, text, href }: cardInterface) {
    return (
        <div className={`${index === activeIndex ? "opacity-100" : "opacity-50"} transition-all duration-300 ease-in-out flex gap-[48px] items-center justify-end flex-col min-h-[650px] min-w-[400px] relative py-[40px] px-[20px]`} style={{backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center"}}>
            <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-transparent to-black opacity-100"></div>

            <p className={`absolute text-[450px] leading-[450px] ${activeIndex == index ? "bottom-[75px]" : "bottom-0"} left-1/2 -translate-x-1/2 font-gara text-white mix-blend-overlay transition-all duration-300 ease-in-out`}>{index}</p>
            <p className={`${activeIndex == index ? "translate-y-0" : "translate-y-[100px]"} relative z-5 text-center font-gara text-h4 text-middark transition-all duration-300 ease-in-out`}>{text}</p>

            <button className={`${activeIndex === index ? "opacity-100" : "opacity-0"} relative z-5 flex items-center justify-center font-hal w-full h-[60px] rounded-[50px] bg-dark border border-[#7D7D7D] text-middark text-lg transition-all duration-300 ease-in-out`}>Megtekintés →</button>
        </div>
    )
}