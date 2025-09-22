export default function FooterLinks() {
    return (
        <div className="relative w-full h-full pb-[180px] hidden xl:flex items-center 2xl:-translate-x-[65px] justify-center">


            <div className="flex flex-col 2xl:flex-row gap-[50px] 2xl:gap-[100px]">
                <img src="/logo.svg" className="w-[130px] h-fit" />
                
                <div className="flex gap-[40px] lg:gap-[100px]">


                    <div className="flex flex-col">
                        <a className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">IMPRESSZUM</a>
                        <a className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">Ludwig Múzeum</a>
                        <a className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">Biennálé Iroda</a>
                        <a className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">Nemzeti Biztos</a>
                        <a className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">szponzorok</a>
                    </div>

                    <div className="flex flex-col">
                        <p className="font-hal text-middark text-lg leading-[125%]">BLOG</p>
                        <p className="font-hal text-middark text-lg leading-[125%]">blog.pneumacosmic.hu</p>
                    </div>

                    <div className="flex flex-col">
                        <a className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">Séták</a>
                        <a className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">Beszélgetések</a>
                        <a className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">Mozi</a>
                    </div>

                    <div className="hidden xl:flex flex-col">
                        <a className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">PRESS KIT</a>
                        <a className="font-hal text-middark text-lg cursor-pointer transition-opacity duration-150 hover:opacity-50 leading-[125%]">DOWNLOAD</a>
                    </div>

                </div>

            </div>

        </div>
    )
}