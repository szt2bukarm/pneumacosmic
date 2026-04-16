import { useParams, usePathname } from "next/navigation"

export default function NavLanguage() {
    const { locale } = useParams();
    const pathname = usePathname();

    const getNewPath = (targetLang: string) => {
        if (!pathname) return `/${targetLang.toLowerCase()}`;
        const segments = pathname.split("/");
        segments[1] = targetLang.toLowerCase();
        return segments.join("/");
    };

    return (
        <div className="flex gap-[25px] ">
            {["HU", "EN"].map((lang) => (
                <a
                    key={lang}
                    href={getNewPath(lang)}
                    className={`h-fit leading-[23px] font-hal text-midlight text-lg cursor-pointer ${locale.toString().toUpperCase() === lang ? "opacity-100" : "opacity-50"} transition-opacity duration-150 hover:opacity-25`}
                >
                    {lang}
                </a>
            ))}
        </div>
    )
}