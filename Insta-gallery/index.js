import React from 'react';
import { AppRegistry, View } from 'react-360';
import ExplainedImage from './components/ExplainedImage';
import Lights from './components/Lights';
import Gallery from './components/Gallery';
import MoveButtons from './components/MoveButtons';

export default class vr_gallery extends React.Component {
  render() {
    return (
      <View>
        <Lights />

        <Gallery />
      </View>
    );
  }
}


AppRegistry.registerComponent('vr_gallery', () => vr_gallery);
AppRegistry.registerComponent('ExplainedImage', () => ExplainedImage);
AppRegistry.registerComponent('MoveButtons', () => MoveButtons);
