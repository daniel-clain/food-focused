export class Level {
  locked = true
  started = false
  failed = false
  completed = false
  paused = false
  hasExercise = false

  constructor(public number: number) {}
}
