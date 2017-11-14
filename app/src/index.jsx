// Application entrypoint


// Render the top-level React component
import React from 'react';
import ReactDom from 'react-dom';

import App from './App.jsx';

// Load up the app styles
require('../styles/main.scss');

ReactDom.render(<App />, document.getElementById('react-root'));
