import { Helicopter } from './components/helicopter';
import { Soldier } from './components/soldier';
import { Cannon } from './components/cannon';
import { Bullet } from './components/bullet';

export interface GameStatus {
	helicopters: Helicopter[];
	soldiers: Soldier[];
	cannons: Cannon[];
	bullets: Bullet[];
}

export type Iterator = (cb: () => void) => void;

export class Game {
	status: GameStatus;

	private iterator: Iterator;

	constructor() {}

	onUpdate(cb: (status: GameStatus) => void) {}

	start(iterator: Iterator) {
		this.cycle();
	}

	private cycle() {}
}
