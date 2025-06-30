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
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { refetch } = useGetUser();

  const navigate = useNavigate();

  const handleLogin = async () => {
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

