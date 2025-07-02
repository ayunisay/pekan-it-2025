import { useState } from 'react'
import { MyButton } from '../../components/Button'
import { MyForm, MyFormInput } from '../../components/Form'
import { Link, useNavigate } from 'react-router-dom'
import MyPopup from '../../components/Popup'
import { login } from '../../providers/userProvider'
import Cookies from 'js-cookie'

import { useState } from "react";
import { MyButton } from "../../components/Button";
import { MyForm, MyFormInput } from "../../components/Form";
import { Link, useNavigate } from "react-router";
import MyPopup from "../../components/Popup";
import { login } from "../../providers/userProvider";
import Cookies from "js-cookie";
import useGetUser from "../../hooks/useGetUser";

const Login = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputs, setInputs] = useState({
 
    email: '',
    password: ''
  })
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { refetch } = useGetUser();

  const navigate = useNavigate();

  const handleLogin = async () => {
    try{
      const data = await login(inputs);
      setShowSuccessPopup(true);
      Cookies.set('token', data.token, {
        expires: 7,
        secure: true
      })
      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate('/dashboard')
      }, 1500)
    } catch (e){
      setErrorMessage('Anda gagal masuk!. Silahkan coba kembali.');
      setShowErrorPopup(true);
      console.log('Error', e);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#e6ecf2] to-[#6B93A6] font-helvetica">
      <div className="relative w-full max-w-sm flex flex-col items-center">
        <h1 className="absolute top-14 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[64px] font-extrabold font-lato text-[#6B93A6] opacity-90 select-none pointer-events-none z-0">
          Masuk
        </h1>
        <div className="relative w-full bg-[#6B93A6] rounded-2xl shadow-2xl mt-20 py-5 sm:py-8 px-0 flex flex-col items-center z-10">
          {showSuccessPopup && (
            <MyPopup
              isOpen={showSuccessPopup}
              title='Anda behasil masukl'
              message='Selamat datang kembali!'
              variant='success'
              onClose={() => setShowSuccessPopup(false)}
            />
          )}
          {showErrorPopup && (
            <MyPopup
              isOpen={showErrorPopup}
              title='Anda gagal masuk!'
              message={errorMessage || 'Terjadi kesalahan.'}
              variant='error'
              onClose={() => setShowErrorPopup(false)}
            />
          )}
          <MyForm title="" className="w-full space-y-4">
            <MyFormInput
              label=""
              name="email"
              type="email"
              placeholder="masukkan email"
              value={inputs.email}
              className="flex items-center justify-between w-full mr-35 py-4 pr-5 pl-5 bg-white rounded-xl shadow hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setInputs((d) =>({ ...d, email: e.target.value}))}
            />
            <MyFormInput
              label=""
              name="password"
              type="password"
              placeholder="masukkan sandi"
              value={inputs.password}
              className="flex items-center justify-between w-full mr-35 py-4 pr-5 pl-5 bg-white rounded-xl shadow hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setInputs((d) =>({ ...d, password: e.target.value}))}
            />
            <div className="flex justify-between text-white text-xs mb-10">
              <span>
                Belum Punya Akun?{' '}
                <Link to="/register" className="underline font-semibold">Daftar</Link>
              </span>
              <Link to="/forgot" className="underline font-semibold">Lupa Sandi?</Link>
            </div>
              <MyButton
              text={'Masuk'}
              className="w-full py-3 rounded-xl bg-yellow-400 text-lg font-semibold text-white shadow-md hover:bg-yellow-500 hover:text-white focus:outline-none transition"
              onClick={handleLogin}
              />
            <hr className="my-4 border-gray-300" />
            <button
              type="button"
              className="flex items-center justify-between w-full px-4 py-3 mb-3 bg-white rounded-xl shadow hover:bg-gray-200 transition"
            >
              <span className="flex items-center font-semibold">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6 mr-3" />
                Lanjutkan dengan Google
              </span>
              <span className="text-2xl text-gray-400">&rarr;</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-between w-full px-4 py-3 bg-white rounded-xl shadow hover:bg-gray-200 transition"
            >
              <span className="flex items-center font-semibold">
                <img src="https://www.svgrepo.com/show/448224/facebook.svg" alt="Facebook" className="w-6 h-6 mr-3" />
                Lanjutkan dengan Facebook
              </span>
              <span className="text-2xl text-gray-400">&rarr;</span>
            </button>
          </MyForm>
        </div>

    try {
      const data = await login(inputs);
      setShowErrorPopup(false);
      setErrorMessage("");

      setShowSuccessPopup(true);
      Cookies.set("token", data.token, {
        expires: 7,
        secure: true,
      });
      refetch();
      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate("/", { replace: true });
        window.location.reload();
        navigate("/", { replace: true });
        window.location.reload();
      }, 1500);

      setInputs({
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (e) {
      setShowSuccessPopup(false);

      setErrorMessage("Login failed. Please try again.");
      setShowErrorPopup(true);
      console.log("Error", e);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-8">
      <div className="w-full max-w-2xl rounded-xl shadow-2xl bg-white p-12">
        {showSuccessPopup && (
          <MyPopup
            isOpen={showSuccessPopup}
            title="Success Register"
            message="Alhamdulillah berhasil"
            variant="success"
            onClose={() => setShowSuccessPopup(false)}
          />
        )}

        {showErrorPopup && (
          <MyPopup
            isOpen={showErrorPopup}
            title="Register Gagal"
            message={errorMessage || "Terjadi kesalahan."}
            variant="error"
            onClose={() => setShowErrorPopup(false)}
          />
        )}
        <MyForm title="Login" className="space-y-6">
          <MyFormInput
            label="Email"
            name="email"
            type="email"
            value={`${inputs.email}`}
            className="block py-4 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-3 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            onChange={(e) =>
              setInputs((d) => ({ ...d, email: e.target.value }))
            }
          />
          <MyFormInput
            label="Password"
            name="password"
            type="password"
            value={`${inputs.password}`}
            className="block py-4 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-3 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            onChange={(e) =>
              setInputs((d) => ({ ...d, password: e.target.value }))
            }
          />
          <div className="flex justify-center">
            <MyButton text={"Kirik"} onClick={handleLogin} />
          </div>
          <div className="flex">
            <p>Belum Punya akun?</p>
            <Link
              to="/register"
              className="ml-1 font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Register
            </Link>
          </div>
        </MyForm>
      </div>
    </div>
  );
};

export default Login;
