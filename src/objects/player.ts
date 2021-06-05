import { Unit } from './unit';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export class Player extends Unit {
  public flipX: boolean;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    frame: string | number | undefined,
    type: string,
    hp: number,
    damage: number,
  ) {
    super(scene, x, y, texture, frame, type, hp, damage);
    // flip the image so I don't have to edit it manually
    this.flipX = true;
    this.setScale(2);
  }
}
