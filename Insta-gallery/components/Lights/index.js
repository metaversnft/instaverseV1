import React from 'react';
import {
  AmbientLight,
} from 'react-360';

export default Lights = () => (
  <AmbientLight
    intensity={1}
    style={{ color: 'white', transform: [{ translate: [0, 0, 0] }] }}
  />
)