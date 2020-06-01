const { cheers, colorHandler, subscribe, follow } = require("../commands");

module.exports = async (channel, userstate, chatMessage, self) => {
  console.log("Message: " + userstate["username"] + " - " + chatMessage);
  if (userstate["username"] === "streamlabs") {
    if (messageHandler(chatMessage)) {
      follow();
    }
  }
  let msg = chatMessage.split(" ");
  if (msg) {
    switch (msg[0]) {
      case "!color":
        console.log("color change");
        colorHandler(msg[1]);
        break;
    }
  }

  if (userstate["username"] === "danielhe4rt") {
    switch (msg[0]) {
      case "!color":
        colorHandler(msg[1]);
        break;
      case "test_subscribe":
        subscribe();
        break;
      case "test_cheers":
        console.log("fdse");
        cheers(msg[1]);
        break;
      case "test_follow":
        console.log("fdse");
        follow();
        break;
    }
  }
};
