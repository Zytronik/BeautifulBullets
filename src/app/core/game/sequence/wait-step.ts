import { SequenceContext, SequenceStep } from '../../types/game-sequence.types';

export class WaitStep implements SequenceStep {
    private elapsed = 0;

    constructor(
        private readonly duration: number,
    ) { }

    start(): void {
        this.elapsed = 0;
    }

    update(
        context: SequenceContext,
    ): boolean {
        this.elapsed +=
            context.deltaSeconds;

        return (
            this.elapsed >=
            this.duration
        );
    }
}