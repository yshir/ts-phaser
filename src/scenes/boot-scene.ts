import { WORLD_SCENE_KEY } from './world-scene';

export const BOOT_SCENE_KEY = 'BootScene';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: BOOT_SCENE_KEY });
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
    this.scene.start(WORLD_SCENE_KEY);
  }
}
