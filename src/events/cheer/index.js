import { cheers } from '../commands';

function cheer(channel, userstate, chatMessage) {
  console.log("Cheer: " + userstate["username"] + " - " + userstate["bits"]);
  cheers(userstate["bits"]);
}

export default cheer;
