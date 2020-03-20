import { Helicopter } from './components/helicopter';
import { Soldier } from './components/soldier';
import { Cannon } from './components/cannon';
import { Bullet } from './components/bullet';
import { Airway } from './airway';

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
	private airway: Airway;
	private callOnUpdate: ((status: GameStatus) => void)[];

	constructor() {}

	onUpdate(cb: (status: GameStatus) => void) {
		this.callOnUpdate.push(cb);
	}

	start(iterator: Iterator) {
		this.iterator = iterator;
		this.status = this.createInitialGameStatus();
		this.cycle();
	}

	pause() {
		const oldIterator = this.iterator;
		this.iterator = () => {};

		return () => (this.iterator = oldIterator);
	}

	private cycle() {
		this.status.helicopters = this.airway.getHelicopters();

		this.repeat();
	}

	private createInitialGameStatus(): GameStatus {
		this.airway = new Airway();

		return {
			helicopters: this.airway.getHelicopters(),
			cannons: [new Cannon()],
			bullets: [],
			soldiers: [],
		};
	}

	private repeat() {
		this.callOnUpdate.forEach(fn => fn(this.status));
		this.iterator(() => this.cycle());
	}
}
