export class TitleScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'Title',
    });
  }

  preload(): void {
    console.log('hello, title');
  }

  create(): void {
    this.add.text(10, 10, 'This is a title scene');

    const text = this.add.text(10, 40, 'push this text');
    text.setInteractive();
    text.on('pointerdown', () => {
      this.scene.start('Main');
    });
  }
}
