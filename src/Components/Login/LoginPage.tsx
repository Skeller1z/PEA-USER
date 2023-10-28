import React, { useState, useRef } from 'react';
import backgroundImage from '../../Assets/Vs1a2hkGW5A998btKKqOMuTGMaYWfBIcYY5G0Tp1V2p1V2KOqyUEce9vA1.webp';
import { TextBox } from 'devextreme-react/text-box';
import { useNavigate } from 'react-router-dom';
import userData from './users.json';

type Props = {};

const LoginPage = () => {
  const [error, setError] = useState('');
  const usernameRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const username = usernameRef.current.instance.option('value');
    const password = passwordRef.current.instance.option('value');
    const user = userData.find((u) => u.username === username && u.password === password);
    if (user) {
      if (user.role === 'Admin') {
        setError('');
        console.log("Success Admin")
        // navigate('MapComponents');
      } else if (user.role === 'Tester') {
        setError('');
        // navigate('Tester');
        console.log("Success Tester")
      } else {
        setError('');
        navigate('MainMap');
        console.log("Success User")
      }
    } else {
      setError('Invalid username or password');
      console.log("Error")
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="absolute bg-black opacity-60 w-full h-full top-0 left-0"
        style={{ backdropFilter: 'blur(50px)' }}
      ></div>
      <div className="max-w-md w-full mx-auto relative z-10">
        <div className="bg-white p-8 border-t-4 border-indigo-500 rounded-lg shadow-lg">
          <div className="mb-4">
            <h3 className="text-2xl text-center">Login</h3>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <TextBox placeholder="Username" ref={usernameRef} />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <TextBox mode="password" placeholder="Password" defaultValue="" ref={passwordRef} />
          </div>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <div className="flex items-center justify-center">
            <button
              onClick={handleLogin}
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
