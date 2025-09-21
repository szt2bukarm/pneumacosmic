import { useStore } from "../../useStore";


export default function NavOpener() {
    const { setNavOpen, navOpen } = useStore();


    return (
        <div className="flex gap-[12px] hover:opacity-50 cursor-pointer transition-opacity duration-150" onClick={() => setNavOpen(!navOpen)}>
            <p className="font-hal text-lg text-middark">MENÜ</p>
            <img src="menu-lines.svg" />
        </div>
    )
}