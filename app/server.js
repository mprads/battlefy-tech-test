import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import config from './webpack.config';
import api from '../api/index';

dotenv.config({ path: `${__dirname}./env` });

const PORT = process.env.PORT || 8080;
const ENV = process.env.NODE_ENV || 'development';

const app = express();

app.use('/api', api());
app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../index.html`));
});
app.use('/build', express.static(`${__dirname}/build`));

const startReactDev = () => {
  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  })
    .listen(3000, '0.0.0.0', (err) => {
      if (err) {
        console.log(err);
      }
      console.log('Running React Dev Server on http://0.0.0.0:3000');
    });
};

if (ENV === 'development') {
  startReactDev();
}

app.listen(PORT, () => {
  console.log(`Running Express ${ENV} app on port ${PORT}`);
});
