const fs = require("fs");
const messageHandler = (msg) => {
  let username = msg.split(" ")[0];
  let patterns = [
    {
      type: "follow",
      pattern: "desenvolvedor do cor4ção",
      fileToSave: "lastFollow.txt",
    },
    {
      type: "sub",
      pattern: "patrocina a melhor live da minha casa",
      fileToSave: "lastSubscribe.txt",
    },
  ];

  let result = patterns.find((p) => {
    return msg.includes(p.pattern);
  });
  if (!result) {
    return false;
  }
  fs.writeFileSync("./outputs/" + result.fileToSave, username);

  return result.type === "follow";
};

module.exports = {
  messageHandler,
};
