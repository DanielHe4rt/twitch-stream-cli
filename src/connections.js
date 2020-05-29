const net = require("net");
const OBSWebSocket = require("obs-websocket-js");
const yeelight = net.connect({
  host: "192.168.15.12",
  port: 55443,
});

const obs = new OBSWebSocket();

obs.connect({
  address: "localhost:4444",
  password: "",
});

const switchScene = (sceneName) => {
  obs
    .send("SetCurrentScene", {
      "scene-name": sceneName,
    })
    .catch((res) => console.error(res));
};

module.exports = {
  switchScene,
  yeelight,
};
