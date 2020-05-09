export default {
  /** ********************************************************
   * SCENE OBJECTS
   ******************************************************** */
  camera: null,
  scene: null,
  renderer: null,
  composer: null,
  pacman: null,
  loader: null,

  /** ********************************************************
   * AUDIO
   ******************************************************** */
  listener: null,
  audioLoader: null,
  globalMusic: null,

  /** ********************************************************
   * KEYBOARD CONTROLS
   ******************************************************** */
  moveForward: false,
  moveBackward: false,
  moveLeft: false,
  moveRight: false,
  spaceDown: false, // prevent repetitive fires

  /** ********************************************************
   * HUD UPDATES
   ********************************************************* */
  updateAmmo: () => {
    return null;
  },
  updateGameProps: () => {
    return null;
  },
  updateHearts: () => {
    return null;
  },

  /** ********************************************************
   * GAME PROPERTIES
   ******************************************************** */
  gameOver: false,
  clock: null,
  score: 0,

  enemies: null,
  currentWave: 0,
  startedWave: false,
  startTime: 0,

  rooms: null,
  hallways: null,

  pickups: null,
  lastFruitSpawnTime: 0,
  lastPowerupSpawnTime: 0,
  freeze: false,
  freezeStart: 0,
  star: false,
  starStart: 0,
};
