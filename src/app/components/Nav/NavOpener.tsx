import { useStore } from "../../useStore";


export default function NavOpener() {
    const { setNavOpen, navOpen } = useStore();


    return (
        <div data-gsap="nav-opener" className="ml-auto flex items-center justify-center gap-[12px] hover:opacity-50 cursor-pointer transition-opacity duration-150" onClick={() => setNavOpen(!navOpen)}>
            <p className="hidden sm:block font-hal text-lg leading-[18px] translate-y-[0.5px] text-middark">MENÜ</p>
            <img src="menu-lines.svg" />
        </div>
    )
}