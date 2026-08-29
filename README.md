# LI Blocks RoboDrive

**LI Blocks RoboDrive** is an educational Microsoft MakeCode extension by **LI Blocks**
for driving a simple 2-wheel robot with the BBC micro:bit. It is designed for
**Grades 3-5** and hides all of the electronics detail (PWM, H-bridge pins, wiring)
behind simple blocks: forward, backward, turn left, turn right, stop, speed, and
timed movement.

## Supported hardware

- BBC micro:bit
- IOBIT V2.0 micro:bit expansion board
- L298N motor driver
- 2 x DC geared motors
- 2-wheel robot chassis

```
micro:bit -> IOBIT V2.0 -> L298N -> Left Motor / Right Motor
```

## Required wiring (fixed in V1)

| Motor | Enable (PWM) | Direction pins |
|-------|--------------|-----------------|
| Left  | ENA -> P8    | IN1 -> P12, IN2 -> P13 |
| Right | ENB -> P14   | IN3 -> P15, IN4 -> P16 |

The micro:bit/IOBIT and the L298N must share a common ground.

**ENA and ENB are mandatory PWM connections in V1.** Tying ENA/ENB directly to 5V
(bypassing PWM speed control) is not supported in V1.

There is no "initialize robot" block - the extension configures its pins
automatically, so a program can start moving immediately in `on start`.

## Blocks

- `robot set speed %speed %` - sets the speed (0-100%) used by future movement blocks.
- `robot forward` - both motors move forward at the current speed.
- `robot backward` - both motors move backward at the current speed.
- `robot turn left` - left motor stops, right motor moves forward (pivot turn).
- `robot turn right` - left motor moves forward, right motor stops (pivot turn).
- `robot stop` - immediately stops both motors.
- `robot [forward|backward|turn left|turn right] for %seconds seconds` - drives in
  the chosen direction for the given time, then automatically stops before the
  next block runs.

## Default speed

The default speed is **80%**. A program does not need to call the speed block
before moving:

```blocks
robot.forward()
```

runs at 80% speed. Speed set with `robot set speed` stays in effect until it is
changed again.

## Example program

```blocks
robodrive.setSpeed(70)
robodrive.moveFor(RoboDriveDirection.Forward, 2)
robodrive.moveFor(RoboDriveDirection.TurnRight, 1)
robodrive.moveFor(RoboDriveDirection.Forward, 2)
robodrive.stop()
```

Equivalent MakeCode blocks:

```
robot set speed 70 %
robot forward for 2 seconds
robot turn right for 1 seconds
robot forward for 2 seconds
robot stop
```
