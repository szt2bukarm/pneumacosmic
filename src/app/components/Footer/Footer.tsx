import FooterCards from "./FooterCards";
import FooterLinks from "./FooterLinks";
import FooterText from "./FooterText";

export default function Footer() {
    return (
        <footer className="relative h-fit w-full overflow-hidden">
            <FooterCards />
            <FooterText />
            <FooterLinks />

            <div className="absolute inset-0 translate-y-[800px] w-full pointer-events-none"
                style={{background: "radial-gradient(71.81% 71.81% at 48.87% 91.42%, #F2F2F2 0%, rgba(40, 40, 40, 0.00) 100%)", filter: "blur(50px)"}}>
            </div>

            <div className="absolute bottom-0 right-20 h-[190px] w-[170px] p-[16px] flex items-start justify-start bg-white">
                <img src="/footerbanner.svg" className="w-full h-fit" />
            </div>

        </footer>
    )
}