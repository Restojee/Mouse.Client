import React from 'react';
import * as ReactDOMClient from 'react-dom/client';

import './resources/styles/main.scss';
import './resources/styles/variables.scss';
import './resources/styles/fonts.scss';
import './resources/styles/styles.scss';

import App from "@/App";

const container = document.getElementById('root');

if (container) {
  const root = ReactDOMClient.createRoot(container);

  root.render(
    <App />,
  );
}
