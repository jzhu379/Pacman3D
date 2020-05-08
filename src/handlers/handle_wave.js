import {Audio, Vector3} from 'three';

import {Ghost} from '../objects'

import consts from '../consts';
import globals from '../globals';

import VICTORY_mp3 from '../audio/victory.mp3';
import WAVE_START_mp3 from '../audio/wave_start.mp3';

let handleWave = () => {
  if (globals.enemies.size === 0 && globals.currentWave < consts.WAVES.length) {
    // new wave should start, begin countdown
    if (!globals.startedWave) {
      globals.startedWave = true;
      globals.startTime = globals.clock.getElapsedTime();
      return;
    }

    // wait for countdown to finish
    if (globals.clock.getElapsedTime() - globals.startTime < consts.WAVE_RESET_TIME) {
      return;
    }
    // reset flag back
    globals.startedWave = false;

    // start new wave
    let sound = new Audio(globals.listener);
    globals.audioLoader.load(WAVE_START_mp3, (buffer) => {
      sound.setBuffer(buffer);
      sound.setVolume(0.25);
      sound.play();
    });

    // spawn globals.enemies
    for (let i = 0; i < consts.WAVES[globals.currentWave]; i++) {
      let ghost = new Ghost();
      ghost.scale.multiplyScalar(0.2);
      ghost.position.y -= 20;

      // spawn randomly around edges of arena such that ghosts are certain radius
      // away from pacman
      let randVec;
      do {
        // picking a room
        let room = globals.rooms[Math.floor(Math.random()*globals.rooms.length)];
        randVec = new Vector3(
          Math.random()*(room.maxX - room.minX - 2*consts.GHOST_RADIUS) + room.minX + consts.GHOST_RADIUS,
          0,
          Math.random()*(room.maxZ - room.minZ - 2*consts.GHOST_RADIUS) + room.minZ + consts.GHOST_RADIUS
        );
      } while (
        randVec.clone().add(ghost.position).sub(globals.pacman.position).length() < consts.SAFE_RADIUS
      );
      ghost.position.add(randVec);

      // make sure enemy faces Pacman
      let vec = globals.pacman.position.clone().sub(ghost.position).setY(0).normalize();
      let angle = new Vector3(0, 0, 1).angleTo(vec);
      if (globals.pacman.position.x - ghost.position.x < 0) {
        angle = Math.PI*2 - angle;
      }
      ghost.rotation.y = angle;

      globals.enemies.add(ghost);
      globals.scene.add(ghost);
    }

    globals.currentWave++;
  }
  // victory
  else if (globals.enemies.size === 0 && globals.currentWave === consts.WAVES.length) {
    globals.globalMusic.stop();
    let sound = new Audio(globals.listener);
    globals.audioLoader.load(VICTORY_mp3, (buffer) => {
      sound.setBuffer(buffer);
      sound.setVolume(0.25);
      sound.play();
    });

    globals.gameOver = true;
    console.log("final score: ", globals.score);
  }
};

export default handleWave;