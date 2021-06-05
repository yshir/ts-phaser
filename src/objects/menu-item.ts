export class MenuItem extends Phaser.GameObjects.Text {
  constructor(x: number, y: number, text: string | string[], scene: Phaser.Scene) {
    super(scene, x, y, text, { color: '#ffffff', align: 'left', fontSize: '15' });
  }

  select(): void {
    this.setColor('#f8ff38');
  }

  deselect(): void {
    this.setColor('#ffffff');
  }

  // when the associated enemy or player unit is killed
  unitKilled(): void {
    this.active = false;
    this.visible = false;
  }
}
