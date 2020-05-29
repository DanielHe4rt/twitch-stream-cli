let boss = () => {
  this.data = {
    maxHp: 10,
    hp: 10,
    sprite: "fodase",
  };
};

var socket = io();

socket.on("user-list", (data) => {
  if (!data.users.length) {
    return false;
  }

  let userList = document.getElementById("users");

  userList.innerHTML = "";
  data.users.forEach((data) => {
    userList.insertAdjacentHTML("beforeend", `<marquee> ${data} </marquee>`);
  });
});
