import { useState, useEffect } from "react";
import profileIcon1 from "../assets/icons/profileIcon1.png";
import profileIcon2 from "../assets/icons/profileIcon2.png";
import tugasIcon1 from "../assets/icons/tugasIcon1.png";
import tugasIcon2 from "../assets/icons/tugasIcon2.png";
import { Link, useLocation, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import type { UserType as User } from "../types/user";
import useGetUser from "../hooks/useGetUser";

interface NavbarProps {
  user: User | null; //Nullable
}

const Navbar = ({ user }: NavbarProps) => {
  const location = useLocation();
  const { logout } = useGetUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate()

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 10) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

const handleLogout = () => {
  try {
    logout(false); 
    // navigate("/")
    navigate("/", { replace: true });
    window.location.reload();
    navigate("/", { replace: true });
    window.location.reload();
    setIsProfileOpen(false);
    setIsMenuOpen(false);
  } catch (e) {
    console.error("Logout gagal:", e);
  }
};

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const isTugasFokusActive = isActive("/todo") || isActive("/pomodoro");
  const isProfileActive = isActive("/profile");

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
      <nav
        className={`fixed top-0 left-0 w-full p-4 z-50 transition-all ${
          scrolled ? "bg-[#2d4a73] shadow-lg" : "bg-transparent"
        }`}
      >
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
                <X className="w-6 h-6 text-current" />
              ) : (
                <Menu className="w-6 h-6 text-current" />
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
              className={`flex ${
                isMenuOpen
                  ? "flex-col items-center space-y-8 text-xl"
                  : "flex-row space-x-6"
              } md:flex-row md:space-x-6 md:space-y-0`}
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
                  className={linkClass("/friend")}
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
                      <Link
                        to="/todo"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsTaskOpen(false);
                        }}
                      >
                        To-do List
                      </Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-primary cursor-pointer rounded-2xl">
                      <Link
                        to="/pomodoro"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsTaskOpen(false);
                        }}
                      >
                        Pomodoro
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>

            <div className={`relative ${isMenuOpen ? "mt-8" : "md:ml-10"}`}>
              {user ? (
                // logged in
                <div>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className={`${
                      isProfileActive ? "text-yellow-400" : "text-white"
                    } group flex flex-col items-center gap-1 focus:outline-none`}
                  >
                    <img
                      src={isProfileActive ? profileIcon2 : profileIcon1}
                      alt="Profile"
                      className="w-6 group-hover:opacity-70"
                    />
                    <p className="text-xs">{user.name}</p>
                  </button>
                  {isProfileOpen && (
                    <ul className="absolute right-0 top-full mt-2 w-40 bg-white rounded-2xl shadow-lg z-10 text-gray-800">
                      <li>
                        <Link
                          to={`/profile/${user.username}`}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-200 rounded-t-2xl"
                          onClick={() => {
                            setIsProfileOpen(false);
                            setIsMenuOpen(false);
                          }}
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-200 rounded-b-2xl"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                // not logged in
                <Link
                  to="/login"
                  className={`${
                    isActive("/login") ? "text-yellow-400" : "text-white"
                  } group flex flex-col items-center gap-1`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <img
                    src={isActive("/login") ? profileIcon2 : profileIcon1}
                    alt="Login"
                    className="w-6 group-hover:opacity-70"
                  />
                  <p className="text-xs">Login</p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
