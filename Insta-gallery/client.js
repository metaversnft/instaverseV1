import { ReactInstance, Location } from 'react-360-web';
import { Vector3, Quaternion } from 'three';
import KeyboardMovementModule from './modules/keyboard-movement-module';
import ExplainedImageModule from './modules/explained-image-module';
import MoveButtonsModule from './modules/move-buttons-module';

function init(bundle, parent, options = {}) {

  const r360 = new ReactInstance(bundle, parent, {
    fullScreen: true,
    nativeModules: [
      ctx => new KeyboardMovementModule.addModule(ctx, 9.3, -3, 13, -3.8),
      ExplainedImageModule.addModule,
      MoveButtonsModule.addModule,
    ],
    frame: () => {
      const cameraQuaternion = r360.getCameraQuaternion();
      const quaternion = new Quaternion(cameraQuaternion[0], cameraQuaternion[1], cameraQuaternion[2], cameraQuaternion[3]);

      const v1 = new Vector3(0, 0, -1);
      v1.applyQuaternion(quaternion);

      const cx = v1.x;
      const cy = v1.y;
      const cz = v1.z;

      const horizAngle = Math.atan2(cx, -cz);
      const vertAngle = Math.asin(cy / Math.sqrt(cx * cx + cy * cy + cz * cz));

      ExplainedImageModule.setSurfaceAngle(horizAngle, vertAngle);
      MoveButtonsModule.setSurfaceAngle(horizAngle, vertAngle);
    },
    ...options,
  });

  KeyboardMovementModule.setInstance(r360);
  ExplainedImageModule.setInstance(r360);
  MoveButtonsModule.setInstance(r360);

  const customLocation = new Location([0, -1, 0]);
  r360.renderToLocation(r360.createRoot('vr_gallery'), customLocation);
  r360.compositor.setBackground(r360.getAssetURL('360_world.jpg'));
}

window.React360 = { init };
