// or, override the platform
// or, override the platform
const Say = require("say");

let text =
  "This is Ground Control to Major Tom This is Ground Control to Major Tom This is Ground Control to Major Tom";
let voice;
let speed = 2.0;

// output some text to the console as the callback
Say.speak(text, voice, speed, (error) => {
  if (error) {
    // This fires when say.stop fires. Not sure if that's a good or bad thing...
    return console.error("Error speaking!", error);
  }

  console.log("text to speech complete");
});
