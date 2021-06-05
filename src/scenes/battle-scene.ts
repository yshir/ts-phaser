import { Enemy } from '../objects/enemy';
import { Player } from '../objects/player';
import { Unit } from '../objects/unit';
import { KEY_UI_SCENE } from './ui-scene';
import { KEY_WORLD_SCENE } from './world-scene';

export const KEY_BATTLE_SCENE = 'BattleScene';

export class BattleScene extends Phaser.Scene {
  public heroes: Player[];
  public enemies: Enemy[];
  public units: Unit[];
  public index: number;

  constructor() {
    super({ key: KEY_BATTLE_SCENE });
    this.heroes = [];
    this.enemies = [];
    this.units = [];
    this.index = 0;
  }

  create(): void {
    // change the background to green
    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');

    this.startBattle();

    // on wake event we call startBattle too
    this.sys.events.on('wake', this.wake, this);
  }

  startBattle(): void {
    // player character - warrior
    const warrior = new Player(this, 250, 50, 'player', 1, 'Warrior', 100, 20);
    this.add.existing(warrior);

    // player character - mage
    const mage = new Player(this, 250, 100, 'player', 4, 'Mage', 80, 8);
    this.add.existing(mage);

    // enemy character - dragonblue
    const dragonblue = new Enemy(this, 50, 50, 'dragonblue', undefined, 'Dragon', 50, 3);
    this.add.existing(dragonblue);

    // enemy character - dragonorrange
    const dragonorrange = new Enemy(this, 50, 100, 'dragonorrange', undefined, 'Dragon2', 50, 3);
    this.add.existing(dragonorrange);

    this.heroes = [warrior, mage];
    this.enemies = [dragonblue, dragonorrange];
    this.units = [...this.heroes, ...this.enemies];

    this.index = -1; // currently active unit

    this.scene.run(KEY_UI_SCENE);
  }

  nextTurn(): void {
    if (this.checkEndBattle()) {
      this.endBattle();
      return;
    }

    do {
      this.index++;
      // if there no more units, we start again from the first one
      if (this.index > this.units.length) {
        this.index = 0;
      }
    } while (!this.units[this.index]?.living);

    const unit = this.units[this.index];
    if (unit) {
      if (unit instanceof Player) {
        this.events.emit('PlayerSelect', this.index);
      } else {
        let r: number;
        do {
          r = Math.floor(Math.random() * this.heroes.length);
        } while (!this.heroes[r]?.living);

        const hero = this.heroes[r];
        if (!hero) {
          throw new Error('hero not exists unexpected');
        }
        unit.attack(hero);
        this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
      }
    }
  }

  checkEndBattle(): boolean {
    // if all enemies are dead we have victory
    const victory = this.enemies.every(enemy => !enemy.living);
    // if al heroes are dead we have game over
    const gameOver = this.heroes.every(hero => !hero.living);
    return victory || gameOver;
  }

  endBattle(): void {
    // clear state, remove sprites
    this.heroes.length = 0;
    this.enemies.length = 0;
    this.units.forEach(unit => {
      unit.destroy();
    });
    this.units.length = 0;

    // sleep the UI
    this.scene.sleep(KEY_UI_SCENE);
    // return to WorldScene and sleep current BattleScene
    this.scene.switch(KEY_WORLD_SCENE);
  }

  receivePlayerSelection(action: string, target: number): void {
    if (action === 'attack') {
      const enemy = this.enemies[target];
      if (!enemy) {
        throw new Error('enemy not exists unexpected');
      }
      const unit = this.units[this.index];
      if (!unit) {
        throw new Error('unit not exists unexpected');
      }
      unit.attack(enemy);
    }

    // next turn in 3 seconds
    this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
  }

  exitBattle(): void {
    this.scene.sleep(KEY_UI_SCENE);
    this.scene.switch(KEY_WORLD_SCENE);
  }

  wake(): void {
    this.scene.run(KEY_UI_SCENE);
    this.time.addEvent({ delay: 2000, callback: this.exitBattle, callbackScope: this });
  }
}
