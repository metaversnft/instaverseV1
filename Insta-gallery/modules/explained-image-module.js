import { Module, Surface } from 'react-360-web';

class ExplainedImageModule extends Module {

  constructor(ctx) {
    super('ExplainedImageModule');

    this._ctx = ctx;
  }

  open(imageInfo) {
    if (this._surface) {
      return;
    }

    const clientWidth = this._r360Instance._eventLayer.clientWidth;

    this._surface = new Surface(800, 500, Surface.SurfaceShape.Flat);

    this._surface.setAngle(0, 0);
    this._render = this._r360Instance.renderToSurface(this._r360Instance.createRoot('ExplainedImage', { imageInfo, width: clientWidth }), this._surface);
  }

  close() {
    this._r360Instance.detachRoot(this._render);
    this._surface = null;
  }

  _setAngle(horizAngle, vertAngle) {
    if (!!this._surface) {
      this._surface.setAngle(horizAngle, vertAngle);
    }
  }

  _setInstance(r360Instance) {
    this._r360Instance = r360Instance;
  }
}

let module = null;

export default {
  addModule: (ctx) => module = new ExplainedImageModule(ctx),
  setInstance: (r360Instance) => module._setInstance(r360Instance),
  setSurfaceAngle: (horizAngle, vertAngle) => module !== null ? module._setAngle(horizAngle, vertAngle) : null,
};