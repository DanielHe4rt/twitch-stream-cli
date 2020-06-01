import net from 'net';

const yeelight = net.connect({
  host: "192.168.15.12",
  port: 55443,
});
