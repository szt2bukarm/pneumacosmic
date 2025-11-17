interface Props {
    index: number,
    setIndex: (index: number) => void
}

export default function ImprintCarousel({index,setIndex}: Props ) {
    return (
        <div className="absolute right-0 top-[50%] translate-y-[-50%] flex flex-col gap-[5px] justify-end items-end z-[10]">
            {Array.from({ length: 6 }).map((_, i) => (
                <div onClick={() => setIndex(i)} key={i} className={`${index === i ? "w-[94px]" : "w-[50px]"} h-[94px]  ${index === i ? "opacity-100" : "opacity-30"} transition-all duration-300 ease-in-out`}>
                    <img src={`/hero-carousel/${i}.webp`} className="w-full h-full object-cover" />
                </div>
            ))}
        </div>
    )
}