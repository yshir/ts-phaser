import { MenuItem } from './menu-item';
import { Player } from './player';
import { Unit } from './unit';

export class Menu extends Phaser.GameObjects.Container {
  public menuItems: MenuItem[];
  public menuItemIndex: number;
  public heroes: Player[];
  public selected: boolean;

  constructor(x: number, y: number, scene: Phaser.Scene, heroes: Player[]) {
    super(scene, x, y);
    this.menuItems = [];
    this.menuItemIndex = 0;
    this.heroes = heroes;
    this.x = x;
    this.y = y;
    this.selected = false;
  }

  addMenuItem(unit: string): MenuItem {
    const menuItem = new MenuItem(0, this.menuItems.length * 20, unit, this.scene);
    this.menuItems.push(menuItem);
    this.add(menuItem);
    return menuItem;
  }

  // menu navigation
  moveSelectionUp(): void {
    this.menuItems[this.menuItemIndex]?.deselect();
    do {
      this.menuItemIndex--;
      if (this.menuItemIndex < 0) {
        this.menuItemIndex = this.menuItems.length - 1;
      }
    } while (!this.menuItems[this.menuItemIndex]?.active);
    this.menuItems[this.menuItemIndex]?.select();
  }

  moveSelectionDown(): void {
    this.menuItems[this.menuItemIndex]?.deselect();
    do {
      this.menuItemIndex++;
      if (this.menuItemIndex >= this.menuItems.length) {
        this.menuItemIndex = 0;
      }
    } while (!this.menuItems[this.menuItemIndex]?.active);
    this.menuItems[this.menuItemIndex]?.select();
  }

  // select the menu as whole and an element with index from it
  select(index = 0): void {
    this.menuItems[this.menuItemIndex]?.deselect();
    this.menuItemIndex = index;
    while (!this.menuItems[this.menuItemIndex]?.active) {
      this.menuItemIndex++;
      if (this.menuItemIndex >= this.menuItems.length) {
        this.menuItemIndex = 0;
      }
      if (this.menuItemIndex === index) {
        return;
      }
    }
    this.menuItems[this.menuItemIndex]?.select();
    this.selected = true;
  }

  // deselect menu
  deselect(): void {
    this.menuItems[this.menuItemIndex]?.deselect();
    this.menuItemIndex = 0;
    this.selected = false;
  }

  confirm(): void {
    // when the player confirms his selection, do the action
  }

  clear(): void {
    this.menuItems.forEach(menuItem => {
      menuItem.destroy();
    });
    this.menuItems.length = 0;
    this.menuItemIndex = 0;
  }

  remap(units: Unit[]): void {
    this.clear();
    units.forEach(unit => {
      unit.setMenuItem(this.addMenuItem(unit.type));
    });
    this.menuItemIndex = 0;
  }
}
