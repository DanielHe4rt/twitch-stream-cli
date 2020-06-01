import { client as WebSocket } from 'websocket';
import PlaySound from 'play-sound';

import { epilepticMode } from '../../commands';
import Io from '../io';

class Twitch {
  constructor({ twitchOAuth }, http) {
    this.userList = [];
    this.data = {
      type: "LISTEN",
      data: {
        topics: ["channel-points-channel-v1.227168488"],
        auth_token: twitchOAuth,
      },
    };
  
    this.player = PlaySound();
    this.twitch = new WebSocket();
    this.socketIo = new Io(http);
    
    this.twitch.connect("wss://pubsub-edge.twitch.tv");
  }

  connect() {
    this.io
    this.twitch.on("connect", connection => {
      setInterval(() => {
        const message = {
          type: "PING",
        };

        connection.send(JSON.stringify(message));
      }, 10000);
      
      connection.send(JSON.stringify(this.data));

      connection.on('error', error =>
        console.log(`Connection Error: ${error.toString()}`)
      );

      connection.on('close', () => 
        console.log('echo-protocol Connection Closed')
      );

      connection.on('message', response => {
        const { io } = this.socketIo;

        if (response.type === "utf8") {
          const rawMessage = JSON.parse(response.utf8Data);

          if (rawMessage.type === "MESSAGE") {
            const response = JSON.parse(rawMessage.data.message);
            const username = response.data.redemption.user.display_name;

            userList.push(username);
            io("attacks", { username });
            const redemption = response.data.redemption.reward.id;

            const launchSoundAndEpiletic = () => {
              epilepticMode();
              this.player.play('../../assets/fbimega.mp3', err => console.log(err));
            }

            const redemptionId = {
              "54bd67d1-fbea-4021-840a-0311618ff227": launchSoundAndEpiletic(),
              "bb1ac056-deff-48f2-9d40-34f13c2149b9": drinkWater(),
            }

            redemptionId[redemption];
          } else {
            console.log(`Received:, ${rawMessage}`);
          }
        }
      });
    });
  }
}

export default Twitch;
