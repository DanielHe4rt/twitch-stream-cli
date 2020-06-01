import ioHook from 'iohook';
import PlayerSound from 'play-sound';

import hotkeys from '../../utils/hotkeys/hotkeys.json';
import { switchScene } from '../../utils';

class IoHook {
  constructor() {
    this.player = PlayerSound(); 
    ioHook.start();
  }

  keydown() {
    ioHook.on("keydown", event => {
      const keyPressed = hotkeys.find((key) => key.keycode === event.keycode);

      if (event.keycode === 3653)
        this.player.play("../../assets/water.mp3", err => console.log(err));

      if (keyPressed && event.shiftKey) 
        switchScene(keyPressed.scene);
    });
  }
}

export default IoHook;
