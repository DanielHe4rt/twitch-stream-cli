function dispatchCommand(command) {
  const id = 1;
  command = { ...command, id: id++ };

  yeelight.write(JSON.stringify(command) + "\r\n");
};

export default dispatchCommand;