import express from 'express';
import { createServer } from 'http';

import { configObject } from './config';

import Twitch from './app/twitch';
import Tmi from './app/tmi';
import IoHook from './app/ioHook';

class App {
  constructor() {
    this.app = express();
    this.http = createServer(this.app);
  
    this.events();
  }

  events() {
    this.app.use(express.static('client'));
    this.app.get('/', (req, res) => 
      res.sendFile(__dirname, '/index.html')
    );

    new Twitch(configObject, this.http);
    new Tmi(configObject);
    new IoHook();
  }
}

new App().http.listen(3000);
