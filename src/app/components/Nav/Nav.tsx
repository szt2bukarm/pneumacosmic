"use client"
import NavLanguage from "./NavLanguage";
import NavOpener from "./NavOpener";
import NavSound from "./NavSound";

export default function Nav() {

    return (
        <div style={{viewTransitionName: "nav"}} className="fixed w-screen top-0 left-0 z-50 h-[80px] pt-[50px] xl:pt-[80px] px-[20px] sm:px-[40px] xl:px-[110px] flex justify-between items-center">

            <div className="hidden sm:flex items-end gap-[40px]">
                <NavSound />
                <NavLanguage />
            </div>

            <NavOpener />

        </div>
    )
}