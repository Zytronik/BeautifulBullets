import { Injectable } from '@angular/core';
import { Container } from 'pixi.js';
import { BulletPatternRunner } from '../bullet/bullet-pattern-runner';
import { ActivePattern, BulletPattern, BulletPosition } from '../types/bullet.types';

@Injectable()
export class BulletPatternService {
    private container?: Container;

    private readonly patterns:
        ActivePattern[] = [];

    initialize(
        container: Container,
    ): void {
        this.container = container;
    }

    trigger(
        pattern: BulletPattern,
        getOrigin: () => BulletPosition,
    ): void {
        if (!this.container) {
            throw new Error(
                'BulletPatternService has not been initialized.',
            );
        }

        const activePattern:
            ActivePattern = {
            pattern,
            getOrigin,
            elapsedTime: 0,
            executions: 0,
            runners: [],
        };

        this.patterns.push(
            activePattern,
        );

        this.spawn(
            activePattern,
        );
    }

    getActivePatternCount(): number {
        return this.patterns.reduce(
            (total, pattern) =>
                total + pattern.runners.length,
            0,
        );
    }

    getActiveBulletCount(): number {
        return this.patterns.reduce(
            (total, pattern) =>
                total +
                pattern.runners.reduce(
                    (count, runner) =>
                        count + runner.getBulletCount(),
                    0,
                ),
            0,
        );
    }

    update(
        deltaSeconds: number,
    ): void {
        for (
            let patternIndex =
                this.patterns.length - 1;
            patternIndex >= 0;
            patternIndex--
        ) {
            const activePattern =
                this.patterns[patternIndex];

            for (
                let runnerIndex =
                    activePattern.runners.length - 1;
                runnerIndex >= 0;
                runnerIndex--
            ) {
                const runner =
                    activePattern.runners[
                    runnerIndex
                    ];

                runner.update(
                    deltaSeconds,
                );

                if (
                    runner.isFinished()
                ) {
                    runner.destroy();

                    activePattern.runners.splice(
                        runnerIndex,
                        1,
                    );
                }
            }

            activePattern.elapsedTime +=
                deltaSeconds;

            if (
                activePattern.elapsedTime <
                activePattern.pattern.frequency
            ) {
                continue;
            }

            activePattern.elapsedTime = 0;

            if (
                !activePattern.pattern.loop
            ) {
                const repetitions =
                    activePattern.pattern
                        .repetitions ?? 1;

                if (
                    activePattern.executions >=
                    repetitions
                ) {
                    if (
                        activePattern.runners
                            .length === 0
                    ) {
                        this.removePattern(
                            patternIndex,
                        );
                    }

                    continue;
                }
            }

            this.spawn(
                activePattern,
            );
        }
    }

    destroy(): void {
        for (
            const activePattern of
            this.patterns
        ) {
            for (
                const runner of
                activePattern.runners
            ) {
                runner.destroy();
            }
        }

        this.patterns.length = 0;
    }

    private spawn(
        activePattern: ActivePattern,
    ): void {
        if (!this.container) {
            return;
        }

        const runner =
            new BulletPatternRunner(
                activePattern.pattern,
                this.container,
                activePattern.getOrigin(),
            );

        activePattern.runners.push(
            runner,
        );

        activePattern.executions++;
    }

    private removePattern(
        index: number,
    ): void {
        const activePattern =
            this.patterns[index];

        for (
            const runner of
            activePattern.runners
        ) {
            runner.destroy();
        }

        activePattern.runners.length = 0;

        this.patterns.splice(
            index,
            1,
        );
    }
}