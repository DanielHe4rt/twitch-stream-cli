import tmi from 'tmi.js';

import { cheers, subcribe } from '../../commands';

class Tmi {
  constructor({ channels, token }) {
    this.opts = {
      identity: {
        username: "jorginhogameplays",
        password: `oauth:${token}`,
      },
      connection: {
        reconnect: true,
        secure: true,
      },
      channels,
    }

    this.client = new tmi.Client(this.opts);
  }

  message() {
    this.client.on('message', (channel, userstate, chatMessage, self) => {
      console.log("Message: " + userstate["username"] + " - " + chatMessage);
    });
  }

  cheer() {
    this.client.on("cheer", (channel, userstate, chatMessage) => {
      console.log("Cheer: " + userstate["username"] + " - " + userstate["bits"]);
      cheers(userstate["bits"]);
    });
  }

  subscription() {
    this.client.on(
      "subscription", 
      (channel, username, method, message, userstate) => {
        console.log("Sub recebido pelo lendário " + username);
        console.log("Trocando de cena em 3 segundos");
        setTimeout(() => subcribe(), 8000);
      }
    );
  }

  resub() {
    this.client.on("resub", (channel, username, method, message, userstate) => {
      console.log("Sub recebido pelo lendário " + username);
      console.log("Trocando de cena em 3 segundos");
      setTimeout(() => subscribe(), 8000);
    });
  }

  subgift() {
    this.client.on(
      "subgift",
      (channel, username, method, message, userstate) => {
        console.log("Sub recebido pelo lendário " + username);
        console.log("Trocando de cena em 3 segundos");
        setTimeout(() => subscribe(), 8000);
      }
    );
  }
}

export default Tmi;
