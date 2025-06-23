import { useState } from "react";
import profileIcon1 from "../assets/icons/profileIcon1.png";
import profileIcon2 from "../assets/icons/profileIcon2.png";
import tugasIcon1 from "../assets/icons/tugasIcon1.png";
import tugasIcon2 from "../assets/icons/tugasIcon2.png";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false);

const isActive = (path: string) => {
  if (path === "/") {
    return location.pathname === "/"; 
  }
  return location.pathname.startsWith(path);
};

  const isTugasFokusActive = 
    isActive("/todo") || 
    isActive("/pomodoro");

  // const isLogin = (user: string) => {
  //   if(!user == null) return true
  // }

  const linkClass = (path: string) => {
    return isActive(path)
      ? "text-yellow-400 hover:text-yellow-300 font-semibold"
      : "text-white hover:text-gray-300 font-semibold";
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full p-4 z-50 bg-transparent bg-opacity-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-bold z-50">
            <Link to="/" className="hover:text-gray-300">
              <p>Aca Connect</p>
              <p className="text-xs">Academic & connections</p>
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <Menu className="w-6 h-6 text-current" />
              ) : (
                <X className="w-6 h-6 text-current" />
              )}
            </button>
          </div>

          <div
            className={`md:flex flex-grow items-center justify-end ${
              isMenuOpen
                ? "block absolute top-0 left-0 w-full h-screen bg-black bg-opacity-90 flex-col py-20"
                : "hidden"
            } md:relative md:bg-transparent md:h-auto md:py-0`}
          >
            <ul
              className={`flex ${isMenuOpen ? "flex-col items-center space-y-8 text-xl" : "flex-row space-x-6"} md:flex-row md:space-x-6 md:space-y-0`}
            >
              <li>
                <Link
                  to="/"
                  className={linkClass("/")}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/friend"
                  className={linkClass("/find")} 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Find Friends
                </Link>
              </li>
              <li>
                <Link
                  to="/grade"
                  className={linkClass("/grade")}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Grade
                </Link>
              </li>
              <li>
                <Link
                  to="/chat"
                  className={linkClass("/chat")}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Chat
                </Link>
              </li>
              <li className="group relative flex flex-row justify-center items-center">
                <button
                  onClick={() => setIsTaskOpen(!isTaskOpen)}
                  className={`${
                    isTugasFokusActive 
                      ? linkClass("/todo")
                      : linkClass("/yanglaen")
                  } flex items-center focus:outline-none`} 
                >
                  Tugas & Fokus
                  <img
                    src={isTugasFokusActive ? tugasIcon2 : tugasIcon1}
                    className="w-4 h-full ml-2 group-hover:opacity-70 transition-opacity duration-200"
                    alt="Tugas & Fokus Icon"
                  />
                </button>

                {isTaskOpen && (
                  <ul className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-40 bg-white rounded-2xl shadow-lg z-10">
                    <li className="px-4 py-2 hover:bg-primary cursor-pointer rounded-2xl">
                      <Link to="/todo" onClick={() => { setIsMenuOpen(false); setIsTaskOpen(false); }}>
                        To-do List
                      </Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-primary cursor-pointer rounded-2xl">
                      <Link to="/pomodoro" onClick={() => { setIsMenuOpen(false); setIsTaskOpen(false); }}>
                        Pomodoro
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>

            <div className={`${isMenuOpen ? "mt-8" : "md:ml-10 mt-0"}`}>
              <Link
                to="/profile"
                className={`${linkClass("/profile")} group flex flex-col items-center gap-1`}
                onClick={() => setIsMenuOpen(false)}
              >
                <img
                  src={isActive("/profile") ? profileIcon2 : profileIcon1}
                  alt="Profile"
                  className="w-6 group-hover:opacity-70 transition-opacity duration-200"
                />
                <p className="text-xs">
                  {/* {isLogin} ? user.name : Login */}
                  Baskara
                </p>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;