import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './../src/style/navbar.scss'
import './../src/style/cookie.scss'
import {
  BrowserRouter,
} from "react-router-dom";
import './i18n';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback="loading">
<BrowserRouter>
    <App />
</BrowserRouter>
  </Suspense>
);
