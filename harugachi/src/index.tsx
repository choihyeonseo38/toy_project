// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';  // 'react-dom'에서 'client'로 변경
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
