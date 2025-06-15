import React, { useState } from 'react'
import { MyForm, MyFormInput } from '../../components/Form'
import { MyButton } from '../../components/Button';
import { Link } from 'react-router';

const Register = () => {
    const [data, setData] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

  return (
    <div className='flex justify-center items-center bg-blue-500 min-h-screen p-8'>
        <div className='w-full max-w-2xl rounded-xl shadow-2xl bg-white p-12'>
        <MyForm title="Login" className='space-y-6'>
            <MyFormInput
            label="Email"
            name="email"
            type="email"
            value={`${data.email}`}
            className="block py-4 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-3 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            onChange={(e) => setData((d) =>({ ...d, email: e.target.value}))}
            />
            <MyFormInput
            label="Username"
            name="username"
            type="text"
            value={`${data.email}`}
            className="block py-4 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-3 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            onChange={(e) => setData((d) =>({ ...d, email: e.target.value}))}
            />
            <MyFormInput
            label="Name"
            name="name"
            type="text"
            value={`${data.email}`}
            className="block py-4 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-3 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            onChange={(e) => setData((d) =>({ ...d, email: e.target.value}))}
            />
            <MyFormInput
            label="Password"
            name="password"
            type="password"
            value={`${data.password}`}
            className="block py-4 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-3 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            onChange={(e) => setData((d) =>({ ...d, password: e.target.value}))}
            />
            <MyFormInput
            label="Confirm Password"
            name="password"
            type="password"
            value={`${data.confirmPassword}`}
            className="block py-4 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-3 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            onChange={(e) => setData((d) =>({ ...d, confirmPassword: e.target.value}))}
            />
             <div className="flex justify-center">
                <MyButton text={'Kirik'} className=''/>
            </div>
            <div className="flex">
              <p>
                Sudah Punya akun? 
              </p>
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
  )
}

export default Register