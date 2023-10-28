import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import Router from './routes/routes';

function App() {
  return (
    <>
      <Suspense>
        <Router />
      </Suspense>
    </>
  );
}

export default App;
