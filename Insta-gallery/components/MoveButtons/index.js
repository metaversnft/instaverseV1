import React, { Component } from 'react';
import { View, Text, VrButton, NativeModules, asset } from 'react-360';
import styles from './styles';

const { KeyboardMovementModule } = NativeModules;
const { AudioModule } = NativeModules;

export default class MoveButtons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasSound: false,
    };

    this.handleSound = this.handleSound.bind(this);
    this.pickSoundStyle = this.pickSoundStyle.bind(this);
  }

  handleSound() {
    !this.state.hasSound
      ? AudioModule.playEnvironmental({
          source: asset('environmental.mp3'),
          volume: 0.5,
        })
      : AudioModule.stopEnvironmental();

      this.setState({hasSound: !this.state.hasSound});
  }

  pickSoundStyle() {
    return this.state.hasSound ? styles.soundOn : styles.soundOff;
  }

  render() {
    const height =
      this.props.height < 1000
        ? this.props.height / 0.985
        : this.props.height / 1.1;
    const width =
      this.props.height < 1000
        ? this.props.width / 0.96
        : this.props.width / 1.08;

    return (
      <View style={[styles.wrapper, { width, height }]}>
        <View style={styles.grid}>
          <View style={styles.row}>
            <View style={styles.flex1}></View>
            <VrButton
              style={styles.flex1}
              onClick={() => KeyboardMovementModule.moveForward()}
            >
              <Text style={styles.text}>U</Text>
            </VrButton>
            <View style={styles.flex1}></View>
          </View>

          <View style={styles.row}>
            <VrButton
              style={styles.flex1}
              onClick={() => KeyboardMovementModule.moveLeft()}
            >
              <Text style={styles.text}>L</Text>
            </VrButton>
            <View style={styles.flex1}></View>
            <VrButton
              style={styles.flex1}
              onClick={() => KeyboardMovementModule.moveRight()}
            >
              <Text style={styles.text}>R</Text>
            </VrButton>
          </View>

          <View style={styles.row}>
            <View style={styles.flex1}></View>
            <VrButton
              style={styles.flex1}
              onClick={() => KeyboardMovementModule.moveBackward()}
            >
              <Text style={styles.text}>D</Text>
            </VrButton>
            <View style={styles.flex1}></View>
          </View>

          <View style={styles.soundRow}>
            <VrButton style={styles.soundButton} onClick={this.handleSound}>
              <Text style={this.pickSoundStyle()}>Sound</Text>
            </VrButton>
          </View>
        </View>
      </View>
    );
  }
}
