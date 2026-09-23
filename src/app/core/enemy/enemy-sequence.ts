import { SequenceRunner } from "../game/sequence-runner";
import { ActionStep } from "../game/sequence/action-step";
import { MoveStep } from "../game/sequence/move-step";
import { WaitStep } from "../game/sequence/wait-step";
import { STAR_PATTERN } from "../patterns/star";
import { BulletPatternService } from "../services/bullet-pattern.service";
import { EnemyService } from "../services/enemy.service";

export function createEnemySequence(
    enemyService: EnemyService,
    bulletPatternService: BulletPatternService,
    getBounds: () => {
        width: number;
        height: number;
    },
): SequenceRunner {
    return new SequenceRunner(
        enemyService,
        [
            new MoveStep(
                enemyService,
                {
                    x: 0.5,
                    y: 0.2,
                },
                1.5,
                getBounds
            ),

            new ActionStep(() => {
                bulletPatternService.trigger(
                    STAR_PATTERN,
                    () =>
                        enemyService.getPosition(),
                );
            }),

            new WaitStep(10),

            /*       new ActionStep(() => {
                      bulletPatternService.trigger(
                          PATTERN_2,aa
                          () =>
                              enemyService.getPosition(),
                      );
                  }),
      
                  new WaitStep(10), */

            new MoveStep(
                enemyService,
                {
                    x: 0.8,
                    y: 0.35,
                },
                2,
                getBounds
            ),

            new WaitStep(10),

            new MoveStep(
                enemyService,
                {
                    x: 0.2,
                    y: 0.5,
                },
                2,
                getBounds
            ),
        ],
    );
}