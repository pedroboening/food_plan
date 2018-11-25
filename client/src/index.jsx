import React from 'react';
import { render } from 'react-dom';
import '@babel/polyfill';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Routes from './js/Routes.jsx';

import './style/style.scss';

import Toast from './js/components/shared/toast/index.jsx';

const iconsList = [];

Object.keys(fas)
  .forEach((icon) => {
    if (Object.prototype.hasOwnProperty.call(fas, icon)) {
      const element = fas[icon];
      iconsList.push(element);
    }
  });

library.add(...iconsList);

const App = () => (
  <div>
    <Toast />
    <Routes />
  </div>
);

// eslint-disable-next-line no-undef
render(<App />, document.getElementById('app'));
