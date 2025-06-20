import { useState } from 'react'; 
import profileIcon1 from '../assets/icons/profileIcon1.png';
import profileIcon2 from '../assets/icons/profileIcon2.png';
import tugasIcon1 from '../assets/icons/tugasIcon1.png';
import tugasIcon2 from '../assets/icons/tugasIcon2.png';
import { Link, useLocation } from 'react-router';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isLogin = (user: string) => {
    if(!user == null) return true
  }

  const linkClass = (path: string) => {
    return isActive(path)
      ? 'text-yellow-400 hover:text-yellow-300 font-semibold'
      : 'text-white hover:text-gray-300 font-semibold';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className='fixed top-0 left-0 w-full p-4 z-50 bg-transparent bg-opacity-50'> 
        <div className='container mx-auto flex justify-between items-center'>
          <div className='text-white text-lg font-bold z-50'>
            <Link to='/' className='hover:text-gray-300'>
              <p>Aca Connect</p>
              <p className='text-xs'>Academic & connections</p>
            </Link>
          </div>

          <div className='md:hidden'>
            <button onClick={toggleMenu} className='text-white focus:outline-none'>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  ></path>
                ) : (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16m-7 6h7'
                  ></path>
                )}
              </svg>
            </button>
          </div>

          <div
            className={`md:flex flex-grow items-center justify-end ${
              isMenuOpen ? 'block absolute top-0 left-0 w-full h-screen bg-black bg-opacity-90 flex-col py-20' : 'hidden'
            } md:relative md:bg-transparent md:h-auto md:py-0`}
          >
            <ul className={`flex ${isMenuOpen ? 'flex-col items-center space-y-8 text-xl' : 'flex-row space-x-6'} md:flex-row md:space-x-6 md:space-y-0`}>
              <li>
                <Link to='/' className={linkClass('/')} onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/find' className={linkClass('/find')} onClick={() => setIsMenuOpen(false)}>
                  Find Friends
                </Link>
              </li>
              <li>
                <Link to='/grade' className={linkClass('/grade')} onClick={() => setIsMenuOpen(false)}>
                  Grade
                </Link>
              </li>
              <li>
                <Link to='/chat' className={linkClass('/chat')} onClick={() => setIsMenuOpen(false)}>
                  Chat
                </Link>
              </li>
              <li className='group flex flex-row justify-center items-center'>
                <Link to='/pomodoro' className={`${linkClass('/pomodoro')} flex items-center`} onClick={() => setIsMenuOpen(false)}>
                  Tugas & Fokus
                  <img
                    src={isActive('/pomodoro') ? tugasIcon2 : tugasIcon1}
                    className='w-4 h-full ml-2 group-hover:opacity-70 transition-opacity duration-200'
                    alt="Tugas & Fokus Icon"
                  />
                </Link>
              </li>
            </ul>

            <div className={`${isMenuOpen ? 'mt-8' : 'md:ml-10 mt-0'}`}>
              <Link
                to='/profile'
                className={`${linkClass('/profile')} group flex flex-col items-center gap-1`}
                onClick={() => setIsMenuOpen(false)}
              >
                <img
                  src={isActive('/profile') ? profileIcon2 : profileIcon1}
                  alt='Profile'
                  className='w-6 group-hover:opacity-70 transition-opacity duration-200'
                />
                <p className='text-xs'>
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