import { useState } from "react"

export default function NavLanguage() {
    const [language, setLanguage] = useState("EN")

    return (
        <div className="flex gap-[25px]">
            {["HU","EN","IT"].map((lang) => (
                <p key={lang} onClick={() => setLanguage(lang)} className={`h-fit leading-[23px] font-hal text-midlight text-lg cursor-pointer ${language === lang ? "opacity-100" : "opacity-30"} transition-opacity duration-150`}>{lang}</p>
            ))}
        </div>
    )
}