function subscribe(commands) {
  switchScene("chatting");
  dispatchCommand(commands.subscribe);

  setTimeout(() => {
    switchScene("main");
  }, 10000);
};

export default subscribe;