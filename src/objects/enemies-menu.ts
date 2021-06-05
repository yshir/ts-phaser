import { Menu } from './menu';

export class EnemiesMenu extends Menu {
  constructor(x: number, y: number, scene: Phaser.Scene) {
    super(x, y, scene, []);
  }

  confirm(): void {
    this.scene.events.emit('Enemy', this.menuItemIndex);
  }
}
