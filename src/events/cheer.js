const { cheers } = require("../commands");
module.exports = async (channel, userstate, chatMessage) => {
  console.log("Cheer: " + userstate["username"] + " - " + userstate["bits"]);
  cheers(userstate["bits"]);
};
