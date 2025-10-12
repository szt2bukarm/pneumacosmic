import TransitionLink from "@/app/TransitionLink";
import { usePathname } from "next/navigation";

export default function PageNavHeader() {
    const pathname = usePathname();

    return (
    <div className={`flex w-screen items-center lg:justify-center fixed h-[200px] bg-gradient-to-b ${pathname === "/exhibition-4" ? "from-[#FFFFFF60]" : "from-black"} to-transparent top-0 left-0 z-[49]`}>
        <TransitionLink href="/" className="">
        <img src="logo.svg" className="w-[130px] lg:w-[175px] translate-x-5 sm:translate-x-[40px] lg:translate-x-0 -translate-y-7 xl:-translate-y-4" />
        </TransitionLink>
      </div>
    )
}