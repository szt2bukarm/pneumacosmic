"use client"
import { useParams } from "next/navigation"

export default function ImprintText() {
    const {locale} = useParams();
    return (
        <div data-gsap="imprint-text" className="relative w-full h-full flex flex-col z-[21] px-[20px] md:pl-[100px] mt-[-70vh] pb-[100px]">

            <img alt="Pneuma Cosmic Logo" src="/logo.webp" className="w-[80%] md:w-[410px] mb-[40px]" />

            <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[30px]">{locale == "hu" ? "PROJEKT IMPRESSZUM" : "PROJECT IMPRINT"}</p>
            
            <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[80px]">
            {locale == "hu" ? "Koronczi Endre kiállítása" : "Exhibition of Endre Koronczi"}
            <br></br>{locale == "hu" && '61. Nemzetközi Képzőművészeti Kiállítás – La Biennale di Venezia'}{locale == "en" && '61st International Art Exhibition – La Biennale di Venezia'}
            <br></br>{locale == "hu" && 'Magyar Pavilon'}{locale == "en" && 'Hungarian Pavilion'}
            <br></br>{locale == "hu" && 'Velence, Giardini'}{locale == "en" && 'Venice, Giardini'}
            <br></br>{locale == "hu" && '2026. május 9. – november 22.'}{locale == "en" && '9 May – 22 November 2026'}
            <br></br><br></br>{locale == "hu" && 'Nemzeti biztos: Fabényi Julia'}{locale == "en" && 'National Commissioner: Julia Fabényi'}
            <br></br>{locale == "hu" && 'Kurátor: Cserhalmi Luca'}{locale == "en" && 'Curator: Luca Cserhalmi'}
            </p>

            <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[15px]">
            <span className="opacity-75 font-garaitalic">{locale == "hu" ? "Szervező:" : "Organiser:"}</span><br></br>
            {locale == "hu" && 'Ludwig Múzeum – Kortárs Művészeti Múzeum,'}{locale == "en" && 'Ludwig Museum – Museum of Contemporary Art,'}<br></br>
            Budapest, <a className="underline" target="_blank" href="https://www.ludwigmuseum.hu/">https://www.ludwigmuseum.hu/</a>
            </p>

            <a href="https://www.ludwigmuseum.hu/velencei-biennale" target="_blank" className="w-fit h-fit">
            <img alt="Ludwig Museum logo" src="/ludwig-transparent.webp" className="w-[70%] md:w-[360px] mb-[50px]" />
            </a>

            <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[30px]">
            <span className="opacity-75 font-garaitalic">{locale == "hu" ? "Projektkoordináció:" : "Project coordination:"}</span><br></br>
            {locale == "hu" && 'Velencei Biennále Iroda: Boros Géza, Bálványos Anna, Lakó Zsigmond'}{locale == "en" && 'Venice Biennale Office: Géza Boros, Anna Bálványos, Zsigmond Lakó'}
            </p>
            <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[30px]">
            <span className="opacity-75 font-garaitalic">{locale == "hu" ? "Pályázati zsűri:" : "Competition jury:"}</span><br></br>
            {locale == "hu" && 'Boros Géza, Fabényi Julia, Kopeczky Róna, Sturcz János, Szipőcs Krisztina, Vizi Katalin'}{locale == "en" && 'Géza Boros, Julia Fabényi, Róna Kopeczky, János Sturcz, Krisztina Szipőcs, Katalin Vizi'}
            </p>
            <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[30px]">
            <span className="opacity-75 font-garaitalic">{locale == "hu" ? "Kommunikáció:" : "Communication:"}</span><br></br>
            {locale == "hu" && 'Fehér Zsuzsanna, Rothman Gabriella, Szabó Zsófia, Somogyvári Ágnes'}{locale == "en" && 'Zsuzsanna Fehér, Gabriella Rothman, Zsófia Szabó, Ágnes Somogyvári'}
            </p>
            <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[30px]">
            <span className="opacity-75 font-garaitalic">{locale == "hu" ? "Grafikai tervezés:" : "Graphic design:"}</span><br></br>
            {locale == "hu" && 'Visnyai Zoltán'}{locale == "en" && 'Zoltán Visnyai'} <a className="underline" target="_blank" href="https://www.instagram.com/visnya.i/">https://www.instagram.com/visnya.i/</a>
            </p>
            <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[30px]">
            <span className="opacity-75 font-garaitalic">{locale == "hu" ? "Angol fordítás:" : "English translation:"}</span><br></br>
            {locale == "hu" && 'Sípos Dániel'}{locale == "en" && 'Dániel Sípos'}
            </p>
            <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[30px]">
            <span className="opacity-75 font-garaitalic">{locale == "hu" ? "Olasz fordítás:" : "Italian translation:"}</span><br></br>
            {locale == "hu" && 'Lakó Zsigmond'}{locale == "en" && 'Zsigmond Lakó'}
            </p>
            <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[30px]">
            <span className="opacity-75 font-garaitalic">{locale == "hu" ? "A katalógus szerzői:" : "Authors of the catalogue:"}</span><br></br>
            {locale == "hu" && 'Balogh Máté, Juraj Čarný, Cserhalmi Luca'}{locale == "en" && 'Máté Balogh, Juraj Čarný, Luca Cserhalmi'}
            </p>
            <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[30px]">
            <span className="opacity-75 font-garaitalic">{locale == "hu" ? "Olvasószerkesztő:" : "Copy editing:"}</span><br></br>
            {locale == "hu" && 'Kőrösi Zsuzsanna'}{locale == "en" && 'Zsuzsanna Kőrösi'}
            </p>
            <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[30px]">
            <span className="opacity-75 font-garaitalic">{locale == "hu" ? "Műszaki vezető:" : "Head of technical team:"}</span><br></br>
            {locale == "hu" && 'Bodor Béla'}{locale == "en" && 'Béla Bodor'}
            </p>
            <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[30px]">
            <span className="opacity-75 font-garaitalic">{locale == "hu" ? "Műszaki munkatársak:" : "Technical team:"}</span><br></br>
            {locale == "hu" && 'Bíró Márton, Molnár László, Porubszki Ernő'}{locale == "en" && 'Márton Bíró, László Molnár, Ernő Porubszki '}
            </p>
            <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[30px]">
            <span className="opacity-75 font-garaitalic">{locale == "hu" ? "A kiállítás akusztikus eleme:" : "Acoustic element of the exhibition:"}</span><br></br>
            {locale == "hu" && 'Balogh Máté zeneszerző munkája'}{locale == "en" && 'Máté Balogh, composer'} <a className="underline" target="_blank" href="https://baloghmate.com/">https://baloghmate.com/</a>
            </p>
            <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[30px]">
            <span className="opacity-75 font-garaitalic">{locale == "hu" ? "A felvételt készítette:" : "Sound recording by:"}</span><br></br>
            {locale == "hu" && 'Kádár Mihály, Soundwork'}{locale == "en" && 'Mihály Kádár, Soundwork'}
            </p>
            <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[30px]">
            <span className="opacity-75 font-garaitalic">{locale == "hu" ? "A Kozmikus lehelet című videómű közreműködői:" : "Contributors of the video Cosmic Breath:"}</span><br></br>
            {locale == "hu" && 'Erhardt Miklós (angol szinkron), Klöpfler-Topor Tibor (hangmérnök)'}{locale == "en" && 'Miklós Erhardt (English dubbing), Tibor Klöpfler-Topor (sound engineer)'}
            </p>
            <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[30px]">
            <span className="opacity-75 font-garaitalic">{locale == "hu" ? "Pneuma Cosmic weboldal:" : "Pneuma Cosmic website:"}</span><br></br>
            {locale == "hu" && 'Bukvity Ármin és Bukvity Lorisz'}{locale == "en" && 'Ármin Bukvity, Lorisz Bukvity'}
            </p>
            <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[30px]">
            <span className="opacity-75 font-garaitalic">{locale == "hu" ? "Web tartalomszolgáltatás:" : "Content editor::"}</span><br></br>
            {locale == "hu" && 'Gyöngy Dániel'}{locale == "en" && 'Dániel Gyöngy'}
            </p>
            {/* <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[30px]">
            <span className="opacity-75 font-garaitalic">Reklámtáska kivitelezése:</span><br></br>
            §Mikka Design
            </p> */}
            <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[30px]">
            <span className="opacity-75 font-garaitalic">{locale == "hu" ? "Pavilon felügyelet:" : "Pavilion attendants:"}</span><br></br>
            {locale == "hu" && 'Gabriella Vidoni, Marco Vidoni'}{locale == "en" && 'Gabriella Vidoni, Marco Vidoni'}
            </p>

            <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[30px]">
            <span className="opacity-75 font-garaitalic">{locale == "hu" ? "A Páros lábbal a föld fölött installációhoz tartozó üvegtárgy kivitelezője:" : "Glass object for the installation Both Feet Above the Ground produced by:"}</span><br></br>
            {locale == "hu" && 'a Parádsasvári Üvegmanufaktúra'}{locale == "en" && 'Parádsasvár Glass Manufactory'}
            </p>

            <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[30px]">
            <span className="opacity-75 font-garaitalic">{locale == "hu" ? "Operatőr:" : "Camera operators:"}</span><br></br>
            {locale == "hu" && 'Besenyi Dávid, Bognár Benedek, Ganzer Balázs, Szántó Olivér'}{locale == "en" && 'Dávid Besenyi, Benedek Bognár, Balázs Ganzer, Olivér Szántó'}
            </p>

            <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[30px]">
            <span className="opacity-75 font-garaitalic">{locale == "hu" ? "A Végtelen türelem (Lélegző fal) installáció technikusa:" : "Technician of the installation Neverending Patience (Breathing Wall):"}</span><br></br>
            {locale == "hu" && 'Budai Géza'}{locale == "en" && 'Géza Budai'}
            </p>

            <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[30px]">
            <span className="opacity-75 font-garaitalic">{locale == "hu" ? "Instagram:" : "Instagram:"}</span><br></br>
            {locale == "hu" && 'Medvigy Édua, Rékai Márk'}{locale == "en" && 'Édua Medvigy, Márk Rékai'}
            </p>

            <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[30px]">
            <span className="opacity-75 font-garaitalic">{locale == "hu" ? "Grafikai kivitelezés:" : "Graphic production:"}</span><br></br>
            {locale == "hu" && 'Dessin Design Agency'}{locale == "en" && 'Dessin Design Agency'}
            </p>

            <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[30px]">
            <span className="opacity-75 font-garaitalic">{locale == "hu" ? "A reklámtáska tervezője:" : "Promotional tote bag designed by:"}</span><br></br>
            {locale == "hu" && 'Gspann Zsuzsa'}{locale == "en" && 'Zsuzsa Gspann'}
            </p>

            <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[30px]">
            <span className="opacity-75 font-garaitalic">{locale == "hu" ? "Kivitelezője:" : "Produced by:"}</span><br></br>
            {locale == "hu" && 'Mikka Design'}{locale == "en" && 'Mikka Design'}
            </p>

            <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[30px]">
            <span className="opacity-75 font-garaitalic">{locale == "hu" ? "Külön Köszönet:" : "Special thanks to:"}</span><br></br>
            {locale == "hu" && 'Albrecht Zsófia'}{locale == "en" && 'Zsófia Albrecht'}
            <br></br>{locale == "hu" && 'Árvai István'}{locale == "en" && 'István Árvai'}
            <br></br>{locale == "hu" && 'Bicskei Éva'}{locale == "en" && 'Éva Bicskei'}
            <br></br>{locale == "hu" && 'Csatlós Judit'}{locale == "en" && 'Judit Csatlós'}
            <br></br>{locale == "hu" && 'Csontó András'}{locale == "en" && 'András Csontó'}
            <br></br>{locale == "hu" && 'Csontó Lajos'}{locale == "en" && 'Lajos Csontó'}
            <br></br>{locale == "hu" && 'Erhardt Miklós'}{locale == "en" && 'Miklós Erhardt'}
            <br></br>{locale == "hu" && 'Godot Kortárs Művészeti Intézet'}{locale == "en" && 'Godot Institute of Contemporary Art'}
            <br></br>{locale == "hu" && 'Klöpfler-Topor Tibor'}{locale == "en" && 'Tibor Klöpfler-Topor'}
            <br></br>{locale == "hu" && 'Kellermayer Rozina'}{locale == "en" && 'Rozina Kellermayer'}
            <br></br>{locale == "hu" && 'Koronczi Johanna'}{locale == "en" && 'Johanna Koronczi'}
            <br></br>{locale == "hu" && 'dr. Pajtókné dr. Tari Ilona'}{locale == "en" && 'dr. Mrs. Ilona Pajtók, née Tari'}
            <br></br>{locale == "hu" && 'Sóváradi Valéria'}{locale == "en" && 'Valéria Sóváradi'}
            <br></br>{locale == "hu" && 'Török Róbert'}{locale == "en" && 'Róbert Török'}
            <br></br>{locale == "hu" && 'Varga Mihály'}{locale == "en" && 'Mihály Varga'}
            </p>



            <p id="tamogatok" className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[25px]">
            <span className="opacity-75 font-garaitalic">{locale == "hu" ? "Főtámogató:" : "Main sponsor:"}</span><br></br>
            {locale == "hu" && 'Kulturális és Innovációs Minisztérium'}{locale == "en" && 'Ministry of Culture and Innovation'}
            </p>
            <a href="https://kormany.hu/kormanyzat/kulturalis-es-innovacios-miniszterium" target="_blank" className="w-fit h-fit">
            <img alt="KIM logo" src="/kim-transparent.webp" className="w-[70%] md:w-[305px] mb-[60px]" />
            </a>

            <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[25px]">
            <span className="opacity-75 font-garaitalic">{locale == "hu" ? "Támogatók:" : "Sponsors:"}</span><br></br>
            {locale == "hu" && 'Eszterházy Károly Katolikus Egyetem, Művészeti Kar'}{locale == "en" && 'Eszterházy Károly Catholic University, Faculty of Arts'}
            <br></br> <a href="https://uni-eszterhazy.hu/mk" target="_blank" className="underline">https://uni-eszterhazy.hu/mk</a>
            </p>
            <a href="https://uni-eszterhazy.hu/mk" target="_blank" className="w-fit h-fit">
            <img alt="EKKE-MK logo" src="/ekke-transparent.webp" className="w-[70%] md:w-[480px] mb-[60px]" />
            </a>
            
            <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[25px]">
            K-ARTS
            </p>
            <a href="https://www.karts.hu/" target="_blank" className="w-fit h-fit">
            <img alt="K-ARTS logo" src="/karts-transparent.webp" className="w-[70%] md:w-[360px] mb-[60px]" />
            </a>

            <p className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[25px]">
            {locale == "hu" && 'KÉSZ Csoport'}{locale == "en" && 'KÉSZ Group'}
            </p>
            <a href="https://www.keszgroup.com/" target="_blank" className="w-fit h-fit">
            <img alt="KESZ logo" src="/kesz-transparent.webp" className="w-[70%] md:w-[360px] mb-[60px]" />
            </a>

            <a href="https://dreher.hu/" target="_blank" className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark mb-[25px] hover:opacity-75 transition-all duration-150">
            Dreher
            </a>
            <a href="https://dreher.hu/" target="_blank" className="w-fit h-fit">
            {/* <img alt="Dreher logo" src="/dreher-transparent.webp" className="w-[70%] md:w-[260px] mb-[80px]" /> */}
            </a>

            <a href="https://pneumacosmic.hu/" target="_blank" className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark underline">pneumacosmic.hu/</a>
            <a href="https://www.instagram.com/pneumacosmic" target="_blank" className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark underline">instagram.com/pneumacosmic</a>
            <a href="http://koronczi.hu/" target="_blank" className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark underline">www.koronczi.hu</a>
            <a href="https://www.ludwigmuseum.hu/" target="_blank" className="font-gara text-md leading-[18px] sm:text-lg sm:leading-[23px] text-middark underline">ludwigmuseum.hu/</a>


        </div>
    )
}