export class MainScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'Main',
    });
  }

  preload(): void {
    console.log('hello, main');
  }

  create(): void {
    this.add.text(10, 10, 'This is a main scene');

    const text = this.add.text(10, 40, 'push this text');
    text.setInteractive();
    text.on('pointerdown', () => {
      this.scene.start('Title');
    });
  }
}
