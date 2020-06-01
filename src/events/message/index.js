import {
  cheers,
  colorHandler,
  subcribe,
  follow,
} from '../commands';
import { messageHandler } from '../utils';

function message(channel, userstate, chatMessage, self) {
  const msg = chatMessage.split(" ");

  const chatCommands = msg => {
    const commands = {
      "!color": colorHandler(msg[1]),
      "test_subscribe": subcribe(),
      "test_cheers": cheers(msg[1]),
      "test_follow": follow(),
    }

    return commands[msg];
  }

  console.log("Message: " + userstate["username"] + " - " + chatMessage);
  if (userstate["username"] === "streamlabs") {
    if (messageHandler(chatMessage)) {
      follow();
    }
  }

  if (msg && msg[0] === '!color')
    colorHandler(msg[1]);

  if (userstate["username"] === "danielhe4rt") 
    chatCommands(msg[0]);
};

export default message;
