// Basic smoke test exercising every block in the LI Blocks RoboDrive API.
// This is compiled as part of `pxt test` to make sure the public API
// type-checks and runs without throwing.

// Default speed should already be 80% - moving immediately should work.
robodrive.forward()
robodrive.stop()

// Explicit speed control.
robodrive.setSpeed(50)
robodrive.forward()
robodrive.backward()
robodrive.turnLeft()
robodrive.turnRight()
robodrive.stop()

// Speed clamping / edge values.
robodrive.setSpeed(0)
robodrive.forward()
robodrive.setSpeed(150)
robodrive.forward()
robodrive.setSpeed(-20)
robodrive.forward()
robodrive.stop()

// Timed movement for every supported direction, including fractional seconds.
robodrive.moveFor(RoboDriveDirection.Forward, 2)
robodrive.moveFor(RoboDriveDirection.Backward, 1)
robodrive.moveFor(RoboDriveDirection.TurnLeft, 1)
robodrive.moveFor(RoboDriveDirection.TurnRight, 0.5)
