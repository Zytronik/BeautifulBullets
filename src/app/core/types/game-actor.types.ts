export interface GameActor {
    getPosition(): {
        x: number;
        y: number;
    };
    setPosition(
        x: number,
        y: number,
    ): void;
    setInputEnabled(
        enabled: boolean,
    ): void;
    isInputEnabled(): boolean;
}