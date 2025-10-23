import TransitionLink from "@/app/TransitionLink";
import { usePathname } from "next/navigation";

export default function PageNavHeader() {
    const pathname = usePathname();

    return (
    <div className={`flex w-screen items-center lg:justify-center fixed h-[200px] top-0 left-0 z-[100] pointer-events-none`}>
        <TransitionLink href="/" className="z-[100] pointer-events-auto">
        <img src="logo.webp" className="w-[130px] lg:w-[175px] translate-x-5 sm:translate-x-[40px] lg:translate-x-0 -translate-y-7 xl:-translate-y-4 z-[100]" />
        </TransitionLink>
      </div>
    )
}