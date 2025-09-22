export default function FooterLinksMobile() {
    return (
        <div className="relative w-full h-full justify-center items-center flex md:hidden">


            <div className="flex items-center justify-center flex-col gap-[50px]">
                <img src="/logo.svg" className="w-[130px] h-fit" />
                

                    <div className="flex items-center justify-center flex-col gap-[40px]">
                        <div className="flex items-center justify-center flex-col">
                            <p className="font-hal text-middark text-lg leading-[125%]">BLOG</p>
                            <p className="font-hal text-middark text-lg leading-[125%]">blog.pneumacosmic.hu</p>
                        </div>

                        <div className="flex items-center justify-center flex-col">
                            <a className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">Séták</a>
                            <a className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">Beszélgetések</a>
                            <a className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">Mozi</a>
                        </div>

                        <div className="flex items-center justify-center flex-col mb-[30px]">
                            <a className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">IMPRESSZUM</a>
                            <a className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">Ludwig Múzeum</a>
                            <a className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">Biennálé Iroda</a>
                            <a className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">Nemzeti Biztos</a>
                            <a className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">szponzorok</a>
                        </div>

                        <div className="flex items-center justify-center gap-[40px]">
                            <a className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">PRESS KIT</a>
                            <a className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">DOWNLOAD</a>
                        </div>

                        <div className="mt-[20px] h-[190px] w-[170px] p-[16px] md:flex items-start justify-start bg-white z-[10]">
                            <img src="/footerbanner.svg" className="w-full h-fit" />
                        </div>
                    </div>
            </div>

        </div>
    )
}