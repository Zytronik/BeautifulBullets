import { GameActor, } from '../../types/game-actor.types';
import { SequenceContext, SequenceStep, } from '../../types/game-sequence.types';

interface RelativePosition {
    x: number;
    y: number;
}

export class MoveStep implements SequenceStep {
    private elapsed = 0;

    private startPosition = {
        x: 0,
        y: 0,
    };

    constructor(
        private readonly actor: GameActor,
        private readonly target: RelativePosition,
        private readonly duration: number,
        private readonly getBounds: () => {
            width: number;
            height: number;
        },
    ) { }

    start(): void {
        this.elapsed = 0;

        this.startPosition =
            this.actor.getPosition();
    }

    update(
        context: SequenceContext,
    ): boolean {
        this.elapsed +=
            context.deltaSeconds;

        const progress =
            Math.min(
                this.elapsed /
                this.duration,
                1,
            );

        const bounds =
            this.getBounds();

        const targetX =
            bounds.width *
            this.target.x;

        const targetY =
            bounds.height *
            this.target.y;

        this.actor.setPosition(
            this.startPosition.x +
            (
                targetX -
                this.startPosition.x
            ) *
            progress,

            this.startPosition.y +
            (
                targetY -
                this.startPosition.y
            ) *
            progress,
        );

        return progress >= 1;
    }
}