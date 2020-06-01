const tmi = require("tmi.js");
const config = require("./config.json");
const fs = require("fs-extra");
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
const init = async () => {
  const evtFiles = await fs.readdir("src/events/");
  console.log("[#LOG]", `Carregando o total de ${evtFiles.length} eventos.`);
  evtFiles.forEach((f) => {
    const eventName = f.split(".")[0];
    // eslint-disable-next-line
    const event = require(`./src/events/${f}`);

    client.on(eventName, event);
  });

  client.connect();
};

init();
