import { BULLET_CONFIG } from "../bullet/bullet.config";
import { BulletPattern } from "../types/bullet.types";

export const STAR_PATTERN: BulletPattern = {
    bulletAmount: 100,
    bulletSize: 4,
    frequency: 1.75,
    loop: true,
    lifetime: 20,

    createTrajectoryState(
        index,
        amount,
    ) {
        if (amount % 5 !== 0) {
            throw new Error(
                'Passive pattern requires bulletAmount to be divisible by 5.',
            );
        }

        const distributor =
            amount / 5;

        const adder =
            Math.floor(
                index / distributor,
            );

        const angle =
            index *
            2 *
            Math.PI /
            amount;

        const lastVertex =
            (36 + adder * 72) *
            Math.PI /
            180;

        return {
            angle,
            lastVertex,

            distance: 0,

            amplitude: 1,

            rotation: 0,
        };
    },

    trajectory(
        bullet,
        context,
    ) {
        const state =
            bullet.trajectoryState;

        const deltaSeconds =
            context.deltaSeconds;

        const angle =
            state['angle'];

        const lastVertex =
            state['lastVertex'];

        const stretchFactor =
            Math.cos(
                angle -
                lastVertex,
            );


        const safeStretchFactor =
            Math.abs(stretchFactor) < 0.001
                ? 0.001
                : stretchFactor;

        /*
         * =====================================================
         * PHASE 1
         * 0 -> 3 seconds
         * =====================================================
         */
        if (bullet.age <= 3) {
            const angleSpeed =
                Math.PI /
                180 *
                BULLET_CONFIG.simulationFps;

            const radialSpeed =
                0.25 *
                BULLET_CONFIG.simulationFps;

            /*
             * Rotate the bullet's trajectory.
             */
            state['angle'] +=
                angleSpeed *
                deltaSeconds;

            state['lastVertex'] +=
                angleSpeed *
                deltaSeconds;

            /*
             * Keep this only as state/debug
             * information. It is NOT used as
             * velocity anymore.
             */
            state['distance'] +=
                radialSpeed *
                deltaSeconds;

            /*
             * Move outward at a CONSTANT
             * 15 px/sec.
             */
            const currentAngle =
                state['angle'];

            const directionX =
                Math.sin(currentAngle) /
                safeStretchFactor;

            const directionY =
                Math.cos(currentAngle) /
                safeStretchFactor;

            return {
                x:
                    directionX *
                    radialSpeed,

                y:
                    directionY *
                    radialSpeed,
            };
        }

        /*
         * =====================================================
         * PHASE 2
         * 3 -> 7 seconds
         * =====================================================
         */
        if (bullet.age <= 7) {
            const distributor =
                bullet.amount / 5;

            const remainder =
                bullet.index %
                distributor;

            let amplitude: number;

            if (
                remainder >=
                distributor / 2
            ) {
                amplitude =
                    2 /
                    distributor *
                    (
                        remainder / 2
                    );
            } else {
                amplitude =
                    2 /
                    distributor *
                    (
                        distributor / 2 -
                        remainder / 2
                    );
            }

            /*
             * Original amplitude was effectively
             * movement per frame.
             *
             * Convert to pixels/second.
             */
            const speed =
                amplitude *
                BULLET_CONFIG.simulationFps;

            return {
                x:
                    Math.sin(angle) /
                    safeStretchFactor *
                    speed,

                y:
                    Math.cos(angle) /
                    safeStretchFactor *
                    speed,
            };
        }

        /*
         * =====================================================
         * PHASE 3
         * 7+ seconds
         * =====================================================
         */

        const speedMultiplier =
            1.4;

        const rotationSpeed =
            0.001 *
            BULLET_CONFIG.simulationFps;

        if (state['rotation'] < 5) {
            state['rotation'] = Math.min(
                5,
                state['rotation'] +
                rotationSpeed *
                deltaSeconds,
            );
        }

        const direction =
            bullet.index % 2 === 0
                ? 1
                : -1;

        const currentAngle =
            angle +
            state['rotation'] *
            direction;

        const speed =
            speedMultiplier *
            BULLET_CONFIG.simulationFps;

        return {
            x:
                Math.sin(currentAngle) /
                safeStretchFactor *
                speed,

            y:
                Math.cos(currentAngle) /
                safeStretchFactor *
                speed,
        };
    },
};