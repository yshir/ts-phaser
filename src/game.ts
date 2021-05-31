import 'phaser';

import { scenes } from './scenes';

const isDebugMode = /debug/.test(location.hash);

const config: Phaser.Types.Core.GameConfig = {
  title: 'ts-phaser',
  version: '0.0.1',
  type: Phaser.AUTO,
  parent: 'game',
  width: 320,
  height: 240,
  zoom: 2,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: isDebugMode,
    },
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
