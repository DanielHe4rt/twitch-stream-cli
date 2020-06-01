import fs from 'fs';


const messageHandler = msg => {
  const username = msg.split(" ")[0];
  const patterns = [
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

  const result = patterns.find(p => msg.includes(p.pattern));

  if (!result) return false;

  fs.writeFileSync("./outputs/" + result.fileToSave, username);

  return result.type === "follow";
};

export default messageHandler;
