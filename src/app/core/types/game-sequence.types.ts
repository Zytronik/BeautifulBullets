export interface SequenceContext {
    deltaSeconds: number;
}

export interface SequenceStep {
    start(
        context: SequenceContext,
    ): void;
    update(
        context: SequenceContext,
    ): boolean;
}