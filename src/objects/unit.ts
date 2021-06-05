import { MenuItem } from './menu-item';

export class Unit extends Phaser.GameObjects.Sprite {
  public type: string;
  public maxHp: number;
  public hp: number;
  public damage: number;
  public living: boolean;
  public menuItem: MenuItem | null;

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
    super(scene, x, y, texture, frame);
    this.type = type;
    this.maxHp = hp;
    this.hp = hp;
    this.damage = damage; // default damage
    this.living = true;
    this.menuItem = null;
  }

  // we will use this to notify the menu item when the unit is dead
  setMenuItem(menuItem: MenuItem): void {
    this.menuItem = menuItem;
  }

  // attack the target unit
  attack(target: Unit): void {
    if (target.living) {
      target.takeDamage(this.damage);
      this.scene.events.emit('Message', `${this.type} attacks ${target.type} for ${this.damage} damage`);
    }
  }

  takeDamage(damage: number): void {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.hp = 0;
      this.menuItem && this.menuItem.unitKilled();
      this.living = false;
      this.visible = false;
      this.menuItem = null;
    }
  }
}
