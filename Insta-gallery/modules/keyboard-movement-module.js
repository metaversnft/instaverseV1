import { Module } from 'react-360-web';
import { Vector3, Quaternion } from 'three';
import ObjectNotation from '../classes/object-notation';

class KeyboardMovementModule extends Module {
  _x = 0;
  _z = 0;
  _movingX = 0;
  _movingZ = 0;

  constructor(ctx, xUpLimit, xDownLimit, zUpLimit, zDownLimit, movingSpeed) {
    super('KeyboardMovementModule');

    this._ctx = ctx;

    this._xUpLimit = xUpLimit;
    this._xDownLimit = xDownLimit;
    this._zUpLimit = zUpLimit;
    this._zDownLimit = zDownLimit;
    this._movingSpeed = movingSpeed;

    document.addEventListener('keydown', (event) => this._onKeyDown(event));
  }

  _setInstance(r360Instance) {
    this._r360Instance = r360Instance;
  }

  getValueWithCallback(id) {
    const cameraQuaternion = this._r360Instance.getCameraQuaternion();
    const quaternion = new Quaternion(cameraQuaternion[0], cameraQuaternion[1], cameraQuaternion[2], cameraQuaternion[3]);
    const position = new Vector3(this._x, 0, this._z);

    const cameraObjectNotation = new ObjectNotation(position, quaternion);

    if (this._movingZ !== 0) {
      cameraObjectNotation.translateZ(this._movingZ);

      this._movingZ = 0;
    }

    if (this._movingX !== 0) {
      cameraObjectNotation.translateX(this._movingX);

      this._movingX = 0;
    }

    if (cameraObjectNotation.position.z + this._movingZ < this._zDownLimit || cameraObjectNotation.position.z + this._movingZ > this._zUpLimit) {
      return false;
    }

    if (cameraObjectNotation.position.x + this._movingX < this._xDownLimit || cameraObjectNotation.position.x + this._movingX > this._xUpLimit) {
      return false;
    }

    this._x = cameraObjectNotation.position.x;
    this._z = cameraObjectNotation.position.z;


    this._ctx.invokeCallback(
      id,
      [this._x, this._z]
    );
  }

  _onKeyDown(event) {
    if (event.keyCode === 38 || event.keyCode === 87) {
      this.moveForward();
    }
    else if (event.keyCode === 40 || event.keyCode === 83) {
      this.moveBackward();
    }
    else if (event.keyCode === 37 || event.keyCode === 65) {
      this.moveLeft();
    }
    else if (event.keyCode === 39 || event.keyCode === 68) {
      this.moveRight();
    }
  }

  moveForward() {
    this._movingZ = this._movingSpeed;
  }

  moveBackward() {
    this._movingZ = -this._movingSpeed;
  }

  moveLeft() {
    this._movingX = this._movingSpeed;
  }

  moveRight() {
    this._movingX = -this._movingSpeed;
  }
}

let module;

export default {
  addModule: (ctx, xUpLimit = 100, xDownLimit = -100, zUpLimit = 100, zDownLimit = -100, movingSpeed = 0.2) => {
    module = new KeyboardMovementModule(ctx, xUpLimit, xDownLimit, zUpLimit, zDownLimit, movingSpeed);
    return module;
  },
  setInstance: (r360Instance) => {
    module._setInstance(r360Instance);
  },
};