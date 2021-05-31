import 'phaser';

import { scenes } from './scenes';

const config: Phaser.Types.Core.GameConfig = {
  title: 'ts-phaser',
  version: '0.0.1',
  width: 640,
  height: 480,
  type: Phaser.AUTO,
  parent: 'game',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'game',
  },
  scene: scenes,
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener('load', () => {
  new Game(config);
});
