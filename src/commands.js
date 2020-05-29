const commands = require("../commands.json");
const parseColor = require("parse-color");
const { yeelight, switchScene } = require("./connections");
yeelight.on("data", (data) => console.log(data.toString()));
const dispatchCommand = (command) => {
  let id = 1;
  command = { ...command, id: id++ };
  yeelight.write(JSON.stringify(command) + "\r\n");
};

const subscribe = () => {
  switchScene("chatting");
  dispatchCommand(commands.subscribe);

  setTimeout(() => {
    switchScene("main");
  }, 10000);
};

const cheers = (amount) => {
  let cheerCommand = commands.cheers;
  cheerCommand.params[0] = amount * 2;
  dispatchCommand(cheerCommand);
};

const follow = () => {
  dispatchCommand(commands.follow);
};

const drinkWater = () => {
  dispatchCommand(commands.water);
};

const epilepticMode = () => {
  dispatchCommand(commands.xmas_party);
};

const colorHandler = async (hex) => {
  if (!parseColor(hex).hex) {
    return;
  }
  const color = parseColor(hex);
  const colorValue = parseInt(color.hex.slice(1), 16);
  const bright = color.rgba.slice(-1) * 100;

  return Promise.all([
    dispatchCommand({
      ...commands.color,
      params: [colorValue, "smooth", 500],
    }),
    dispatchCommand({
      ...commands.bright,
      params: [bright, "smooth", 500],
    }),
  ]);
};

module.exports = {
  dispatchCommand,
  colorHandler,
  subscribe,
  cheers,
  switchScene,
  follow,
  epilepticMode,
  drinkWater,
};
