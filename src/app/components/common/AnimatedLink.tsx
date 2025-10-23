import TransitionLink from "@/app/TransitionLink"

interface Props {
    external: boolean,
    size?: string
    text: string
    href: string
}
export default function AnimatedLink({external,size,text, href}: Props) {

    if (!external) {
        return (
            <TransitionLink href={href} className={`group hover:opacity-50 font-hal ${size == "small" && "text-md md:text-lg gap-[15px]"} ${size == "large" && "text-lg md:text-h5 gap-[15px] md:gap-[30px]"} text-midlight flex cursor-pointer transition-opacity duration-150`}>
                <p>→</p>
                <p className="group-hover:translate-x-2 transition-transform duration-150">{text}</p>
            </TransitionLink>
        )
    }

    return (
        <a href={href} className={`group hover:opacity-50 font-hal ${size == "small" && "text-md md:text-lg gap-[15px]"} ${size == "large" && "text-lg md:text-h5 gap-[15px] md:gap-[30px]"} text-midlight flex cursor-pointer transition-opacity duration-150`}>
            <p>→</p>
            <p className="group-hover:translate-x-2 transition-transform duration-150">{text}</p>
        </a>
    )

}