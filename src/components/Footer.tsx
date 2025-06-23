import { Link } from "react-router";

type FooterProps = {
  className?: string;
};

const Footer: React.FC<FooterProps> = ({ className = "", ...rest }) => {
  return (
    <footer className="bg-gradient-to-b from-tertiary via-[#5a7ba8] to-primary py-16 px-8">
      <div className="max-w-6xl mx-auto border-t border-slate-400 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 mb-12">
          <div className="col-span-1">
            <h2 className="text-white text-2xl font-bold mb-2">AcaConnect</h2>
            <p className="text-slate-200 text-sm">Academy & Connection</p>
          </div>

          <div className="col-span-1">
            <h3 className="text-white text-lg font-semibold mb-4">Study?</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  className="text-slate-200 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-slate-200 hover:text-white transition-colors"
                >
                  Find Friends
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-slate-200 hover:text-white transition-colors"
                >
                  Grade
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-slate-200 hover:text-white transition-colors"
                >
                  Chats
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-slate-200 hover:text-white transition-colors"
                >
                  Tugas & Fokus
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-white text-lg font-semibold mb-4">Study?</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  className="text-slate-200 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-slate-200 hover:text-white transition-colors"
                >
                  Find Friends
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-slate-200 hover:text-white transition-colors"
                >
                  Grade
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-slate-200 hover:text-white transition-colors"
                >
                  Chats
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-slate-200 hover:text-white transition-colors"
                >
                  Tugas & Fokus
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <div className="bg-slate-700 p-6 rounded-2xl w-80">
              <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-slate-200 text-sm block mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="text-slate-200 text-sm block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-400 pt-8">
          <p className="text-slate-200 text-center text-sm">
            © 2025 AcaConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
