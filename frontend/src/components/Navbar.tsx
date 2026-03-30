import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-saam.png';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-[#00bbff] text-white shadow-md sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-[70px] items-center">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <img src={logo} alt="SAAM Logo" className="h-10 w-auto brightness-0 invert" style={{ filter: 'brightness(0) invert(1)' }} />
          </div>

          {/* Links e Menus (Baseado no Exemplo) */}
          <div className="hidden lg:flex items-center gap-6 font-semibold text-sm">

          </div>

          {/* Direita - WhatsApp, Sair e Tema */}
          <div className="flex items-center gap-4">

            {/* <a href="#" className="hidden sm:flex items-center gap-2 font-bold hover:scale-105 transition-transform">
              <div className="bg-white p-1 rounded-full">
                <svg className="w-6 h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 21.031A9.03 9.03 0 1 1 21.03 12a9.04 9.04 0 0 1-8.999 9.031Zm0-16.57a7.54 7.54 0 1 0 7.54 7.54 7.55 7.55 0 0 0-7.54-7.54Zm4.173 10.87c-.209-.105-1.238-.61-1.429-.68-.19-.071-.33-.105-.468.105-.138.21-.54 .68-.662.82-.122.139-.244.157-.453.053-.21-.105-.884-.326-1.684-1.042-.622-.557-1.042-1.246-1.164-1.455-.122-.21-.013-.323.092-.428.094-.095.21-.245.315-.367.106-.123.14-.21.21-.35.071-.141.035-.264-.017-.369-.053-.105-.468-1.129-.641-1.545-.169-.406-.341-.351-.468-.358-.122-.006-.263-.006-.402-.006a.77.77 0 0 0-.555.258c-.191.21-7.3 7.6 7.3 11.236.438.455 1.02.693 1.636.68.784-.017 2.05-.838 2.338-1.648.29-.81.29-1.505.203-1.648-.087-.142-.315-.228-.524-.333Z" /></svg>
              </div>
              WhatsApp
            </a> */}

            <a href='/'
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-md font-semibold text-sm transition-colors flex items-center gap-1"
              title="Sair do Sistema"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
              Sair
            </a>

          </div>
        </div>
      </div>
    </nav>
  );
}
