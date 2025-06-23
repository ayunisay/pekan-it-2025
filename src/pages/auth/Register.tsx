import React, { useState } from 'react';
import { MyForm, MyFormInput } from '../../components/Form';
import { MyButton } from '../../components/Button';
import { Link, useNavigate } from 'react-router';
import MyPopup from '../../components/Popup';
import { register } from '../../providers/userProvider';

const Register = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [inputs, setInputs] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (confirmPassword !== inputs.password) {
      setErrorMessage('Password and confirm password do not match.');
      setShowErrorPopup(true);
      return;
    }

    try {
      await register(inputs);
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate('/login');
      }, 1500);
    } catch (e) {
      setErrorMessage('Registration failed. Please try again.');
      setShowErrorPopup(true);
      console.log('Error', e);
    }
  };

  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value);
    if (errorMessage) {
      setErrorMessage('');
      setShowErrorPopup(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen p-8'>
      <div className='w-full max-w-2xl rounded-xl shadow-2xl bg-white p-12'>
    {showSuccessPopup && (
      <MyPopup
          isOpen={showSuccessPopup}
          title='Success Register'
          message='Alhamdulillah berhasil'
          variant='success'
          onClose={() => setShowSuccessPopup(false)}
        />
      )}

      {showErrorPopup && (
        <MyPopup
          isOpen={showErrorPopup}
          title='Register Gagal'
          message={errorMessage || 'Terjadi kesalahan.'}
          variant='error'
          onClose={() => setShowErrorPopup(false)}
        />
      )}
        <MyForm title='Register' className='space-y-6'>
          <MyFormInput
            label='Email'
            name='email'
            type='email'
            value={inputs.email}
            className='block py-4 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-3 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            onChange={(e) => setInputs((d) => ({ ...d, email: e.target.value }))}
          />
          <MyFormInput
            label='Username'
            name='username'
            type='text'
            value={inputs.username}
            className='block py-4 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-3 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            onChange={(e) => setInputs((d) => ({ ...d, username: e.target.value }))}
          />
          <MyFormInput
            label='Name'
            name='name'
            type='text'
            value={inputs.name}
            className='block py-4 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-3 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            onChange={(e) => setInputs((d) => ({ ...d, name: e.target.value }))}
          />
          <MyFormInput
            label='Password'
            name='password'
            type='password'
            value={inputs.password}
            className='block py-4 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-3 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            onChange={(e) => setInputs((d) => ({ ...d, password: e.target.value }))}
          />
          <MyFormInput
            label='Confirm Password'
            name='confirmPassword'
            type='password'
            value={confirmPassword}
            className='block py-4 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-3 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            onChange={handleConfirmPasswordChange}
          />
          <div className='flex justify-center'>
            <MyButton
              text={'Daftar'}
              className=''
              variant='accent'
              onClick={handleSignUp}
            />
          </div>
          <div className='flex'>
            <p>Sudah Punya akun?</p>
            <Link
              to='/login'
              className='ml-1 font-medium text-blue-600 hover:underline dark:text-blue-500'
            >
              Login
            </Link>
          </div>
        </MyForm>
      </div>
    </div>
  );
};

export default Register;
