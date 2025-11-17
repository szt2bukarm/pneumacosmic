import TransitionLink from "@/app/TransitionLink";
import Link from "next/link";
import { useParams } from "next/navigation"
import { useState } from "react"

export default function NavLanguage() {
    const {locale} = useParams();

    // const [language, setLanguage] = useState(locale.toString().toUpperCase())

    return (
        <div className="flex gap-[25px] opacity-50 cursor-not-allowed">
            {["HU","EN","IT"].map((lang) => (
                <a key={lang} href={`/${lang.toLowerCase()}`} className={`pointer-events-none h-fit leading-[23px] font-hal text-midlight text-lg cursor-pointer ${locale.toString().toUpperCase() === lang ? "opacity-100" : "opacity-30"} transition-opacity duration-150`}>{lang}</a>
            ))}
        </div>
    )
}