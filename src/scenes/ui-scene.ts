import { ActionsMenu } from '../objects/actions-menu';
import { EnemiesMenu } from '../objects/enemies-menu';
import { HeroesMenu } from '../objects/heroes-menu';
import { Menu } from '../objects/menu';
import { Message } from '../objects/message';
import { BattleScene, KEY_BATTLE_SCENE } from './battle-scene';

export const KEY_UI_SCENE = 'UIScene';

export class UIScene extends Phaser.Scene {
  private graphics?: Phaser.GameObjects.Graphics;
  private menus?: Phaser.GameObjects.Container;
  private heroesMenu?: HeroesMenu;
  private actionsMenu?: ActionsMenu;
  private enemiesMenu?: EnemiesMenu;

  public currentMenu?: Menu;
  public battleScene?: BattleScene;
  public message?: Message;

  constructor() {
    super({ key: KEY_UI_SCENE });
  }

  create(): void {
    // draw some background for the menu
    this.graphics = this.add.graphics();
    this.graphics.lineStyle(1, 0xffffff);
    this.graphics.fillStyle(0x031f4c, 1);
    this.graphics.strokeRect(2, 150, 90, 100);
    this.graphics.fillRect(2, 150, 90, 100);
    this.graphics.strokeRect(95, 150, 90, 100);
    this.graphics.fillRect(95, 150, 90, 100);
    this.graphics.strokeRect(188, 150, 130, 100);
    this.graphics.fillRect(188, 150, 130, 100);

    // basic container to hold all menus
    this.menus = this.add.container();
    this.heroesMenu = new HeroesMenu(195, 153, this);
    this.actionsMenu = new ActionsMenu(100, 153, this);
    this.enemiesMenu = new EnemiesMenu(8, 153, this);

    // the currently selected menu
    this.currentMenu = this.actionsMenu;

    // add menus to the container
    this.menus.add(this.heroesMenu);
    this.menus.add(this.actionsMenu);
    this.menus.add(this.enemiesMenu);

    this.battleScene = this.scene.get(KEY_BATTLE_SCENE) as BattleScene;

    // listen for keyboard events
    this.input.keyboard.on('keydown', this.onKeyInput, this);

    // when its player unit turn to move
    this.battleScene.events.on('PlayerSelect', this.onPlayerSelect, this);

    // when the action on the menu is selected
    // for now we have only one action so we don't send and action id
    this.events.on('SelectEnemies', this.onSelectEnemies, this);

    // an enemy is selected
    this.events.on('Enemy', this.onEnemy, this);

    // when the scene receives wake event
    this.sys.events.on('wake', this.createMenu, this);

    // the message describing the current action
    this.message = new Message(this, this.battleScene.events);
    this.add.existing(this.message);

    this.createMenu();
  }

  createMenu(): void {
    this.remapHeroes();
    this.remapEnemies();
    this.battleScene?.nextTurn();
  }

  remapHeroes(): void {
    if (!this.battleScene) {
      throw new Error('battle scene not found');
    }
    const heroes = this.battleScene.heroes;
    this.heroesMenu?.remap(heroes);
  }

  remapEnemies(): void {
    if (!this.battleScene) {
      throw new Error('battle scene not found');
    }
    const enemies = this.battleScene.enemies;
    this.enemiesMenu?.remap(enemies);
  }

  onKeyInput(event: KeyboardEvent): void {
    if (this.currentMenu && this.currentMenu) {
      if (event.code === 'ArrowUp') {
        this.currentMenu.moveSelectionUp();
      } else if (event.code === 'ArrowDown') {
        this.currentMenu.moveSelectionDown();
      } else if (event.code === 'ArrowRight' || event.code === 'Shift') {
        //
      } else if (event.code === 'Space' || event.code === 'ArrowLeft') {
        this.currentMenu.confirm();
      }
    }
  }

  onPlayerSelect(idx: number): void {
    this.heroesMenu?.select(idx);
    this.actionsMenu?.select(0);
    this.currentMenu = this.actionsMenu;
  }

  onSelectEnemies(): void {
    this.currentMenu = this.enemiesMenu;
    this.enemiesMenu?.select(0);
  }

  onEnemy(idx: number): void {
    this.heroesMenu?.deselect();
    this.actionsMenu?.deselect();
    this.enemiesMenu?.deselect();
    this.currentMenu = undefined;
    this.battleScene?.receivePlayerSelection('attack', idx);
  }
}
