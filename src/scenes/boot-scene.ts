import { KEY_WORLD_SCENE } from './world-scene';

export const KEY_BOOT_SCENE = 'BootScene';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: KEY_BOOT_SCENE });
  }

  preload(): void {
    console.log('preload BootScene');

    // map tiles
    this.load.image('tiles', 'assets/map/spritesheet.png');
    // map in json format
    this.load.tilemapTiledJSON('map', 'assets/map/map.json');
    // our two characters
    this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });
  }

  create(): void {
    this.scene.start(KEY_WORLD_SCENE);
  }
}
