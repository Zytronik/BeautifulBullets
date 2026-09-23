import { SequenceStep } from '../../types/game-sequence.types';

export class ActionStep implements SequenceStep {
    private executed = false;

    constructor(
        private readonly action: () => void,
    ) { }

    start(): void {
        this.executed = false;
    }

    update(): boolean {
        if (!this.executed) {
            this.executed = true;
            this.action();
        }

        return true;
    }
}