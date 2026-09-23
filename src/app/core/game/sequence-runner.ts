import { GameActor } from "../types/game-actor.types";
import { SequenceStep, SequenceContext } from "../types/game-sequence.types";

export class SequenceRunner {
    private currentStepIndex = 0;
    private started = false;
    private finished = false;

    constructor(
        private readonly actor: GameActor,
        private readonly steps: SequenceStep[],
    ) { }

    start(): void {
        if (this.started) {
            return;
        }

        this.started = true;
        this.finished = false;
        this.currentStepIndex = 0;

        this.actor.setInputEnabled(false);

        if (this.steps.length === 0) {
            this.finish();
            return;
        }

        this.steps[0].start({
            deltaSeconds: 0,
        });
    }

    update(
        deltaSeconds: number,
    ): void {
        if (
            !this.started ||
            this.finished
        ) {
            return;
        }

        const context: SequenceContext = {
            deltaSeconds,
        };

        const step =
            this.steps[
            this.currentStepIndex
            ];

        const complete =
            step.update(context);

        if (!complete) {
            return;
        }

        this.currentStepIndex++;

        if (
            this.currentStepIndex >=
            this.steps.length
        ) {
            this.finish();
            return;
        }

        this.steps[
            this.currentStepIndex
        ].start(context);
    }

    cancel(): void {
        if (
            !this.started ||
            this.finished
        ) {
            return;
        }

        this.finish();
    }

    isFinished(): boolean {
        return this.finished;
    }

    private finish(): void {
        this.finished = true;

        this.actor.setInputEnabled(true);
    }
}