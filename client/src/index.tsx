import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './components/tsx/Layout/Layout';
import RoutePage from './components/tsx/RoutePage';
import './index.css'

import { Provider } from 'react-redux'; // Імпортуємо Provider з react-redux
import store from './redux/store'; // Припустимо, що ваш Redux store знаходиться в файлі store.ts або store.js

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}> {/* Обгортка Provider */}
    <>
      <RoutePage />
    </>
  </Provider>
);
