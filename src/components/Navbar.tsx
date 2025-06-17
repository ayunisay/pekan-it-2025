import React from "react";
import { Link } from "react-router";
import profileIcon from '../assets/icons/profile_icon.png';

const Navbar = () => {
  return (
    <>
      <nav className="bg-gray-800 p-4">
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
                <Link to="/" className="text-white hover:text-gray-300 font-semibold">
                  Find Friends
                </Link>
              </li>
              <li>
                <Link to="/grade" className="text-white hover:text-gray-300 font-semibold">
                  Grade
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-white hover:text-gray-300 font-semibold">
                  Chat
                </Link>
              </li>
              <li>
                <Link to="/pomodoro" className="text-white hover:text-gray-300 font-semibold">
                  Tugas & Fokus
                </Link>
              </li>
            </ul>

            <div className="ml-10">
              <Link to="/profile" className="text-white hover:text-gray-300 flex flex-col items-center gap-1">
                <img src={profileIcon} alt="Profile" className="w-6"/>
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

