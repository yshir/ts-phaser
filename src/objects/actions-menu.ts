import { Menu } from './menu';

export class ActionsMenu extends Menu {
  constructor(x: number, y: number, scene: Phaser.Scene) {
    super(x, y, scene, []);
    this.addMenuItem('Attack');
  }

  confirm(): void {
    this.scene.events.emit('SelectEnemies');
  }
}
