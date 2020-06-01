import ObsWebSocket from 'obs-websocket-js';

const obs = new ObsWebSocket();

obs.connect({
  address: "localhost:4444",
  password: "",
});

export default obs;
