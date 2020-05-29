const tmi = require("tmi.js");
const config = require("./config.json");
const hotkeys = require("./hotkeys.json");
const WebSocket = require("websocket").client;
const player = require("play-sound")();
const express = require("express");
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const userList = [];

app.use(express.static("client"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});

// Coisas funcionais favor n explodir

const {
  cheers,
  colorHandler,
  subscribe,
  switchScene,
  follow,
  epilepticMode,
  drinkWater,
} = require("./src/commands");
const { messageHandler } = require("./src/utils");

const ioHook = require("iohook");
ioHook.on("keydown", (event) => {
  let keyPressed = hotkeys.find((key) => key.keycode === event.keycode);
  if (event.keycode === 3653) {
    player.play("water.mp3", function (err) {
      console.log(err);
    });
  }
  if (keyPressed && event.shiftKey) {
    switchScene(keyPressed.scene);
  }
});

ioHook.start();

let twitch = new WebSocket();
let data = {
  type: "LISTEN",
  data: {
    topics: ["channel-points-channel-v1.227168488"],
    auth_token: config.twitchOAuth,
  },
};
function heartbeat(twitch) {}
twitch.on("connect", function (connection) {
  setInterval(() => {
    let message = {
      type: "PING",
    };

    connection.send(JSON.stringify(message));
  }, 10000);
  connection.send(JSON.stringify(data));
  //   console.log("WebSocket Client Connected");
  connection.on("error", function (error) {
    console.log("Connection Error: " + error.toString());
  });
  connection.on("close", function () {
    console.log("echo-protocol Connection Closed");
  });
  connection.on("message", function (response) {
    if (response.type === "utf8") {
      let rawMessage = JSON.parse(response.utf8Data);

      if (rawMessage.type === "MESSAGE") {
        let response = JSON.parse(rawMessage.data.message);
        let username = response.data.redemption.user.display_name;

        userList.push(username);
        io.emit("user-list", { users: userList.length ? userList : [] });
        let redemptionId = response.data.redemption.reward.id;
        if (redemptionId === "54bd67d1-fbea-4021-840a-0311618ff227") {
          epilepticMode();
          player.play("fbimega.mp3", function (err) {
            console.log(err);
          });
        }

        console.log(redemptionId);
        if (redemptionId === "bb1ac056-deff-48f2-9d40-34f13c2149b9") {
          drinkWater();
        }
      } else {
        console.log("Received:", rawMessage);
      }
    }
  });
});

twitch.connect("wss://pubsub-edge.twitch.tv");

const opts = {
  identity: {
    username: "jorginhogameplays",
    password: `oauth:${config.token}`,
  },
  connection: {
    reconnect: true,
    secure: true,
  },
  channels: config.channels,
};
const client = new tmi.Client(opts);
console.log("Tamo on");

client.on("message", (channel, userstate, chatMessage, self) => {
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
});

client.on("cheer", (channel, userstate, chatMessage) => {
  console.log("Cheer: " + userstate["username"] + " - " + userstate["bits"]);
  cheers(userstate["bits"]);
});

client.on("subscription", (channel, username, method, message, userstate) => {
  console.log("Sub recebido pelo lendário " + username);
  console.log("Trocando de cena em 3 segundos");
  setTimeout(() => subscribe(), 8000);
});

client.on("resub", (channel, username, method, message, userstate) => {
  console.log("Sub recebido pelo lendário " + username);
  console.log("Trocando de cena em 3 segundos");
  setTimeout(() => subscribe(), 8000);
});

client.on("subgift", (channel, username, method, message, userstate) => {
  console.log("Sub recebido pelo lendário " + username);
  console.log("Trocando de cena em 3 segundos");
  setTimeout(() => subscribe(), 8000);
});

client.connect();
