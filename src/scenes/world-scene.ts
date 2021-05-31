export const WORLD_SCENE_KEY = 'WorldScene';

export class WorldScene extends Phaser.Scene {
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private player?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor() {
    super({ key: WORLD_SCENE_KEY });
    this.cursors = undefined;
    this.player = undefined;
  }

  preload(): void {
    console.log('preload WorldScene');
  }

  create(): void {
    const map = this.make.tilemap({ key: 'map' });
    const tiles = map.addTilesetImage('spritesheet', 'tiles');
    // const grass = map.createLayer('Grass', tiles, 0, 0);
    map.createLayer('Grass', tiles, 0, 0);
    const obstacles = map.createLayer('Obstacles', tiles, 0, 0);
    obstacles.setCollisionByExclusion([-1]);

    // set player
    this.player = this.physics.add.sprite(50, 100, 'player', 6);
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    // set cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { frames: [2, 8, 2, 14] }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { frames: [0, 6, 0, 12] }),
      frameRate: 10,
      repeat: -1,
    });

    this.physics.add.collider(this.player, obstacles);
  }

  update(): void {
    this.player?.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors?.left.isDown) {
      this.player?.body.setVelocityX(-80);
    } else if (this.cursors?.right.isDown) {
      this.player?.body.setVelocityX(80);
    }

    // Vertical movement
    if (this.cursors?.up.isDown) {
      this.player?.body.setVelocityY(-80);
    } else if (this.cursors?.down.isDown) {
      this.player?.body.setVelocityY(80);
    }

    if (this.cursors?.left.isDown) {
      this.player?.anims.play('left', true);
    } else if (this.cursors?.right.isDown) {
      this.player?.anims.play('right', true);
    } else if (this.cursors?.up.isDown) {
      this.player?.anims.play('up', true);
    } else if (this.cursors?.down.isDown) {
      this.player?.anims.play('down', true);
    } else {
      this.player?.anims.stop();
    }
  }
}
