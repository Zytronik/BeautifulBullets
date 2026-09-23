import { SequenceRunner } from "../game/sequence-runner";
import { MoveStep } from "../game/sequence/move-step";
import { PlayerService } from "../services/player.service";

export function createPlayerSequence(
    playerService: PlayerService,
    getBounds: () => {
        width: number;
        height: number;
    },
): SequenceRunner {
    return new SequenceRunner(
        playerService,
        [
            new MoveStep(
                playerService,
                {
                    x: 0.5,
                    y: 0.8,
                },
                1.5,
                getBounds
            )
        ],
    );
}