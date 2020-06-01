const WIDTH = 526;
const HEIGHT = 300;
class Boss {
  constructor(ctx, name, hp) {
    this.ctx = ctx;
    this.data = {
      name,
      hp,
      maxHp: hp,
      sprite: "nligo1.png",
    };
  }

  drawGame() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, WIDTH, HEIGHT);
    // Boss
    this.ctx.beginPath();
    this.ctx.moveTo(100, 240);
    this.ctx.lineWidth = 15;
    this.ctx.lineCap = "round";
    this.ctx.lineTo(150, 240);
    this.ctx.stroke();

    // this.ctx.font = "50px serif";
    this.ctx.fillStyle = "red";
    // this.ctx.fillText(this.data.name, 100, 50);
    this.ctx.font = "25px serif";
    this.ctx.fillText(`${this.data.hp}/${this.data.maxHp}`, 110, 50);

    // Player
    this.ctx.beginPath();
    this.ctx.moveTo(350, 240);
    this.ctx.lineWidth = 15;
    this.ctx.lineCap = "round";
    this.ctx.lineTo(400, 240);
    this.ctx.stroke();
  }

  hit(playerName) {
    console.log(`${playerName} deu 1 hit no boss`);
    if (this.data.hp <= 0) {
      alert("mato o bicho faze oq");
      return false;
    }
    this.data.hp--;
  }
}

const ctx = document.getElementById("game").getContext("2d");
let java = new Boss(ctx, "javaescrito", 10);

console.log(java);
java.drawGame();
let socket = io();

socket.on("attacks", (data) => {
  java.hit("fodase");
  java.drawGame();
});