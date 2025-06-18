import { Link, useLocation } from "react-router";
import profileIcon1 from '../assets/icons/profileIcon1.png';
import profileIcon2 from '../assets/icons/profileIcon2.png';
import tugasIcon1 from '../assets/icons/tugasIcon1.png'
import tugasIcon2 from '../assets/icons/tugasIcon2.png'

const Navbar = () => {
  const location = useLocation();
  
  //cek user ada dimana
  const isActive = (path: any) => {
    return location.pathname === path;
  };

  const linkClass = (path: any) => {
    return isActive(path) 
      ? "text-yellow-400 hover:text-yellow-300 font-semibold"
      : "text-white hover:text-gray-300 font-semibold";
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full p-4 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-bold">
            <div>
              <Link to="/" className="hover:text-gray-300">
                <p>
                  Aca Connect
                </p>
                <p className="text-xs">
                  Academic & connections
                </p>
              </Link>
            </div>
          </div>
          <div className="px-6 py-3 flex items-center justify-between">
            
            <ul className="flex items-center space-x-6">
              <li>
                <Link to="/" className={linkClass("/")}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/find" className={linkClass("/find")}>
                  Find Friends
                </Link>
              </li>
              <li>
                <Link to="/grade" className={linkClass("/grade")}>
                  Grade
                </Link>
              </li>
              <li>
                <Link to="/chat" className={linkClass("/chat")}>
                  Chat
                </Link>
              </li>
              <li className="group flex flex-row justify-center items-center bg-center">
              <Link to="/pomodoro" className={`${linkClass("/pomodoro")} flex items-center`}>
                Tugas & Fokus
                <img 
                  src={isActive("/pomodoro") ? tugasIcon2 : tugasIcon1} 
                  className="w-4 h-full ml-2 group-hover:opacity-70 transition-opacity duration-200"
                />
              </Link>
            </li>
            </ul>

            <div className="ml-10">
              <Link 
                to="/profile" 
                className={`${linkClass('/profile')} group flex flex-col items-center gap-1`}
              >
                <img 
                  src={isActive("/profile") ? profileIcon2 : profileIcon1} 
                  alt="Profile" 
                  className="w-6 group-hover:opacity-70 transition-opacity duration-200"
                />
                <p className="text-xs">Baskara</p>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;