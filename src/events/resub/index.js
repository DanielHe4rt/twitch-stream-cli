import { subscribe } from '../commands';

function resub(channel, username, method, message, userstate) {
  console.log("Sub recebido pelo lendário " + username);
  console.log("Trocando de cena em 3 segundos");
  setTimeout(() => subscribe(), 8000);
}

export default resub;
