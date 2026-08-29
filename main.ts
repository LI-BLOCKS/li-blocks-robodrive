/**
 * LI Blocks RoboDrive
 *
 * A simple, educational MakeCode extension (Grades 3-5) for driving a
 * 2-wheel robot built from a BBC micro:bit, an IOBIT V2.0 expansion board
 * and an L298N motor driver.
 *
 * Hardware pin mapping (fixed for V1, not student configurable):
 *   Left motor:  ENA = P8,  IN1 = P12, IN2 = P13
 *   Right motor: ENB = P14, IN3 = P15, IN4 = P16
 */

/**
 * Directions available for the timed "robot ... for ... seconds" block.
 */
enum RoboDriveDirection {
    //% block="forward"
    Forward,
    //% block="backward"
    Backward,
    //% block="turn left"
    TurnLeft,
    //% block="turn right"
    TurnRight
}

/**
 * LI Blocks RoboDrive - forward, backward, turning, speed and timed
 * movement blocks for a simple 2-wheel micro:bit robot.
 */
//% weight=100 color=#2b8a3e icon="\uf197" block="RoboDrive"
namespace robodrive {

    // ---- Fixed V1 hardware pin mapping (not student configurable) ----
    const LEFT_EN: AnalogPin = AnalogPin.P8;
    const LEFT_IN1: DigitalPin = DigitalPin.P12;
    const LEFT_IN2: DigitalPin = DigitalPin.P13;

    const RIGHT_EN: AnalogPin = AnalogPin.P14;
    const RIGHT_IN1: DigitalPin = DigitalPin.P15;
    const RIGHT_IN2: DigitalPin = DigitalPin.P16;

    const MAX_PWM = 1023;

    // Current speed (percent, 0-100). Default speed is 80%.
    let currentSpeed = 80;

    /**
     * Convert a 0-100 percent speed into a 0-1023 PWM value.
     */
    function percentToPwm(percent: number): number {
        if (percent < 0) percent = 0;
        if (percent > 100) percent = 100;
        return Math.round((percent * MAX_PWM) / 100);
    }

    /**
     * Drive the left motor. direction: 1 = forward, -1 = backward, 0 = stop.
     */
    function driveLeft(direction: number): void {
        const pwm = direction === 0 ? 0 : percentToPwm(currentSpeed);
        if (direction > 0) {
            pins.digitalWritePin(LEFT_IN1, 1);
            pins.digitalWritePin(LEFT_IN2, 0);
        } else if (direction < 0) {
            pins.digitalWritePin(LEFT_IN1, 0);
            pins.digitalWritePin(LEFT_IN2, 1);
        } else {
            pins.digitalWritePin(LEFT_IN1, 0);
            pins.digitalWritePin(LEFT_IN2, 0);
        }
        pins.analogWritePin(LEFT_EN, pwm);
    }

    /**
     * Drive the right motor. direction: 1 = forward, -1 = backward, 0 = stop.
     */
    function driveRight(direction: number): void {
        const pwm = direction === 0 ? 0 : percentToPwm(currentSpeed);
        if (direction > 0) {
            pins.digitalWritePin(RIGHT_IN1, 1);
            pins.digitalWritePin(RIGHT_IN2, 0);
        } else if (direction < 0) {
            pins.digitalWritePin(RIGHT_IN1, 0);
            pins.digitalWritePin(RIGHT_IN2, 1);
        } else {
            pins.digitalWritePin(RIGHT_IN1, 0);
            pins.digitalWritePin(RIGHT_IN2, 0);
        }
        pins.analogWritePin(RIGHT_EN, pwm);
    }

    /**
     * Set the speed used by future movement blocks, as a percentage (0-100).
     * @param speed the speed percentage, eg: 80
     */
    //% blockId=robodrive_set_speed
    //% block="robot set speed %speed \\%"
    //% speed.min=0 speed.max=100 speed.defl=80
    //% weight=100
    export function setSpeed(speed: number): void {
        if (speed < 0) speed = 0;
        if (speed > 100) speed = 100;
        currentSpeed = speed;
    }

    /**
     * Drive both motors forward at the current speed.
     */
    //% blockId=robodrive_forward
    //% block="robot forward"
    //% weight=90
    export function forward(): void {
        driveLeft(1);
        driveRight(1);
    }

    /**
     * Drive both motors backward at the current speed.
     */
    //% blockId=robodrive_backward
    //% block="robot backward"
    //% weight=80
    export function backward(): void {
        driveLeft(-1);
        driveRight(-1);
    }

    /**
     * Pivot-turn the robot to the left (left motor stopped, right motor
     * forward at the current speed).
     */
    //% blockId=robodrive_turn_left
    //% block="robot turn left"
    //% weight=70
    export function turnLeft(): void {
        driveLeft(0);
        driveRight(1);
    }

    /**
     * Pivot-turn the robot to the right (left motor forward at the current
     * speed, right motor stopped).
     */
    //% blockId=robodrive_turn_right
    //% block="robot turn right"
    //% weight=60
    export function turnRight(): void {
        driveLeft(1);
        driveRight(0);
    }

    /**
     * Immediately stop both motors.
     */
    //% blockId=robodrive_stop
    //% block="robot stop"
    //% weight=50
    export function stop(): void {
        driveLeft(0);
        driveRight(0);
    }

    /**
     * Move in the chosen direction at the current speed for a number of
     * seconds, then automatically stop before continuing.
     * @param direction the direction to move
     * @param seconds how long to move, eg: 2
     */
    //% blockId=robodrive_move_for
    //% block="robot %direction for %seconds seconds"
    //% seconds.min=0 seconds.defl=2
    //% weight=40
    export function moveFor(direction: RoboDriveDirection, seconds: number): void {
        if (seconds < 0) seconds = 0;

        switch (direction) {
            case RoboDriveDirection.Forward:
                forward();
                break;
            case RoboDriveDirection.Backward:
                backward();
                break;
            case RoboDriveDirection.TurnLeft:
                turnLeft();
                break;
            case RoboDriveDirection.TurnRight:
                turnRight();
                break;
        }

        basic.pause(seconds * 1000);
        stop();
    }
}
