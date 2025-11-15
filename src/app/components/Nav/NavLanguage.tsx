import { useState } from "react"

export default function NavLanguage() {
    const [language, setLanguage] = useState("HU")

    return (
        <div className="flex gap-[25px] opacity-50 cursor-not-allowed ">
            {["HU","EN","IT"].map((lang) => (
                <p key={lang} onClick={() => setLanguage(lang)} className={`pointer-events-none h-fit leading-[23px] font-hal text-midlight text-lg cursor-pointer ${language === lang ? "opacity-100" : "opacity-30"} transition-opacity duration-150`}>{lang}</p>
            ))}
        </div>
    )
}