import logoSec from "../assets/logoSec.png";
import logosep from "../assets/logosep.png";

export default function Header() {
  return (
    <div className="h-17 w-full bg-blue-700 flex items-center justify-between p-2">
      <img src={logoSec} className="w-auto h-full rounded-3xl" alt="LogoSec" />
      <p className="text-white font-bold text-3xl">Escuela Secundaria Estatal Lic. Adelor D. Sala</p>
      <img src={logosep} className="w-auto h-full" alt="LogoSep" />
    </div>
  );
}
