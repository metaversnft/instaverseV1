import { Module, Surface } from 'react-360-web';

class MoveButtonsModule extends Module {

  constructor(ctx) {
    super('MoveButtonsModule');

    this._ctx = ctx;
  }

  _setAngle(horizAngle, vertAngle) {
    if (!!this._surface) {
      this._surface.setAngle(horizAngle, vertAngle);
    }
  }

  _setInstance(r360Instance) {
    this._r360Instance = r360Instance;

    const clientWidth = this._r360Instance._eventLayer.clientWidth;
    const clientHeight = this._r360Instance._eventLayer.clientHeight;

    this._surface = new Surface(clientWidth, clientHeight, Surface.SurfaceShape.Flat);
    this._surface.setAngle(0, 0);
    this._surface.setRadius(0.1);
    this._surface.setDensity(5000);

    this._r360Instance.renderToSurface(this._r360Instance.createRoot('MoveButtons', { width: clientWidth, height: clientHeight }), this._surface);
  }
}

let module = null;

export default {
  addModule: (ctx) => module = new MoveButtonsModule(ctx),
  setInstance: (r360Instance) => module._setInstance(r360Instance),
  setSurfaceAngle: (horizAngle, vertAngle) => module !== null ? module._setAngle(horizAngle, vertAngle) : null,
};
