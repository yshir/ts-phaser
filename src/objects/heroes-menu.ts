import { Menu } from './menu';

export class HeroesMenu extends Menu {
  constructor(x: number, y: number, scene: Phaser.Scene) {
    super(x, y, scene, []);
  }
}
